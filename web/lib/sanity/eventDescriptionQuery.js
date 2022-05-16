import groq from "groq";

export const eventDescriptionQuery = groq`
*[_type=="eventDescription"]{
    name,
    sentence1,
    sentence2,
    description[] {
      ...,
      _type == "image" => {
        "image": asset->url,
      },
    },
    launchAt, 
    endAt,
    location,
    "id": _id,
    "image": image.asset->url,
  }`;
