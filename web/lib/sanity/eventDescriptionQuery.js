import groq from "groq";

export const eventDescriptionQuery = groq`
*[_type=="eventDescription"]{
    name,
    description,
    launchAt, 
    endAt,
    location,
    "id": _id,
    "image": image.asset->url,
  }`;
