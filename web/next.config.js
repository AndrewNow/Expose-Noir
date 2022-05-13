module.exports = {
  reactStrictMode: true,
  env: {
    // weatherAPIKey: "0894ed2a391f2bd4f6163738de1a4954",
  },
  plugins: [
    [
      "babel-plugin-styled-components",
      {
        ssr: true,
      },
    ],
  ],
  images: {
    domains: ["cdn.sanity.io"],
  },
};
