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
import { breakpoints } from "../components/breakpoints";

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

  // 1. State for the intial fake loader
  const [connecting, setConnecting] = useState(true);
  const connectingTimeout = () => {
    setTimeout(() => {
      setConnecting(false);
    }, 1500);
  };

  useEffect(() => {
    connectingTimeout();
  }, []);

  // 2. Handlers for when user clicks on [ y / n ]
  const [showResults, setShowResults] = useState(null);

  const handleUserYes = () => {
    setShowResults(true);
  };
  const handleUserNo = () => {
    setShowResults(false);
  };

  // 3. If a user clicks yes, run a fake query
  const [fakeQuery, setFakeQuery] = useState(false);
  const [resultsFound, setResultsFound] = useState(false);

  const runFakeQuery = () => {
    setTimeout(() => {
      setResultsFound(true);
    }, 1500);
    setTimeout(() => {
      setFakeQuery(true);
    }, 2500);
  };

  useEffect(() => {
    if (showResults === true) {
      runFakeQuery();
    }
  }, [showResults]);

  console.log(fakeQuery);

  // const handleInputKeyEvent = (event) => {
  //   // Number 89 is the "Y" key on the keyboard, 78 is "N"
  //   if (event.keyCode === 89) {
  //     event.preventDefault();
  //     setShowResults(true);
  //   } else if (event.keyCode === 78) {
  //     event.preventDefault();
  //     setShowResults(false);
  //   }
  // };

  return (
    <PageWrapper>
      <Wrapper>
        <TerminalWrapper>
          {connecting ? (
            <Connecting>Connecting...</Connecting>
          ) : (
            <Connected>Connection successful.</Connected>
          )}
          <Loader variants={initialLoadAnim} initial="hidden" animate="animate">
            <motion.span variants={staggerChild}>x</motion.span>
            <motion.span variants={staggerChild}>x</motion.span>
            <motion.span variants={staggerChild}>x</motion.span>
            <Continue variants={staggerChild}>
              Continue? [
              <Button
                onClick={handleUserYes}
                style={{
                  background: showResults ? "black" : "white",
                  color: showResults ? "white" : "black",
                }}
              >
                y
              </Button>
              /
              <Button
                onClick={handleUserNo}
                style={{
                  background: showResults ? "white" : "black",
                  color: showResults ? "black" : "white",
                }}
              >
                n
              </Button>
              ]{" "}
            </Continue>
            <AnimatePresence>
              {showResults !== null &&
                (showResults ? (
                  products.length > 0 ? (
                    <>
                      {resultsFound ? (
                        <FakeQueryComplete>Query complete.</FakeQueryComplete>
                      ) : (
                        <FakeQuery>Querying data...</FakeQuery>
                      )}
                      {resultsFound && (
                        <motion.div variants={staggerChild}>
                          {"> "} 1 event found
                        </motion.div>
                      )}
                      {fakeQuery && (
                        <>
                          <motion.div
                            variants={initialLoadAnim}
                            initial="hidden"
                            animate="animate"
                          >
                            <TicketTitle variants={staggerChild}>
                              {"> "}tickets available:
                            </TicketTitle>
                            <Shop variants={staggerChild}>
                              <Cart>
                                <Products products={products} />
                                <CartSummary />
                              </Cart>
                            </Shop>
                          </motion.div>
                        </>
                      )}
                    </>
                  ) : (
                    <NewsletterWrapper variants={staggerChild}>
                      <MailchimpFormContainer />
                    </NewsletterWrapper>
                  )
                ) : (
                  <motion.div variants={staggerChild}>{"> "}bye!</motion.div>
                ))}
            </AnimatePresence>
          </Loader>
        </TerminalWrapper>
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
  margin: 1rem 0;
`;
const Connected = styled.div`
  margin: 1rem 0;
`;

const Continue = styled(motion.div)`
  margin: 1rem 0;
  margin-bottom: 2rem;
`;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
`;

const Wrapper = styled(motion.div)`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ::-webkit-scrollbar {
    width: 5px;
    cursor: pointer;
  }

  ::-webkit-scrollbar-track {
    /* background: #f1f1f1; */
    cursor: pointer;
  }
  ::-webkit-scrollbar-thumb {
    background: #88888850;
    border-radius: 5px;
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
    cursor: pointer;
  }
`;

const TerminalWrapper = styled.div`
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

  @media (max-width: ${breakpoints.s}px) {
    width: 70vw;
  }
`;

const Loader = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CommandLineWrapper = styled.div`
  /* position: absolute; */
  /* left: 50%; */
  /* transform: translateX(-50%); */
  /* bottom: 0; */
  width: 500px;
  height: 30px;
  margin: 0rem auto;
  /* margin-top: 2rem; */
  /* border-top: 1px solid grey; */
  padding-bottom: 0.5rem;

  background-color: white;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;

  p {
    color: green;
    display: inline;
    margin: 0;
    margin-right: 0.5rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    display: none;
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
    animation: ${blink} 0.5s linear alternate;
  }
`;

const TicketTitle = styled(motion.div)`
  margin: 0;
`;

const NewsletterWrapper = styled(motion.div)`
  margin: 2rem 0;
`;

const FakeQuery = styled.div`
  margin: 1rem 0;
  animation: ${blink} 0.5s linear infinite alternate;
`;
const FakeQueryComplete = styled.div`
  margin: 1rem 0;
`;

const Shop = styled(motion.section)``;
