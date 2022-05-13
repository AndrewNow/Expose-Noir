export default {
  name: "paymentSuccess",
  title: "Payment Success Text",
  type: "document",
  fields: [
    {
      name: "title",
      title: "CMS Section Title",
      type: "string",
      description:
        "Set this to whatever, it doesn't appear on the page. You can ignore this.",
      initialValue: "Payment Success Details",
      options: {
        hidden: true,
      },
    },
    {
      name: "description",
      title: "Payment success description",
      description:
        "For a line break/new paragraph, make sure you hit enter twice. If you just hit enter once, the markdown file won't know to make a new line.",
      type: "blockContent",
    },
  ],
};
