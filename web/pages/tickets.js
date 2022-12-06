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
import { colorQuery } from "../lib/sanity/settingsQuery";
import { newsletterTextQuery } from "../lib/sanity/newsletterTextQuery";
import MarkdownContent from "../utils/MarkdownContent";

const Tickets = ({
  eventDescription,
  products,
  colorSettings,
  newsletterText,
}) => {
  // logic for converting ISO date into regular human-readable format below
  const event = eventDescription[0];

  const d = new Date(`${event?.launchAt}`);
  let e;
  if (event?.endAt) {
    e = new Date(`${event?.endAt}`);
  } else {
    e = null;
  }

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

  let endHour;

  if (e) {
    endHour = e.getHours();
  } else {
    endHour = null;
  }

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
  if (endHour !== null) {
    if (endHour < 12) {
      // Just for an example, if hour = 11 and minute = 29
      fullTimeEnd = hourArray[endHour] + " am"; // fulltime = 11:29 AM
    } else {
      // similarly, if hour = 22 and minute = 8
      fullTimeEnd = hourArray[endHour] + "pm"; // fulltime = 10:08 PM
    }
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
    hidden: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      // opacity: [0, 1, 0, 1],
      transition: {
        duration: 0.5,
        ease: "linear",
      },
    },
  };
  const staggerChildSlow = {
    hidden: { opacity: 0 },
    animate: {
      opacity: 1,
      // opacity: [0, 1, 0, 1],
      transition: {
        duration: 0.5,
        ease: "linear",
      },
    },
  };

  const [ticketOpen, setTicketOpen] = useState(false);

  // typewriter effect logic
  // https://windups.gwil.co/

  // wait for the typewriter animation to finish before showing the rest of the content
  const [typeWriterFinished, setTypeWriterFinished] = useState(false);

  useEffect(() => {
    if (event?.sentence1 || event?.sentence2) {
      setTypeWriterFinished(false);
    }
    // if no string for sentence 1 or 2, just skip the typewriter delay
    // to load the rest of the content immediately.
    else {
      setTypeWriterFinished(true);
    }
  }, []);

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
        <title>Tickets</title>
        <meta name="description" content="Exposé Noir | Ticketing" />
        <meta name="theme-color" content={bgColor} />
      </Head>
      <Wrapper backgroundColor={bgColor}>
        {/* Only show the shop if an event description exists */}
        {eventDescription[0] ? (
          <DescriptionWrapper textcolor={textColor}>
            <WindupChildren onFinished={() => setTypeWriterFinished(true)}>
              <p>
                <Pace getPace={(char) => (char === " " ? 40 : 30)}>
                  {event?.sentence1}
                </Pace>
              </p>
              {event?.sentence2 && (
                <>
                  <Pause ms={1000} />
                  <p>
                    {/* pace was 70-50 for both lines */}
                    <Pace getPace={(char) => (char === " " ? 40 : 30)}>
                      {event?.sentence2}
                    </Pace>
                  </p>
                  <Pause ms={1000} />
                </>
              )}
            </WindupChildren>
            <motion.div
              variants={initialLoadAnim}
              initial="hidden"
              animate={typeWriterFinished ? "animate" : "hidden"}
            >
              <motion.div variants={staggerChildSlow}>
                <WrapMarkdown>
                  <MarkdownContent blocks={event?.description} />
                </WrapMarkdown>
                {event?.image && (
                  <DownloadPoster
                    href={urlFor(event?.image)}
                    aria-label="download poster"
                    target="_blank"
                    download={`${event.name}_poster`}
                  >
                    download poster
                  </DownloadPoster>
                )}
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
            // variants={initialLoadAnim}
            // initial="hidden"
            // animate="animate"
            textcolor={textColor}
          >
            <div>
              <WrapMarkdown>
                <PortableText
                  value={newsletterText.text}
                  components={{
                    types: {
                      image: SanityImageComponent,
                    },
                  }}
                />
              </WrapMarkdown>
              <NewsletterWrapper>
                <MailchimpFormContainer
                  successMessage={
                    newsletterText.successMessage &&
                    newsletterText.successMessage
                  }
                />
              </NewsletterWrapper>
            </div>
          </NoEvents>
        )}
        {eventDescription[0] && (
          // Only show the shop if an event description exists
          <ShopWrapper
            variants={shopLoadAnim}
            initial="hidden"
            animate={typeWriterFinished ? "animate" : "hidden"}
          >
            <Sticky
              // variants={staggerChild}
            >
              <TicketLineWrapper textcolor={textColor}>
                <TicketTitleButton
                  onClick={() => setTicketOpen(!ticketOpen)}
                  textcolor={textColor}
                >
                  <h2>tickets</h2>
                </TicketTitleButton>
                {!ticketOpen && (
                  <SmileyWidth>
                    <AnimateSmiley>:)</AnimateSmiley>
                  </SmileyWidth>
                )}
              </TicketLineWrapper>
              {/* <AnimatePresence exitBeforeEnter> */}
                {ticketOpen && (
                  <motion.div variants={staggerChild} exit="hidden">
                    <DescriptionHeader textcolor={textColor}>
                      <h3>{event?.name}</h3>
                      <p>
                        {event?.launchAt && (
                          <span>
                            {month} {date}, {year}. {fullTimeStart} to{" "}
                            {fullTimeEnd ? fullTimeEnd : "?"}
                          </span>
                        )}
                      </p>
                      {event?.location ? (
                        <p>{event?.location}</p>
                      ) : (
                        <p>location tba</p>
                      )}
                      {event?.additionalInfo && (
                        <>
                          <br />
                          <WrapMarkdown>
                            <PortableText
                              value={event?.additionalInfo}
                              components={{
                                types: {
                                  image: SanityImageComponent,
                                },
                              }}
                            />
                          </WrapMarkdown>
                        </>
                      )}
                    </DescriptionHeader>
                    <Cart>
                      <Products
                        products={products}
                        textcolor={textColor}
                        backgroundColor={bgColor}
                      />
                      <CartSummary textcolor={textColor} />
                    </Cart>
                  </motion.div>
                )}
              {/* </AnimatePresence> */}
            </Sticky>
          </ShopWrapper>
        )}
      </Wrapper>
    </>
  );
};

export const getStaticProps = async () => {
  const products = await client.fetch(eventQuery);
  const eventDescription = await client.fetch(eventDescriptionQuery);
  const colorSettings = await client.fetch(colorQuery);
  const newsletterText = await client.fetch(newsletterTextQuery);

  return {
    props: {
      products,
      eventDescription,
      colorSettings,
      newsletterText,
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
  background: ${(props) => props.backgroundColor || "var(--color-secondary"};

  @media (max-width: ${breakpoints.s}px) {
    flex-direction: column;
  }
`;

const DescriptionWrapper = styled(motion.div)`
  max-width: 200px;
  margin: 2rem;

  *,
  a {
    color: ${(props) => props.textcolor || "var(--color-primary"};
  }

  p {
    margin-top: 0rem;
    margin-bottom: 2rem;
  }
  a {
    /* display: inline-block; */
    /* padding: 0.25rem 0; */
  }
  @media (max-width: ${breakpoints.s}px) {
    max-width: 70vw;
    width: 250px;
    margin: 0rem auto;
    margin-bottom: 1rem;
  }
`;

const DescriptionHeader = styled.div`
  * {
    color: ${(props) => props.textcolor || "var(--color-primary"};
  }
  h2 {
    color: ${(props) => props.textcolor || "var(--color-primary"};
    text-decoration: underline;
    font-size: 16px;
    margin-bottom: 1rem;
  }
  p {
    color: ${(props) => props.textcolor || "var(--color-primary"};
    text-transform: lowercase;
    margin: 0;
  }
`;

const ShopWrapper = styled(motion.div)`
  position: sticky;
  top: 7.5vh;
  @media (max-width: ${breakpoints.s}px) {
    max-width: 70vw;
    width: 250px;
    margin: 0rem auto;
    margin-bottom: 1rem;
  }
`;

const Sticky = styled(motion.div)`
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

const WrapMarkdown = styled(motion.div)`
  /* margin: 2.5rem 0; */
  position: relative;
  max-width: 100%;
  

  .pdf-file {
    /* display: inline; */
    position: relative;
    padding: 0;
    margin-bottom: 2rem;
  }

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
  color: ${(props) => props.textcolor || "var(--color-primary"};
`;

const TicketLineWrapper = styled.div`
  display: flex;
  color: ${(props) => props.textcolor || "var(--color-primary"};
`;

const TicketTitleButton = styled.button`
  background: none;
  text-decoration: underline;
  padding: 0;
  padding-right: 0.5rem;
  color: ${(props) => props.textcolor || "var(--color-primary"};
  h2 {
    color: ${(props) => props.textcolor || "var(--color-primary"};
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
