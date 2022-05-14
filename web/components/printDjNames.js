import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const PrintDjNames = (djData) => {
  const [hover, setHover] = useState(false);

  const flash = {
    hidden: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0, 1],
      transition: {
        duration: 0.25,
        ease: "linear",
      },
    },
  };
  return (
    <Artist
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      // onClick={() => setHover(!hover)}
    >
      {djData.djData.djName}
      {hover && (
        <AnimatePresence exitBeforeEnter>
          <motion.span
            variants={flash}
            initial="hidden"
            animate="animate"
            exit="hidden"
          >
            {" - "}
            {djData.djData.bookingInfo}
          </motion.span>
        </AnimatePresence>
      )}
    </Artist>
  );
};

export default PrintDjNames;

const Artist = styled.div`
  cursor: default;
`;
