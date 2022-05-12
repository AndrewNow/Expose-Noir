import groq from "groq";

export const videoQuery = groq`
  *[_type == "videoEmbed"] {
    url,
  }
`;
