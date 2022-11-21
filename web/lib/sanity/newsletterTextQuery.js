import groq from "groq";

export const newsletterTextQuery = groq`
*[_type=="newsletterText"][0]{
    text,
    successMessage
  }`;
