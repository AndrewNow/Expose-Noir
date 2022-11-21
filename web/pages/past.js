import React from "react";
import { client } from "../lib/sanity/client";
import { pastBookingsQuery } from "../lib/sanity/pastBookingsQuery";
import styled from "styled-components";
import { motion } from "framer-motion";
import { breakpoints } from "../utils/breakpoints";
import PrintDjNames from "../components/printDjNames";
import { colorQuery } from "../lib/sanity/settingsQuery";
import Head from "next/head";

const Past = ({ pastBookings, colorSettings }) => {
  const initialLoadAnim = {
    hidden: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
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
        <title>Past events</title>
        <meta name="description" content="Past Events" />
      </Head>
      <Wrapper
        backgroundColor={bgColor}
        variants={initialLoadAnim}
        initial="hidden"
        animate="animate"
      >
        {pastBookings.length ? (
          pastBookings.map((event, idx) => {
            return (
              <DescriptionWrapper
                key={idx}
                variants={staggerChild}
                textColor={textColor}
              >
                {event.name}
                <br />
                <br />
                {event.djList.map((djData, idx) => {
                  return <PrintDjNames djData={djData} key={idx + "names"} />;
                })}
              </DescriptionWrapper>
            );
          })
        ) : (
          <p style={{ color: textColor ? textColor : "var(--color-primary)" }}>
            past bookings not available at the moment.
          </p>
        )}
      </Wrapper>
    </>
  );
};

export const getStaticProps = async () => {
  const pastBookings = await client.fetch(pastBookingsQuery);
  const colorSettings = await client.fetch(colorQuery);
  return {
    props: {
      pastBookings,
      colorSettings,
    },
    revalidate: 10,
  };
};

export default Past;

const Wrapper = styled(motion.div)`
  padding-top: 7.5vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: ${(props) => props.backgroundColor || "var(--color-secondary"};

  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
  }
`;

const DescriptionWrapper = styled(motion.div)`
  max-width: 340px;
  min-width: 340px;
  margin: 0 2rem;
  margin-bottom: 3rem;
  color: ${(props) => props.textColor || "var(--color-primary"};
  @media (max-width: ${breakpoints.m}px) {
    max-width: 70vw;
    width: 340px;
  }
`;
