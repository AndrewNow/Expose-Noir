import groq from "groq";

export const settingsQuery = groq`
*[_type=="settings"]{
    "imageUrl": mainImage.asset->url,
      "lqip": mainImage.asset->metadata.lqip,
    textColor,
    backgroundColor
  }`;

export const colorQuery = groq`
*[_type=="settings"]{
    textColor,
    backgroundColor
  }`;
