import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { fetchGetJSON } from "../utils/apiHelpers";
import styled from "styled-components";
import { breakpoints } from "../components/breakpoints";
// import PrintObject from "../components/printObject";

const ResultPage = () => {
  const router = useRouter();

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation

  // SWR is expecting a route for a session ID that it then takes us to when the result is displayed. This means that if we make this file, we can use dynamic routes within the API to return the details of a given Stripe session.
  // see pages/api/checkout_sessions/[id].js

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (error) {
    console.log(error);
    return <div>failed to load</div>;
  }

  return (
    <Wrapper>
      {/* <h3>Status: {data?.payment_intent?.status ?? "loading..."}</h3> */}
      <h2>
        thank you {/* just take a user's first name */}
        {
          data?.payment_intent.charges.data[0].billing_details.name.split(
            " "
          )[0]
        }{" "}
        {" <3"}
      </h2>
      <p>
        a confirmation email will soon be sent your email at:{" "}
        {data?.payment_intent.charges.data[0].billing_details.email}
      </p>
      <p>
        please check your junk folder if not yet received - and we will email
        you your ticket(s) within 24 hours. event location will be sent to you
        one day before the event.
      </p>
      <p>
        kindly note that we do not allow pictures or videos at our events.
        please take care of one another, and immediately report any sign of
        harassment, abuse, or agression to our nearest staff member.
      </p>
      <Link href="/">
        <a>↽ Back home</a>
      </Link>
    </Wrapper>
  );
};

export default ResultPage;

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  height: 90vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  text-align: center;

  a {
    margin-top: 1rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    max-width: 85vw;
  }
`;
