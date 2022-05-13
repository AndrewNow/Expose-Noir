import React from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import Head from "next/head";

const FouroFour = () => {
  return (
    <>
      <Head>
        <title>404</title>
        <meta name="description" content="Oops! Broken route." />
        <meta name="og:title" content="Oops! Broken route." />
      </Head>
      <Wrapper>
        <Center>You've reached a broken page!</Center>
        <br />
        <br />
        <Return href="/">↽ Return</Return>
      </Wrapper>
    </>
  );
};



export default FouroFour;

const blink = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Center = styled.div`
  animation: ${blink} 0.5s linear infinite alternate;
  margin-bottom: 2rem;
`;

const Return = styled(Link)``;