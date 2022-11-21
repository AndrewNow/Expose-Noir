import React from "react";
import styled, { keyframes } from "styled-components";
import Head from "next/head";
import { breakpoints } from "../utils/breakpoints";
import { client } from "../lib/sanity/client";
import { videoQuery } from "../lib/sanity/videoQuery";
import { colorQuery } from "../lib/sanity/settingsQuery";

const xxx = ({ videoUrl, colorSettings }) => {
  const vidUrl = videoUrl[0]?.url;
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
        <title>XXX</title>
        <meta name="description" content="xxx" />
      </Head>
      <Wrapper backgroundColor={bgColor}>
        <Center>
          {vidUrl ? (
            <Video key={vidUrl} type="video/mp4" controls playsInline>
              <source src={vidUrl} />
            </Video>
          ) : (
            <small
              style={{ color: textColor ? textColor : "var(--color-primary)" }}
            >
              nothing to see here.
            </small>
          )}
        </Center>
      </Wrapper>
    </>
  );
};

export const getStaticProps = async () => {
  const videoUrl = await client.fetch(videoQuery);
  const colorSettings = await client.fetch(colorQuery);
  return {
    props: {
      videoUrl,
      colorSettings,
    },
    revalidate: 10,
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
  background: ${(props) => props.backgroundColor || "var(--color-secondary)"};
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
