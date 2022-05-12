import React from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import Head from "next/head";
import { breakpoints } from "../components/utils/breakpoints";
import { client } from "../lib/sanity/client";
import { videoQuery } from "../lib/sanity/videoQuery";

const xxx = ({ videoUrl }) => {
  const vidUrl = videoUrl[0]?.url;

  return (
    <>
      <Head>
        <title>xxx</title>
        <meta name="description" content="xxx" />
      </Head>
      <Wrapper>
        <Center>
          {vidUrl && (
            <Video key={vidUrl} type="video/mp4" controls playsInline>
              <source src={vidUrl} />
            </Video>
          )}
        </Center>
        <br />
        <br />
        <Return href="/">↽ Return</Return>
      </Wrapper>
    </>
  );
};

export const getStaticProps = async () => {
  const videoUrl = await client.fetch(videoQuery);
  return {
    props: {
      videoUrl,
    },
  };
};

export default xxx;

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
  /* animation: ${blink} 0.5s linear infinite alternate; */
  margin-bottom: 2rem;
  position: relative;
  max-width: 500px;

  @media (max-width: ${breakpoints.s}px) {
    max-width: 90vw;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
`;

const Return = styled(Link)``;
