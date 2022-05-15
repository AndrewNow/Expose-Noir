import React from "react";
import { client } from "../lib/sanity/client";
import { pastBookingsQuery } from "../lib/sanity/pastBookingsQuery";
import styled from "styled-components";
import { motion } from "framer-motion";
import { breakpoints } from "../utils/breakpoints";
import PrintDjNames from "../components/printDjNames";

const Past = ({ pastBookings }) => {
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

  return (
    <Wrapper variants={initialLoadAnim} initial="hidden" animate="animate">
      {pastBookings.map((event, idx) => {
        return (
          <DescriptionWrapper key={idx} variants={staggerChild}>
            {event.name}
            <br />
            <br />
            {event.djList.map((djData, idx) => {
              return <PrintDjNames djData={djData} key={idx + "names"} />;
            })}
          </DescriptionWrapper>
        );
      })}
    </Wrapper>
  );
};

export const getStaticProps = async () => {
  const pastBookings = await client.fetch(pastBookingsQuery);

  return {
    props: {
      pastBookings,
    },
  };
};

export default Past;

const Wrapper = styled(motion.div)`
  padding-top: 7.5vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
  }
`;

const DescriptionWrapper = styled(motion.div)`
  max-width: 340px;
  min-width: 340px;
  margin: 0 2rem;
  margin-bottom: 3rem;
  @media (max-width: ${breakpoints.m}px) {
    max-width: 70vw;
    width: 340px;
  }
`;
