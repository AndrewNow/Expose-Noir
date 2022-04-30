import styled, { keyframes } from "styled-components";
import { breakpoints } from "./utils/breakpoints";

export const Layout = (props) => {
  return <Main>{props.children}</Main>;
};

const blink = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;

const Main = styled.main`
  margin: 0 auto;
  * {
    font-family: monospace;
    font-size: 13px;
  }

  a,
  button {
    color: black;
    :hover {
      animation: ${blink} 0.35s linear infinite alternate-reverse;
    }
  }

  button {
    border: none;
    cursor: pointer;
  }
  h1 {
    /* font-size: 80px; */
  }
  h2 {
    /* font-size: 72px; */
  }
  h3 {
    /* font-size: 48px; */
  }
  h4 {
    /* font-size: 36px; */
  }
  h5 {
    /* font-size: 18px; */
  }
  h6 {
    /* font-size: 18px; */
  }
  p,
  input,
  label {
    /* font-size: 24px; */
    /* line-height: 140%; */
  }
  small {
    /* font-size: 18px; */

    p {
      /* font-size: inherit; */
      a {
        :hover {
          /* color: var(--color-clay); */
        }
      }
    }
  }
`;
