import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { breakpoints } from "../utils/breakpoints";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { client } from "../lib/sanity/client";
import { settingsQuery } from "../lib/sanity/settingsQuery";

export default function Home({ settings }) {
  // 1. Handlers for when user clicks on [ y / n ]
  const [showResults, setShowResults] = useState(null);
  const [showBye, setShowBye] = useState(null);
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
    } else if (showResults === false) {
      setTimeout(() => {
        // show "bye!" text after 1000ms (1s)
        setShowBye(true);
        // go to "xxx" video page
        router.push("/xxx");
      }, 1000);
    }
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

  // animation config
  const initialLoadAnim = {
    // hidden: { opacity: 0 },
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

  const delayBottomAnimation = {
    hidden: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        // !!
        // delay: 1.5,
        staggerChildren: 0.5,
      },
    },
  };

  // image hover state
  // const [hover, setHover] = useState(false);

  // Check to see if colors are assigned from CMS
  // If not, default to CSS variables
  let bgColor;
  let textColor;
  if (settings.length && settings[0].backgroundColor) {
    bgColor = settings[0].backgroundColor;
  } else {
    bgColor = "var(--color-secondary)";
  }
  if (settings.length && settings[0].textColor) {
    textColor = settings[0].textColor;
  } else {
    textColor = "var(--color-primary)";
  }

  return (
    <>
      <Head>
        <title>Exposé Noir</title>
        <meta name="description" content="Exposé Noir | Home" />
      </Head>
      <PageWrapper backgroundColor={bgColor}>
        <Container>
          {settings.length && settings[0].imageUrl ? (
            <Span
              // onMouseEnter={() => setHover(true)}
              // onMouseLeave={() => setHover(false)}
              // variants={initialLoadAnim}
              // initial="hidden"
              // animate="animate"
            >
              <Image
                src={settings[0].imageUrl}
                // src={hover ? "/biosphere.gif" : "/biosphere.jpg"}
                placeholder="blurred"
                blurDataURL={settings[0].lqip}
                alt="Homepage image"
                width={400}
                height={400}
                quality={70}
                objectFit="contain"
                objectPosition="center"
              />
            </Span>
          ) : (
            <TripleX
              textcolor={textColor}
              variants={initialLoadAnim}
              initial="hidden"
              animate="animate"
            >
              <motion.span variants={staggerChild}>
                <h2>X</h2>
              </motion.span>
              <motion.span variants={staggerChild}>
                <h2>X</h2>
              </motion.span>
              <motion.span variants={staggerChild}>
                <h2>X</h2>
              </motion.span>
            </TripleX>
          )}
          <BottomSection
            // variants={delayBottomAnimation}
            // initial="hidden"
            // animate="animate"
          >
            <AnimatePresence>
              {/* If user presses no, show sad faces, then timeout to say "bye!" and change page route */}
              {showResults !== null ? (
                showResults ? (
                  <UserPressedYes textcolor={textColor}> :</UserPressedYes>
                ) : (
                    showBye ? <UserPressedNoSadFace>
                          <p>bye!</p>
                        </UserPressedNoSadFace> :
                      <UserPressedNo textcolor={textColor} variants={staggerChild}>
                      {" "}
                      :
                      </UserPressedNo>
                )
              ) : (
                <Continue variants={staggerChild}>
                  <ContinueInput textcolor={textColor}>
                    <h3>continue? </h3>
                    <UserText>
                      <h3>{userText}</h3>
                    </UserText>
                    <Cursor textcolor={textColor} />
                  </ContinueInput>
                  <ContinueButtons textcolor={textColor}>
                    [
                    <Button
                      onClick={handleUserYes}
                      textcolor={textColor}
                      backgroundColor={bgColor}
                    >
                      y{" "}
                    </Button>
                    /
                    <Button
                      onClick={handleUserNo}
                      textcolor={textColor}
                      backgroundColor={bgColor}
                    >
                      {" "}
                      n
                    </Button>
                    ]
                  </ContinueButtons>
                </Continue>
              )}
            </AnimatePresence>
          </BottomSection>
        </Container>
      </PageWrapper>
    </>
  );
}

export const getStaticProps = async () => {
  const settings = await client.fetch(settingsQuery);

  return {
    props: {
      settings,
    },
    revalidate: 10,
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

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
  background: ${(props) => props.backgroundColor || "var(--color-secondary)"};
`;

// OLD CONTAINER FOR XXX ANIMATION
// const Container = styled.section`
//   width: 200px;
//   height: 252px;

//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate3D(-50%, -50%, 0);

//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   margin: 3rem auto;
//   @media (max-width: ${breakpoints.s}px) {
//     bottom: 10vh;
//   }
// `;
const Container = styled.section`
  width: 400px;
  height: auto;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3D(-50%, -50%, 0);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 3rem auto;

  @media (max-width: ${breakpoints.l}px) {
    width: 250px;
  }

  @media (max-width: ${breakpoints.s}px) {
    width: 180px;
  }
`;

// !!
const Span = styled(motion.span)`
  max-width: 400px;
`;

const BottomSection = styled(motion.div)`
  height: 160px;
  box-sizing: border-box;
`;

const Continue = styled(motion.div)`
  margin: 3rem auto;
  text-align: center;

  h3 {
    margin: 0;
  }
`;

const ContinueInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* color: var(--color-primary); */
  color: ${(props) => props.textcolor || "var(--color-primary)"};
  :first-of-type(h3) {
    padding-right: 0.25rem;
  }
`;

const ContinueButtons = styled.div`
  margin: 1rem auto;
  /* !! */
  color: ${(props) => props.textcolor || "var(--color-primary)"};
`;

const TripleX = styled(motion.div)`
  margin: 0 auto;
  margin-bottom: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: center;

  h2 {
    color: ${(props) => props.textcolor || "var(--color-primary)"};
    font-size: 16px;
    font-family: sans-serif;
  }

  span {
    margin: 0 0.25rem;
    /* font-family: sans-serif; */
  }
`;

const Button = styled.button`
  background: ${(props) => props.backgroundColor || "var(--color-secondary)"};
  padding: 0 0.1rem;
  font-size: var(--font-sans);
  font-weight: 300;
  /* !! */
  color: ${(props) => props.textcolor || "var(--color-primary)"} !important;

  :first-child {
    margin-right: 0.25rem;
  }
  :last-child {
    margin-left: 0.25rem;
  }

  :hover {
    color: ${(props) =>
      props.backgroundColor || "var(--color-secondary)"} !important;
    /* background: black; */
    background: ${(props) => props.textcolor || "var(--color-primary)"};
    animation: ${blink} 0.5s linear alternate;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 0 0.25rem;
    :hover {
      animation: none;
    }
  }
`;

const Cursor = styled.div`
  animation: ${blink} 0.5s linear alternate infinite;
  width: 10px;
  height: 20px;
  margin: 0.25rem 0;
  /* !! */
  /* background-color: var(--color-primary); */
  background-color: ${(props) => props.textcolor || "var(--color-primary)"};
  display: inline-block;
`;

const UserText = styled.span`
  max-width: 100px;
  margin-left: 0.5rem;
  overflow: hidden;
`;

const ellipsis = keyframes`
  to {
    width: 30px;
  }
`;

const UserPressedYes = styled.div`
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* !! */
  color: ${(props) => props.textcolor || "var(--color-primary)"};
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

const UserPressedNo = styled(motion.div)`
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.textcolor || "var(--color-primary)"};

  ::after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis steps(4, end) 900ms infinite;
    animation: ${ellipsis} steps(4, end) 900ms infinite;
    content: "(((";
    width: 0px;
  }
`;


const UserPressedNoSadFace = styled.div`
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.textcolor || "var(--color-primary)"};
`