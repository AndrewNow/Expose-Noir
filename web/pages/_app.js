import "../styles/globals.css";
import { Layout } from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps}></Component>
      </Layout>
  );
}

export default MyApp;
