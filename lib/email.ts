import type { OrderDraft } from "@/lib/orders";

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
const zar = (cents: number) => `R${(cents / 100).toFixed(2)}`;

export async function sendOrderConfirmation(order: OrderDraft) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !senderEmail) return;
  const senderName = process.env.BREVO_SENDER_NAME ?? "Busted Child";
  const rows = order.items.map((item) => `<tr><td style="padding:8px 0">${escapeHtml(item.name)} × ${item.quantity}<br><span style="color:#666">Size: ${escapeHtml(item.size)}</span></td><td style="padding:8px 0;text-align:right">${zar(item.lineTotalCents)}</td></tr>`).join("");
  const htmlContent = `<main style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#111"><h1>Order confirmed</h1><p>Hi ${escapeHtml(order.customer.firstName)},</p><p>Thanks for your order. We’re getting it ready to ship.</p><p><strong>Order #${escapeHtml(order.id)}</strong></p><table style="width:100%;border-collapse:collapse">${rows}<tr><td style="border-top:1px solid #ddd;padding-top:12px"><strong>Total</strong></td><td style="border-top:1px solid #ddd;padding-top:12px;text-align:right"><strong>${zar(order.totalCents)}</strong></td></tr></table><h2>Delivery</h2><p>${escapeHtml(order.customer.address)}<br>${escapeHtml(order.customer.city)}, ${escapeHtml(order.customer.province)} ${escapeHtml(order.customer.postalCode)}</p><p>Busted Child</p></main>`;
  const response = await fetch("https://api.brevo.com/v3/smtp/email", { method: "POST", headers: { accept: "application/json", "content-type": "application/json", "api-key": apiKey }, body: JSON.stringify({ sender: { email: senderEmail, name: senderName }, to: [{ email: order.customer.email, name: `${order.customer.firstName} ${order.customer.lastName}` }], subject: `Your Busted Child order #${order.id}`, htmlContent, tags: ["order-confirmation"] }) });
  if (!response.ok) throw new Error("Brevo could not send the order confirmation.");
}
