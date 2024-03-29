import styled, { keyframes } from "styled-components";
import Head from "next/head";

export const Layout = (props) => {
  return (
    <>
      <Head>
        {/* <link rel="icon" href="/bluefavicon.png" /> */}
        {/* <link rel="icon" href="/xxxfavicon.png" /> */}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Main>{props.children}</Main>
    </>
  );
};

const blink = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;

const Main = styled.main`
  margin: 0 auto;
  * {
    font-family: monospace;
    font-size: var(--font-mono);
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: monospace;
    font-size: var(--font-mono);
    font-weight: 300;
  }

  a,
  button {
    /* color: var(--color-primary); */
    :hover {
      animation: ${blink} 0.35s linear infinite alternate-reverse;
    }
  }

  button {
    border: none;
    cursor: pointer;
  }
`;
