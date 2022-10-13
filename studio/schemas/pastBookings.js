export default {
  name: "pastBookings",
  title: "Past Bookings",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Series name",
      description: "i.e.: Exposé Noir or Volume X",
      type: "string",
    },
    {
      name: "djList",
      title: "DJ List",
      description: "Enter the list of previous artists here.",
      type: "array",
      of: [
        {
          type: "object",
          name: "dj info",
          fields: [
            { type: "string", title: "Artist name", name: "djName" },
            {
              type: "string",
              title: "Booking information",
              name: "bookingInfo",
              description: "Formatting template: Month Year, City",
            },
          ],
          preview: {
            select: {
              title: "djName",
              subtitle: "bookingInfo",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
