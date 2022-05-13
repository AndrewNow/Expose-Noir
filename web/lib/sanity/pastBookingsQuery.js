import groq from "groq";

export const pastBookingsQuery = groq`
*[_type=="pastBookings"] | order(name){
    name,
    djList
  }`;
