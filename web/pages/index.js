import { useEffect, useState } from "react";
import { client } from "../lib/sanity/client";
import { homeQuery } from "../lib/sanity/homeQuery";
import styled, { keyframes } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Cart from "../components/cart";
import CartSummary from "../components/cartSummary";
import Products from "../components/products";
import { eventQuery } from "../lib/sanity/eventQuery";
import MailchimpFormContainer from "../components/Mailchimp/mailchimpFormContainer";

export default function Home({ products }) {
  const initialLoadAnim = {
    hidden: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const staggerChild = {
    hidden: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0, 1],
      transition: {
        duration: 0.5,
        ease: "linear",
      },
    },
  };
  const [connecting, setConnecting] = useState(true);

  const connectingTimeout = () => {
    setTimeout(() => {
      setConnecting(false);
    }, 2000);
  };

  useEffect(() => {
    connectingTimeout();
  }, []);

  const [enterSite, setEnterSite] = useState(null);

  console.log(enterSite);

  const handleInputKeyEvent = (event) => {
    // Number 89 is the "Y" key on the keyboard, 78 is "N"
    if (event.keyCode === 89) {
      event.preventDefault();
      setEnterSite(true);
    } else if (event.keyCode === 78) {
      event.preventDefault();
      setEnterSite(false);
    }
  };

  return (
    <PageWrapper>
      <Wrapper>
        {connecting ? (
          <Connecting>Connecting...</Connecting>
        ) : (
          <Connected>Connection successful.</Connected>
        )}
        <Loader variants={initialLoadAnim} initial="hidden" animate="animate">
          <motion.span variants={staggerChild}>x</motion.span>
          <motion.span variants={staggerChild}>x</motion.span>
          <motion.span variants={staggerChild}>x</motion.span>
          <motion.div variants={staggerChild}>
            <NewsletterWrapper>
              <MailchimpFormContainer />
            </NewsletterWrapper>
          </motion.div>
          <Continue variants={staggerChild}>
            Continue? [
            <Button
              onClick={() => setEnterSite(true)}
              style={{
                background: enterSite ? "black" : "white",
                color: enterSite ? "white" : "black",
              }}
            >
              y
            </Button>
            /
            <Button
              onClick={() => setEnterSite(false)}
              style={{
                background: enterSite ? "white" : "black",
                color: enterSite ? "black" : "white",
              }}
            >
              n
            </Button>
            ]{" "}
          </Continue>
          <AnimatePresence>
            {enterSite !== null &&
              (enterSite ? (
                products.length > 0 ? (
                  <Shop variants={staggerChild}>
                    <TicketTitle>{"> "}tickets available:</TicketTitle>
                    <Cart>
                      <Products products={products} />
                      <CartSummary />
                    </Cart>
                  </Shop>
                ) : (
                  <div>{"> "}Sorry, no events planned at the moment!</div>
                )
              ) : (
                <motion.div variants={staggerChild}>{"> "}bye!</motion.div>
              ))}
          </AnimatePresence>
        </Loader>
        {/* <CommandLineWrapper>
          <p>{"> C:/Users/EN: "}</p>
          <CommandLine
            placeholder="Type command here..."
            onKeyDown={(event) => handleInputKeyEvent(event)}
            // onKeyUp={(event) => handleInputKeyEvent(event)}
            type="text"
            name="CLI"
          />
        </CommandLineWrapper> */}
      </Wrapper>
    </PageWrapper>
  );
}

export const getStaticProps = async () => {
  const posts = await client.fetch(homeQuery);
  const products = await client.fetch(eventQuery);

  return {
    props: {
      posts,
      products,
    },
  };
};

const blink = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;

const Connecting = styled.div`
  animation: ${blink} 0.5s linear infinite alternate;
  margin: 0.5rem 0;
`;
const Connected = styled.div`
  margin: 0.5rem 0;
`;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow-y: hidden;
`;

const Wrapper = styled(motion.div)`
  position: relative;
  margin: 0 auto;
  width: 500px;
  max-width: 500px;
  height: 450px;
  border: 1px solid lightgrey;
  padding: 2rem;
  padding-bottom: 0rem;
  border-radius: 5px;
  overflow-y: scroll;
  overflow-x: hidden;

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    cursor: pointer;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    /* background: #f1f1f1; */
    cursor: pointer;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #88888850;
    border-radius: 5px;
    cursor: pointer;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
    cursor: pointer;
  }
`;

const Loader = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Continue = styled(motion.div)`
  margin: 2rem 0;
`;

const CommandLineWrapper = styled.div`
  position: sticky;
  left: 0%;
  /* transform: translateX(-50%); */
  bottom: 0;
  width: 500px;
  height: 30px;
  margin: 0rem auto;
  margin-top: 2rem;
  border-top: 1px solid grey;
  padding-bottom: 0.5rem;

  background-color: white;

  display: flex;
  align-items: flex-end;
  justify-content: flex-start;

  p {
    display: inline;
    margin: 0;
    margin-right: 0.5rem;
  }
`;

const CommandLine = styled(motion.input)`
  border: none;
  border-bottom: 1px dotted grey;
`;

const Button = styled.button`
  background: white;
  padding: 0 0.5rem;
  :hover,
  :focus {
    color: white;
    background: black;
    animation: ${blink} 0.5s linear infinite alternate;
  }
`;

const TicketTitle = styled.p`
  /* color: BlueViolet; */
`;

const NewsletterWrapper = styled.div`
  margin: 2rem 0;
`;

const Shop = styled(motion.section)`
  /* margin: 2rem 0; */
`;
