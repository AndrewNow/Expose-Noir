import groq from "groq";

export const eventQuery = groq`
*[_type=="event"] | order(price) {
    name,
    soldOut,
    price,
    currency,
    "id": _id,
  }`;
