import groq from "groq";

export const paymentSuccessTextQuery = groq`
*[_type=="paymentSuccess"]{
    title,
    description,
  }`;
