import styled from "styled-components";
import { client } from "../lib/sanity/client";
import { newsletterTextQuery } from "../lib/sanity/newsletterTextQuery";
import { motion } from "framer-motion";
import MailchimpFormContainer from "../components/Mailchimp/mailchimpFormContainer";
import { PortableText } from "@portabletext/react";
import SanityImageComponent from "../utils/sanityImageComponent";
import { colorQuery } from "../lib/sanity/settingsQuery";

const Spam = ({ newsletterText, colorSettings }) => {
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
    <PageWrapper textcolor={textColor}>
      <WrapMarkdown>
        <PortableText
          value={newsletterText.text}
          components={{
            types: {
              image: SanityImageComponent,
            },
          }}
        />
        <NewsletterWrapper>
          <MailchimpFormContainer
            successMessage={
              newsletterText.successMessage && newsletterText.successMessage
            }
          />
        </NewsletterWrapper>
      </WrapMarkdown>
    </PageWrapper>
  );
};

export default Spam;

export const getStaticProps = async () => {
  const newsletterText = await client.fetch(newsletterTextQuery);
  const colorSettings = await client.fetch(colorQuery);
  return {
    props: {
      newsletterText,
      colorSettings,
    },
    revalidate: 10,
  };
};

const PageWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  max-width: 400px;
  margin: 2rem auto;
  height: 90vh;
  display: grid;
  place-items: center;
  /* justify-content: center; */
  /* align-items: center; */
  color: ${(props) => props.textcolor || "var(--color-primary"};
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
