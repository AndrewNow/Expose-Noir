import { useState, useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { fetchPostJSON } from "../utils/apiHelpers";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSummary({ textcolor }) {
  //setting up some React states for our cart
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  // destructuring all the building blocks we get from use-shopping-cart
  const {
    formattedTotalPrice,
    cartCount,
    cartDetails,
    redirectToCheckout,
    // clearCart,
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
    // redirectToCheckout({ sessionId: response.id });
    redirectToCheckout(response.id);
  };

  return (
    <Form onSubmit={handleCheckout}>
      {/* This is where we'll render our cart;
			The item count changes quickly and may be mismatched between client and server.
			To avoid annoying error messages, we use 'supressHydrationWarning'.
			https://reactjs.org/docs/dom-elements.html#suppresshydrationwarning*/}

      {/* <p suppressHydrationWarning>tickets: {cartCount}</p> */}
      <AnimatePresence>
        {cartCount >= 6 && (
          <LimitNote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ color: textcolor ? textcolor : "var(--color-primary)" }}
          >
            * max sixxx per order
          </LimitNote>
        )}
      </AnimatePresence>
      <p
        style={{ color: textcolor ? textcolor : "var(--color-primary)" }}
        suppressHydrationWarning
      >
        total {formattedTotalPrice} plus tax
      </p>
      <CheckoutButtons>
        <Button
          textcolor={textcolor}
          type="submit"
          disabled={cartEmpty || loading}
        >
          purchase <div className="card-number" />
        </Button>
        {/* {" | "}
        <ClearCartButton
          onClick={clearCart}
          type="button"
          style={{ color: "red!important" }}
        >
          clear cart
        </ClearCartButton> */}
      </CheckoutButtons>
      {checkoutAnimation ? (
        <>
          {/* <br /> */}
          {/* <br /> */}
          <GatewayAnimation>loading gateway</GatewayAnimation>
        </>
      ) : (
        <SmileyWrapper textcolor={textcolor}>
          <SmileyWidth>
            <AnimateSmiley>:)</AnimateSmiley>
          </SmileyWidth>
          <SmileyWidth>
            <AnimateSmiley>:)</AnimateSmiley>
          </SmileyWidth>
        </SmileyWrapper>
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

const LimitNote = styled(motion.p)``;

const CheckoutButtons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const Button = styled.button`
  margin-right: 0.5rem;
  background: none;
  padding: 0;
  color: ${(props) => props.textcolor || "var(--color-primary"};
  *,
  a {
    color: ${(props) => props.textcolor || "var(--color-primary"};
  }

  :hover,
  :focus {
    text-decoration: underline;
  }
`;
// const ClearCartButton = styled.button`
//   margin-left: 0.5rem;
//   background: none;
//   padding: 0;
//   color: var(--color-primary);

//   *,
//   a {
//     color: var(--color-primary);
//   }

//   :hover,
//   :focus {
//     color: red !important;
//     text-decoration: underline;
//   }
// `;

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
  margin-right: 0.5rem;
  ::after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${smiley} steps(4, end) 900ms infinite alternate;
    content: ")))";
    width: 0px;
  }
`;

const SmileyWrapper = styled.div`
  display: flex;
  width: 120px;
  margin-top: 0.5rem;
  color: ${(props) => props.textcolor || "var(--color-primary"};
`;

const SmileyWidth = styled.div`
  min-width: 50px;
`;
