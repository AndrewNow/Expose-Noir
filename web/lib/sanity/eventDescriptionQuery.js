import groq from "groq";

export const eventDescriptionQuery = groq`
*[_type=="eventDescription"]{
    name,
    sentence1,
    sentence2,
    description[] {
      ...,
      _type == "pdfFile" => {
        "file": file.asset->url,
      },
      _type == "image" => {
        "image": asset->url,
      },
    },
    launchAt, 
    endAt,
    location,
    additionalInfo,
    "id": _id,
    "image": image.asset->url,
  }`;
