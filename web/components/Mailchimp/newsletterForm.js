import { useState } from "react";
import { decode } from "html-entities";
import styled from "styled-components";

const NewsletterForm = ({ status, message, onValidated, successMessage }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);

  /**
   * Handle form submit.
   * @return {{value}|*|boolean|null}
   */
  const handleFormSubmit = () => {
    setError(null);
    if (!email) {
      setError("Please enter a valid email address");
      return null;
    }
    const isFormValidated = onValidated({ EMAIL: email });
    // On success return true
    return email && email.indexOf("@") > -1 && isFormValidated;
  };

  /**
   * Handle Input Key Event.
   * @param event
   */
  const handleInputKeyEvent = (event) => {
    setError(null);
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleFormSubmit();
    }
  };

  /**
   * Extract message from string.
   * @param {String} message
   * @return {null|*}
   */
  const getMessage = (message) => {
    if (!message) {
      return null;
    }
    const result = message?.split("-") ?? null;
    if ("0" !== result?.[0]?.trim()) {
      return decode(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? decode(formattedMessage) : null;
  };

  return (
    <>
      <Flex>
        <Input
          // pass in the value the user has entered (their email)
          onChange={(event) => setEmail(event?.target?.value ?? "")}
          type="email"
          placeholder="insert email..."
          // in case user hits Enter instead of submit
          onKeyUp={(event) => handleInputKeyEvent(event)}
        />
        <SubmitButton onClick={handleFormSubmit}>submit</SubmitButton>
      </Flex>
      <MessageWrapper>
        {status === "sending" && <div>Sending...</div>}
        {status === "error" || error ? (
          <Error
            dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}
          />
        ) : null}
        {status === "success" && status !== "error" && !error && (
          <Success
            // check if successMessage exists within Sanity
            // if not, just decode the default success message
            dangerouslySetInnerHTML={{
              __html: successMessage ? successMessage : decode(message),
            }}
          />
        )}
      </MessageWrapper>
    </>
  );
};

export default NewsletterForm;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  /* border: 1px dotted grey; */
  border-bottom: 1px dotted grey;
  ::placeholder {
    font-style: italic;
    padding-bottom: 0.5rem;
  }
`;

const SubmitButton = styled.button`
  /* margin: 0 1rem; */
  color: grey !important;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  background: none;
  cursor: pointer;
  text-align: left;

  text-decoration: underline;
`;

const Error = styled.div`
  color: red;
  margin: 0.5rem 0;
`;

const Success = styled.div`
  color: green;
  margin: 0.5rem 0;
`;

const MessageWrapper = styled.div`
  margin: 0.5rem 0;
`;
