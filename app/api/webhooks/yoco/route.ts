import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { sendOrderConfirmation } from "@/lib/email";
import { findOrderByCheckoutId, markOrderPaid, type OrderDraft } from "@/lib/orders";

export const runtime = "nodejs";
function validSignature(request: NextRequest, rawBody: string) {
  const secret = process.env.YOCO_WEBHOOK_SECRET; const id = request.headers.get("webhook-id"); const timestamp = request.headers.get("webhook-timestamp"); const header = request.headers.get("webhook-signature");
  if (!secret?.startsWith("whsec_") || !id || !timestamp || !header || Math.abs(Date.now() / 1000 - Number(timestamp)) > 180) return false;
  const expected = createHmac("sha256", Buffer.from(secret.slice(6), "base64")).update(`${id}.${timestamp}.${rawBody}`).digest("base64");
  return header.split(" ").some((entry) => { const [, signature] = entry.split(","); return !!signature && signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected)); });
}
export async function POST(request: NextRequest) {
  const rawBody = await request.text(); if (!validSignature(request, rawBody)) return new NextResponse("Invalid webhook signature", { status: 403 });
  try {
    const event = JSON.parse(rawBody) as { type?: string; payload?: { id?: string; status?: string; amount?: number; metadata?: { checkoutId?: string } } }; const payment = event.payload;
    if (event.type !== "payment.succeeded" || payment?.status !== "succeeded" || !payment.id || !payment.metadata?.checkoutId) return NextResponse.json({ received: true });
    const snapshot = await findOrderByCheckoutId(payment.metadata.checkoutId); if (!snapshot) return new NextResponse("Order not found", { status: 404 });
    const order = snapshot.data() as OrderDraft; if (payment.amount !== order.totalCents) return new NextResponse("Payment amount does not match order", { status: 400 });
    if (await markOrderPaid(snapshot.id, payment.id)) { try { await sendOrderConfirmation(order); } catch (error) { console.error("Order confirmation email failed", error); } }
    return NextResponse.json({ received: true });
  } catch (error) { console.error("Yoco webhook processing failed", error); return new NextResponse("Webhook processing failed", { status: 500 }); }
}
