// const getPathToRevalidate = (body) => {
//   switch (body._type) {
//     case "eventDescription":
//       return `/tickets`;
//     case "event":
//       return `/tickets`;
//     case "pastBookings":
//       return `/past`;
//     case "paymentSuccess":
//       return `/result`;
//     case "videoEmbed":
//       return `/xxx`;
//     default:
//       return null;
//   }
// };

// export async function handler(request, response) {
//   const Authorization = request.headers.authorization || "";
//   const token = Authorization.replace(/bearer/i, "").trim();

//   if (request.method !== "POST") {
//     return response.status(405).send("Method Not Allowed");
//   }

//   if (token !== process.env.NEXT_SANITY_WEBHOOK_SECRET) {
//     return response.status(401).send("Invalid token");
//   }

//   try {
//     const path = getPathToRevalidate(request.body);

//     if (path) {
//       await response.unstable_revalidate(path);
//     }

//     return response.status(204).send("No Content");
//   } catch (error) {
//     console.error(error);
//     return response.status(500).send("Internal Server Error");
//   }
// }

// // switch (body._type) {
// //   case "post": {
// //     return `/` + body.slug.current;
// //   }
// //   // Your other cases for other types here
// //   default:
// //     return null;
// // }
