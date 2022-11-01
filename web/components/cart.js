import { CartProvider } from "use-shopping-cart";

export default function Cart({ children }) {
  return (
    <CartProvider
      mode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      currency={"cad"}
      shouldPersist={false}
    >
      {children}
    </CartProvider>
  );
}
