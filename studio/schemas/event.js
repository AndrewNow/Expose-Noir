export default {
  name: "event",
  title: "Event Ticketing",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      title: "Sold out?",
      description: "When green, tickets will not be available to purchase.",
      name: "soldOut",
      type: "boolean",
    },
    {
      name: "price",
      title: "Price",
      description:
        "Add cents as zeroes, ie 500 = $5. Releases are organized by price, so lower prices will take preceding order over releases with higher prices in the page hierarchy.",
      type: "number",
    },
    {
      name: "currency",
      title: "Currency",
      description:
        "Keep this as 'cad'. This piece of data is for Stripe, changing this value may cause breaking changes.",
      type: "string",
      initialValue: "cad",
      options: {
        hidden: true,
      },
    },
  ],
  initialValue: {
    currency: "cad",
  },
  orderings: [
    {
      title: "Release Order",
      name: "releaseOrder",
      by: [{ field: "price", direction: "asc" }],
    },
  ],
};
