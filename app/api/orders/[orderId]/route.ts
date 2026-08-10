import { NextRequest, NextResponse } from "next/server";
import { getOrderStatus } from "@/lib/orders";
export const runtime = "nodejs";
export async function GET(_request: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  if (!/^[a-zA-Z0-9-]{16,100}$/.test(orderId)) return NextResponse.json({ error: "Invalid order." }, { status: 400 });
  try { const order = await getOrderStatus(orderId); if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 }); return NextResponse.json(order); } catch (error) { console.error("Order lookup failed", error); return NextResponse.json({ error: "Order status is temporarily unavailable." }, { status: 503 }); }
}
