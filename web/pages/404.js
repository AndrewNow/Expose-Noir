import React from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import Head from "next/head";
import { colorQuery } from "../lib/sanity/settingsQuery";
import { client } from "../lib/sanity/client";

const FouroFour = ({ colorSettings }) => {
  // Check to see if colors are assigned from CMS
  // If not, default to CSS variables
  let bgColor;
  let textColor;
  if (colorSettings.length && colorSettings[0].backgroundColor) {
    bgColor = colorSettings[0].backgroundColor;
  } else {
    bgColor = "var(--color-secondary)";
  }
  if (colorSettings.length && colorSettings[0].textColor) {
    textColor = colorSettings[0].textColor;
  } else {
    textColor = "var(--color-primary)";
  }

  return (
    <>
      <Head>
        <title>404</title>
        <meta name="description" content="Oops! Broken route." />
        <meta name="og:title" content="Oops! Broken route." />
      </Head>
      <Wrapper backgroundColor={bgColor}>
        <Center textColor={textColor}>You've reached a broken page!</Center>
        <br />
        <br />
        <Link href="/" passHref>
          <Return textColor={textColor}>↽ Return</Return>
        </Link>
      </Wrapper>
    </>
  );
};

export default FouroFour;

export const getStaticProps = async () => {
  const colorSettings = await client.fetch(colorQuery);

  return {
    props: {
      colorSettings,
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

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${(props) => props.backgroundColor || "var(--color-secondary)"};
`;

const Center = styled.div`
  animation: ${blink} 0.5s linear infinite alternate;
  margin-bottom: 2rem;
  color: ${(props) => props.textColor || "var(--color-primary)"};
`;

const Return = styled.a`
  color: ${(props) => props.textColor || "var(--color-primary)"} !important;
`;
