import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import Cart from "../components/cart";
import CartSummary from "../components/cartSummary";
import Products from "../components/products";
import MailchimpFormContainer from "../components/Mailchimp/mailchimpFormContainer";
import { client } from "../lib/sanity/client";
import { eventDescriptionQuery } from "../lib/sanity/eventDescriptionQuery";
import { eventQuery } from "../lib/sanity/eventQuery";
import { PortableText } from "@portabletext/react";
import SanityImageComponent from "../utils/sanityImageComponent";
import urlFor from "../lib/sanity/urlFor";
import { breakpoints } from "../utils/breakpoints";
import Head from "next/head";
import Link from "next/link";
import { WindupChildren, Pause, Pace } from "windups";

const Tickets = ({ eventDescription, products }) => {
  // logic for converting ISO date into regular human-readable format below
  const event = eventDescription[0];

  const d = new Date(`${event?.launchAt}`);
  const e = new Date(`${event?.endAt}`);

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

  const shopLoadAnim = {
    hidden: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.25,
        staggerChildren: 0.1,
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
  const staggerChildSlow = {
    hidden: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0, 1],
      transition: {
        duration: 0.5,
        ease: "linear",
      },
    },
  };

  const [ticketOpen, setTicketOpen] = useState(false);

  useEffect(() => {
    if (event?.sentence1 || event?.sentence2) {
      setTypeWriterFinished(false);
    }
  }, []);

  const [typeWriterFinished, setTypeWriterFinished] = useState(false);

  return (
    <>
      <Head>
        <title>tickets</title>
        <meta name="description" content="Exposé Noir | Ticketing" />
      </Head>
      <Wrapper>
        {eventDescription[0] ? (
          <DescriptionWrapper>
            <WindupChildren onFinished={() => setTypeWriterFinished(true)}>
              <p>
                <Pace getPace={(char) => (char === " " ? 100 : 40)}>
                  {event?.sentence1}
                </Pace>
              </p>
              {event?.sentence2 && (
                <>
                  <Pause ms={800} />
                  <p>
                    <Pace getPace={(char) => (char === " " ? 100 : 40)}>
                      {event?.sentence2}
                    </Pace>
                  </p>
                  <Pause ms={500} />
                </>
              )}
            </WindupChildren>
            <motion.div
              variants={initialLoadAnim}
              initial="hidden"
              animate={typeWriterFinished ? "animate" : "hidden"}
              // animate="animate"
            >
              <motion.div variants={staggerChildSlow}>
                <WrapMarkdown>
                  <PortableText
                    value={event?.description}
                    components={{
                      types: {
                        image: SanityImageComponent,
                      },
                    }}
                  />
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
                <Link href="/past">past bookings</Link>
                <br />
                <a href="mailto:complaints@exposenoir.com">
                  complaints@exposenoir.com
                </a>
              </motion.div>
            </motion.div>
          </DescriptionWrapper>
        ) : (
          <NoEvents
            variants={initialLoadAnim}
            initial="hidden"
            animate="animate"
          >
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
          <motion.div
            variants={shopLoadAnim}
            initial="hidden"
            animate={typeWriterFinished ? "animate" : "hidden"}
          >
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
          </motion.div>
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
    revalidate: 10,
  };
};

export default Tickets;

const Wrapper = styled.div`
  /* max-width: 600px; */
  padding-top: 7.5vh;
  padding-bottom: 2rem;
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
  margin: 2rem;
  p {
    margin-top: 0rem;
    margin-bottom: 2rem;
  }
  a {
    display: inline-block;
    padding: 0.25rem 0;
  }
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
  position: sticky;
  top: 7.5vh;

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

const WrapMarkdown = styled(motion.div)`
  /* margin: 2.5rem 0; */
  position: relative;
  max-width: 100%;

  img {
    margin: 1rem 0;
    max-width: 100%;
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
