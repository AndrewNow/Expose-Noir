import groq from "groq";

export const eventQuery = groq`
*[_type=="event"] | order(_createdAt asc) {
    name,
    soldOut,
    forSale,
    price,
    currency,
    "id": _id,
  }`;
