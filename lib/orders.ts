import { FieldValue } from "firebase-admin/firestore";
import { db } from "@/lib/firebase-admin";

export type OrderItem = { productId: number; slug: string; name: string; image: string; size: string; quantity: number; unitPriceCents: number; lineTotalCents: number };
export type CustomerDetails = { firstName: string; lastName: string; email: string; phone: string; address: string; city: string; province: string; postalCode: string };
export type OrderDraft = { id: string; customer: CustomerDetails; items: OrderItem[]; subtotalCents: number; shippingCents: number; totalCents: number };

export async function createOrder(draft: OrderDraft) { await db().collection("orders").doc(draft.id).set({ ...draft, currency: "ZAR", status: "pending_payment", createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() }); }
export async function setCheckoutId(orderId: string, checkoutId: string) { await db().collection("orders").doc(orderId).update({ yocoCheckoutId: checkoutId, updatedAt: FieldValue.serverTimestamp() }); }
export async function markOrderPaymentFailed(orderId: string) { await db().collection("orders").doc(orderId).update({ status: "payment_session_failed", updatedAt: FieldValue.serverTimestamp() }); }
export async function findOrderByCheckoutId(checkoutId: string) { const snapshot = await db().collection("orders").where("yocoCheckoutId", "==", checkoutId).limit(1).get(); return snapshot.empty ? null : snapshot.docs[0]; }
export async function markOrderPaid(orderId: string, paymentId: string) { const ref = db().collection("orders").doc(orderId); return db().runTransaction(async (transaction) => { const snapshot = await transaction.get(ref); if (!snapshot.exists || snapshot.data()?.status === "paid") return false; transaction.update(ref, { status: "paid", yocoPaymentId: paymentId, paidAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() }); return true; }); }
export async function getOrderStatus(orderId: string) { const snapshot = await db().collection("orders").doc(orderId).get(); if (!snapshot.exists) return null; return { id: snapshot.id, status: snapshot.data()?.status as string | undefined }; }
