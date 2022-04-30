import { useEffect, useState } from "react";
import { client } from "../lib/sanity/client";
import { homeQuery } from "../lib/sanity/homeQuery";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { eventQuery } from "../lib/sanity/eventQuery";
import { breakpoints } from "../components/breakpoints";
import { useRouter } from "next/router";

export default function Home({ products }) {
  // animation config
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
      setTimeout(() => {
        // go to ticket page
        router.push("/tickets");
      }, 1500);
    } else return;
  }, [showResults]);

  // 4. Detect [ Y / N ] keypresses
  // https://stackoverflow.com/questions/55565444/how-to-register-event-with-useeffect-hooks

  const [userText, setUserText] = useState("");

  useEffect(() => {
    const handleUserKeyPress = (event) => {
      const { key, keyCode } = event;

      // copy what user types and add it to state
      if (keyCode === 32 || (keyCode >= 65 && keyCode <= 90)) {
        setUserText((prev) => `${prev}${key}`); // use updater function here
      }
      // if user hits Y
      if (keyCode === 89) {
        event.preventDefault();
        handleUserYes();
      }
      // if user hits N
      if (keyCode === 78) {
        event.preventDefault();
        handleUserNo();
        setFakeQuery(false);
        setResultsFound(false);
      }

      // if user hits Backspace, remove the last character
      if (keyCode === 8) {
        event.preventDefault();
        setUserText(userText.substring(0, userText.length - 1));
      }
    };

    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  const router = useRouter();

  return (
    <PageWrapper>
      <TerminalWrapper
        variants={initialLoadAnim}
        initial="hidden"
        animate="animate"
      >
        <motion.span variants={staggerChild}>x</motion.span>
        <motion.span variants={staggerChild}>x</motion.span>
        <motion.span variants={staggerChild}>x</motion.span>
        <Continue variants={staggerChild}>
          Continue? [<Button onClick={handleUserYes}>y</Button>/
          <Button onClick={handleUserNo}>n</Button>
          ]: <UserText>{userText}</UserText>
          <Cursor />
        </Continue>
        {showResults !== null &&
          (showResults ? (
            <Result variants={staggerChild}> :) </Result>
          ) : (
            "bye!"
          ))}
      </TerminalWrapper>
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

// const Connecting = styled.div`
//   animation: ${blink} 0.5s linear infinite alternate;
//   margin: 1rem 0;
// `;
// const Connected = styled.div`
//   margin: 1rem 0;
// `;

const Continue = styled(motion.div)`
  margin: 3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
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

const TerminalWrapper = styled(motion.div)`
  margin: 0 auto;
  width: 500px;
  max-width: 500px;
  padding: 2rem;
  overflow-x: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  @media (max-width: ${breakpoints.s}px) {
    width: 70vw;
    border: none;
  }
`;

const Button = styled.button`
  background: white;
  padding: 0 0.5rem;
  :last-child {
    margin-right: 0.25rem;
  }
  :hover,
  :focus {
    color: white;
    background: black;
    animation: ${blink} 0.5s linear alternate;
  }
`;

const Cursor = styled.div`
  animation: ${blink} 0.5s linear alternate infinite;
  width: 10px;
  height: 20px;
  margin: 0.25rem 0;
  background-color: black;
  display: inline-block;
`;

const UserText = styled.span`
  max-width: 100px;
  overflow: hidden;
`;

const Result = styled(motion.div)`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 40%;
`