export default {
  name: "eventDescription",
  title: "Event Description",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Event Title",
      type: "string",
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
        timeStep: 60,
        dateFormat: "MM-DD-YYYY",
      },
    },
    {
      name: "endAt",
      title: "End time",
      type: "datetime",
      options: {
        timeStep: 60,
        dateFormat: "MM-DD-YYYY",
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
  ],
};
