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

  const [checkoutAnimation, setCheckoutAnimation] = useState(false);

  const handleCheckout = async (event) => {
    event.preventDefault();
    setCheckoutAnimation(true);
    setLoading(true);
    //send the cart data to our serverless API
    const response = await fetchPostJSON(
      "/api/checkout_sessions/cart",
      cartDetails
    );
    if (response.statusCode === 500) {
      setCheckoutAnimation(false);
      console.error(response.message);
      return;
    }
    //if nothing went wrong, sends user to Stripe checkout
    redirectToCheckout({ sessionId: response.id });
  };
  return (
    <Form onSubmit={handleCheckout}>
      <CartTitle>Cart summary</CartTitle>
      {/* This is where we'll render our cart;
			The item count changes quickly and may
			be mismatched between client and server.
			To avoid annoying error messages,
			we use 'supressHydrationWarning'.
			https://reactjs.org/docs/dom-elements.html#suppresshydrationwarning*/}

      <p suppressHydrationWarning>
        <strong>tickets:</strong> {cartCount}
      </p>
      <p suppressHydrationWarning>
        <strong>total:</strong> {formattedTotalPrice}
      </p>
      {/* <p>Use 4242 4242 4242 4242 as the card number.</p> */}

      <CheckoutButtons>
        <Button type="submit" disabled={cartEmpty || loading}>
          Checkout <div className="card-number" />
        </Button>
        {" | "}
        <Button type="button" onClick={clearCart}>
          Clear Cart
        </Button>
      </CheckoutButtons>
      {checkoutAnimation ? (
        <>
          <br />
          <br />
          <GatewayAnimation>loading gateway</GatewayAnimation>
        </>
      ) : (
        <>
          <br />
          <br />
          <AnimateSmiley>:)</AnimateSmiley>
        </>
      )}
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
  font-size: 16px;
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

const ellipsis = keyframes`
  to {
    width: 30px;
  }
`;

const GatewayAnimation = styled.div`
  color: blue;
  margin-top: 1rem;

  ::after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ${ellipsis} steps(4, end) 900ms infinite;
    animation: ${ellipsis} steps(4, end) 900ms infinite;
    content: "...";
    width: 0px;
  }
`;

const smiley = keyframes`
  to {
    width: 30px;
  }
`;
const AnimateSmiley = styled.div`
  ::after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${smiley} steps(4, end) 900ms infinite alternate;
    content: ")))";
    width: 0px;
  }
`;
