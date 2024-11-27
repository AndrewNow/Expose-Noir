export default {
  name: "newsletterText",
  title: "Newsletter Text",
  type: "document",
  fields: [
    {
      name: "text",
      title: "Newsletter text",
      description:
        "For a line break/new paragraph, make sure you hit enter twice. If you just hit enter once, the markdown file won't know to make a new line.",
      type: "blockContent",
    },
    {
      name: "successMessage",
      title: "Success message",
      description:
        "Customize the message that is shown after a user successfully signs up to your newsletter.",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "text",
    },
  },
};
