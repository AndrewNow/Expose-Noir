import { useState, useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { fetchPostJSON } from "../utils/apiHelpers";
import styled, { keyframes } from "styled-components";

export default function CartSummary() {
  //setting up some React states for our cart
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  // destructuring all the building blocks we get from use-shopping-cart
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart();

  //sets our cartEmpty state with cart data
  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const handleCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);

    //send the cart data to our serverless API
    const response = await fetchPostJSON(
      "/api/checkout_sessions/cart",
      cartDetails
    );

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    //if nothing went wrong, sends user to Stripe checkout
    redirectToCheckout({ sessionId: response.id });
  };

  return (
    <Form onSubmit={handleCheckout}>
      <CartTitle>Cart summary:</CartTitle>
      {/* This is where we'll render our cart;
			The item count changes quickly and may
			be mismatched between client and server.
			To avoid annoying error messages,
			we use 'supressHydrationWarning'.
			https://reactjs.org/docs/dom-elements.html#suppresshydrationwarning*/}

      <p suppressHydrationWarning>
        <strong>items:</strong> {cartCount}
      </p>
      <p suppressHydrationWarning>
        <strong>total:</strong> {formattedTotalPrice}
      </p>
      {/* <p>Use 4242 4242 4242 4242 as the card number.</p> */}

      <CheckoutButtons>
        {"["}
        <Button type="submit" disabled={cartEmpty || loading}>
          Checkout <div className="card-number" />
        </Button>
        {" / "}
        <Button type="button" onClick={clearCart}>
          Clear Cart
        </Button>
        {"]"}
      </CheckoutButtons>
    </Form>
  );
}

const blink = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;

const CartTitle = styled.h6`
  margin-bottom: 0;
`;

const CheckoutButtons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const Button = styled.button`
  margin-right: 0.5rem;
  background: none;
  :last-child {
    margin-left: 0.5rem;
  }

  :hover,
  :focus {
    color: white;
    background: black;
    animation: ${blink} 0.5s linear infinite alternate;
  }
`;

const Form = styled.form`
  margin: 2rem 0;
`;
