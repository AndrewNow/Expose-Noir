import MailchimpSubscribe from "react-mailchimp-subscribe";
import NewsletterForm from "./newsletterForm";

const MailchimpFormContainer = ({ successMessage }) => {
  const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
  // component structure taken from here https://dev.to/gedalyakrycer/create-an-email-list-with-react-mailchimp-965
  return (
    <MailchimpSubscribe
      url={MAILCHIMP_URL}
      render={({ subscribe, status, message }) => {
        return (
          <NewsletterForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
            successMessage={successMessage}
          />
        );
      }}
    />
  );
};

export default MailchimpFormContainer;
