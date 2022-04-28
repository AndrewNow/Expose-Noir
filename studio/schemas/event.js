export default {
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      description: "Add cents as zeroes, ie 500 = $5",
      type: "number",
    },
    {
      name: "description",
      title: "Description / Lineup",
      type: "blockContent",
    },
    {
      name: "launchAt",
      title: "Event date, Start time",
      type: "datetime",
      options: {
        timeStep: 15,
      },
    },
    {
      name: "endAt",
      title: "End time",
      type: "datetime",
      options: {
        timeStep: 15,
      },
    },
    {
      name: "location",
      title: "Location",
      description: "Write TBD if TBD",
      type: "text",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
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
};
