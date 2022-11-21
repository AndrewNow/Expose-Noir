import "../styles/globals.css";
import { Layout } from "../components/layout";
import { client } from "../lib/sanity/client";
import { colorQuery } from "../lib/sanity/settingsQuery";

function MyApp({ Component, pageProps }) {
  // First check to see if there is a background color in the CMS
  // If so, assign it to bgColor
  // Else use CSS variable
  let bgColor;
  if (pageProps.colorSettings && pageProps.colorSettings[0]?.backgroundColor) {
    bgColor = pageProps.colorSettings[0].backgroundColor;
  } else {
    bgColor = "var(--color-secondary)";
  }

  // Then assign to <html>'s background property
  if (pageProps.colorSettings) {
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("background", bgColor);
    }
  }

  return (
    <Layout colorSettings={pageProps.colorSettings}>
      <Component {...pageProps}></Component>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const colorSettings = await client.fetch(colorQuery);
  return {
    props: {
      colorSettings,
    },
    revalidate: 10,
  };
};

export default MyApp;
