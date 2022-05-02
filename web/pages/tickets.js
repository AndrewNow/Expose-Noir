import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import Cart from "../components/cart";
import CartSummary from "../components/cartSummary";
import Products from "../components/products";
import MailchimpFormContainer from "../components/Mailchimp/mailchimpFormContainer";
import { client } from "../lib/sanity/client";
import { eventDescriptionQuery } from "../lib/sanity/eventDescriptionQuery";
import { eventQuery } from "../lib/sanity/eventQuery";
import BlockContent from "@sanity/block-content-to-react";
import urlFor from "../lib/sanity/urlFor";
import { breakpoints } from "../components/utils/breakpoints";
import Head from "next/head";

const Tickets = ({ eventDescription, products }) => {
  // logic for converting ISO date into regular human-readable format below
  const event = eventDescription[0];

  const d = new Date(`${event.launchAt}`);
  const e = new Date(`${event.endAt}`);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();
  let startHour = d.getHours();

  let endHour = e.getHours();

  let fullTimeStart = "";
  let fullTimeEnd = "";
  // create a 24 element (0-23) array containing following values
  const hourArray = [
    12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11,
  ];
  if (startHour < 12) {
    // Just for an example, if hour = 11 and minute = 29
    fullTimeStart = hourArray[startHour] + "am"; // fulltime = 11:29 AM
  } else {
    // similarly, if hour = 22 and minute = 8
    fullTimeStart = hourArray[startHour] + "pm"; // fulltime = 10:08 PM
  }
  if (endHour < 12) {
    // Just for an example, if hour = 11 and minute = 29
    fullTimeEnd = hourArray[endHour] + " am"; // fulltime = 11:29 AM
  } else {
    // similarly, if hour = 22 and minute = 8
    fullTimeEnd = hourArray[endHour] + "pm"; // fulltime = 10:08 PM
  }

  // animation config
  const initialLoadAnim = {
    hidden: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const staggerChild = {
    hidden: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0, 1],
      transition: {
        duration: 0.25,
        ease: "linear",
      },
    },
  };

  const [ticketOpen, setTicketOpen] = useState(false);

  return (
    <>
      <Head>
        <title>tickets</title>
        <meta name="description" content="Exposé Noir | Ticketing" />
      </Head>
      <Wrapper variants={initialLoadAnim} initial="hidden" animate="animate">
        {eventDescription[0] ? (
          <DescriptionWrapper variants={staggerChild}>
            <WrapMarkdown>
              <BlockContent blocks={event?.description} />
            </WrapMarkdown>
            <DownloadPoster
              href={urlFor(event?.image)}
              aria-label="download poster"
              target="_blank"
              download={`${event.name}_poster`}
            >
              download poster
            </DownloadPoster>{" "}
            <br />
            <br />
            <a href="mailto:complaints@exposenoir.com">
              complaints@exposenoir.com
            </a>
          </DescriptionWrapper>
        ) : (
          <NoEvents variants={staggerChild}>
            <p>
              No events planned at the moment, but you can subscribe to our
              newsletter in the meantime for updates.
              <br />
              <br />
              <NewsletterWrapper>
                <MailchimpFormContainer />
              </NewsletterWrapper>
            </p>
          </NoEvents>
        )}
        {eventDescription[0] && (
          <ShopWrapper variants={staggerChild}>
            <TicketLineWrapper>
              <TicketTitleButton onClick={() => setTicketOpen(!ticketOpen)}>
                <h2>tickets</h2>
              </TicketTitleButton>
              {!ticketOpen && (
                <SmileyWidth>
                  <AnimateSmiley>:)</AnimateSmiley>
                </SmileyWidth>
              )}
            </TicketLineWrapper>
            <AnimatePresence exitBeforeEnter>
              {ticketOpen && (
                <motion.div variants={staggerChild} exit="hidden">
                  <DescriptionHeader>
                    <h3>{event?.name}</h3>
                    <p>
                      {event?.launchAt && (
                        <span>
                          {month} {date}, {year}. {fullTimeStart} to{" "}
                          {fullTimeEnd}
                        </span>
                      )}
                    </p>
                    <p>{event?.location}</p>
                  </DescriptionHeader>
                  <Cart>
                    <Products products={products} />
                    <CartSummary />
                  </Cart>
                </motion.div>
              )}
            </AnimatePresence>
          </ShopWrapper>
        )}
      </Wrapper>
    </>
  );
};

export const getStaticProps = async () => {
  const products = await client.fetch(eventQuery);
  const eventDescription = await client.fetch(eventDescriptionQuery);

  return {
    props: {
      products,
      eventDescription,
    },
  };
};

export default Tickets;

const Wrapper = styled(motion.div)`
  /* max-width: 600px; */
  padding-top: 7.5vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: ${breakpoints.s}px) {
    flex-direction: column;
  }
`;

const DescriptionWrapper = styled(motion.div)`
  max-width: 200px;
  margin: 0 2rem;
  @media (max-width: ${breakpoints.s}px) {
    max-width: 70vw;
    width: 250px;
    margin: 0rem auto;
    margin-bottom: 1rem;
  }
`;

const DescriptionHeader = styled.div`
  h2 {
    text-decoration: underline;
    font-size: 16px;
    margin-bottom: 1rem;
  }
  p {
    text-transform: lowercase;
    margin: 0;
  }
`;

const ShopWrapper = styled(motion.div)`
  margin: 2rem;
  width: 250px;

  @media (max-width: ${breakpoints.s}px) {
    max-width: 70vw;
    width: 250px;
    margin: 2rem auto;
  }
`;

const DownloadPoster = styled.a`
  text-decoration: underline;
  cursor: pointer;
`;

const WrapMarkdown = styled.div`
  margin: 2.5rem 0;

  p {
    margin-bottom: 2rem;
  }
`;

const NewsletterWrapper = styled(motion.div)`
  margin: 2rem 0;
`;

const NoEvents = styled(motion.div)`
  height: 100%;
  max-width: 400px;
  margin: 2rem;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TicketLineWrapper = styled.div`
  display: flex;
`;

const TicketTitleButton = styled.button`
  background: none;
  text-decoration: underline;
  padding: 0;
  padding-right: 0.5rem;
  h2 {
    margin-top: 0;
  }
`;

const smiley = keyframes`
  to {
    width: 30px;
  }
`;
const AnimateSmiley = styled.div`
  margin-right: 0.5rem;
  ::after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${smiley} steps(4, end) 900ms infinite alternate;
    content: ")))";
    width: 0px;
  }
`;

const SmileyWrapper = styled.div`
  display: flex;
  width: 120px;
  margin-top: 0.5rem;
`;

const SmileyWidth = styled.div`
  min-width: 50px;
`;
