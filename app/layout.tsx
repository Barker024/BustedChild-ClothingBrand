import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import CartDrawer from "@/components/cart/CartDrawer";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "Busted Child | Built Different",
  description:
    "Busted Child – premium streetwear for those who were never made to fit in.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       <CartProvider>
  {children}
  <CartDrawer />
</CartProvider>
      </body>
    </html>
  );
}