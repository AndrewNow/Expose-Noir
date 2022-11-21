const sanityClient = require("@sanity/client");
export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  dataset: "production",
  // dataset: "expose-noir",
  apiVersion: '2022-04-27',
  //   token: 'sanity-auth-token', // or leave commented out to be anonymous user
  useCdn: false, // `false` if you want to ensure fresh data
});
