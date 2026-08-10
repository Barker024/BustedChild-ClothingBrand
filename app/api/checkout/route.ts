import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { createOrder, markOrderPaymentFailed, setCheckoutId, type CustomerDetails, type OrderItem } from "@/lib/orders";

export const runtime = "nodejs";
type CheckoutRequest = { customer?: CustomerDetails; items?: Array<{ id?: number; size?: string; quantity?: number }> };
const requiredFields: Array<keyof CustomerDetails> = ["firstName", "lastName", "email", "phone", "address", "city", "province", "postalCode"];

export async function POST(request: NextRequest) {
  const secretKey = process.env.YOCO_SECRET_KEY;
  if (!secretKey) return NextResponse.json({ error: "Online payments are not configured yet." }, { status: 503 });
  let body: CheckoutRequest;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 }); }
  if (!body.customer || !body.items?.length || requiredFields.some((field) => !body.customer?.[field]?.trim()) || !/^\S+@\S+\.\S+$/.test(body.customer.email)) return NextResponse.json({ error: "Please complete your contact and delivery details." }, { status: 400 });
  const byKey = new Map<string, { id: number; size: string; quantity: number }>();
  for (const item of body.items) { if (!Number.isInteger(item.id) || !item.size || !Number.isInteger(item.quantity) || item.quantity < 1) return NextResponse.json({ error: "Your cart contains an invalid item." }, { status: 400 }); const key = `${item.id}:${item.size}`; const existing = byKey.get(key); byKey.set(key, { id: item.id!, size: item.size, quantity: (existing?.quantity ?? 0) + item.quantity }); }
  const items: OrderItem[] = [];
  for (const item of byKey.values()) { const product = products.find((candidate) => candidate.id === item.id); if (!product || !product.sizes.includes(item.size) || item.quantity > product.stock) return NextResponse.json({ error: "One or more items are no longer available in the selected quantity." }, { status: 400 }); const unitPriceCents = Math.round(product.price * 100); items.push({ productId: product.id, slug: product.slug, name: product.name, image: product.images[0], size: item.size, quantity: item.quantity, unitPriceCents, lineTotalCents: unitPriceCents * item.quantity }); }
  const subtotalCents = items.reduce((sum, item) => sum + item.lineTotalCents, 0); const shippingCents = subtotalCents >= 100000 ? 0 : 10000; const orderId = crypto.randomUUID(); const customer = Object.fromEntries(requiredFields.map((field) => [field, body.customer![field].trim()])) as CustomerDetails; const draft = { id: orderId, customer, items, subtotalCents, shippingCents, totalCents: subtotalCents + shippingCents };
  try {
    await createOrder(draft);
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin).replace(/\/$/, "");
    const response = await fetch("https://payments.yoco.com/api/checkouts", { method: "POST", headers: { Authorization: `Bearer ${secretKey}`, "Content-Type": "application/json", "Idempotency-Key": orderId }, body: JSON.stringify({ amount: draft.totalCents, currency: "ZAR", successUrl: `${siteUrl}/payment/success?orderId=${orderId}`, cancelUrl: `${siteUrl}/payment/cancelled?orderId=${orderId}`, failureUrl: `${siteUrl}/payment/cancelled?orderId=${orderId}`, externalId: orderId, clientReferenceId: orderId, metadata: { orderId } }) });
    const checkout = (await response.json()) as { id?: string; redirectUrl?: string }; if (!response.ok || !checkout.id || !checkout.redirectUrl) throw new Error("Yoco could not create a checkout session."); await setCheckoutId(orderId, checkout.id); return NextResponse.json({ redirectUrl: checkout.redirectUrl });
  } catch (error) { await markOrderPaymentFailed(orderId).catch(() => undefined); console.error("Checkout creation failed", error); return NextResponse.json({ error: "We could not start secure payment. Please try again." }, { status: 502 }); }
}
