import groq from "groq";

export const eventQuery = groq`
*[_type=="event"]{
    name,
    price,
    description,
    launchAt, 
    endAt,
    location,
    "id": _id,
    "image": image.asset->url,
    currency
  }`;
