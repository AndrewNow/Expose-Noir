import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { breakpoints } from "../components/utils/breakpoints";
import { useRouter } from "next/router";

export default function Home() {
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

  // 1. Handlers for when user clicks on [ y / n ]
  const [showResults, setShowResults] = useState(null);
  const [userText, setUserText] = useState("");

  const handleUserYes = () => {
    setShowResults(true);
    setUserText("y");
  };
  const handleUserNo = () => {
    setShowResults(false);
    setUserText("n");
  };

  // 2. If a user clicks yes, run a fake query
  useEffect(() => {
    if (showResults === true) {
      setTimeout(() => {
        // go to ticket page
        router.push("/tickets");
      }, 1000);
    } else return;
  }, [showResults]);

  // 3. Detect [ Y / N ] keypresses
  // https://stackoverflow.com/questions/55565444/how-to-register-event-with-useeffect-hooks

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
            <Result> :</Result>
          ) : (
            <motion.div variants={staggerChild}>bye!</motion.div>
          ))}
      </TerminalWrapper>
    </PageWrapper>
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

const ellipsis = keyframes`
  to {
    width: 30px;    
  }
}
`;

const Result = styled.div`
  ::after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis steps(4, end) 900ms infinite;
    animation: ${ellipsis} steps(4, end) 900ms infinite;
    content: ")))";
    width: 0px;
  }
`;
