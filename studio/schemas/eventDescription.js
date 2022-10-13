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
      name: "sentence1",
      title: "Sentence 1",
      type: "string",
    },
    {
      name: "sentence2",
      title: "Sentence 2",
      type: "string",
    },
    {
      name: "description",
      title: "Description / Lineup",
      description:
        "For a line break/new paragraph, make sure you hit enter twice. If you just hit enter once, the markdown file won't know to make a new line.",
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
      description: "Write location tba if tba",
      type: "text",
    },
    {
      name: "image",
      title: "Poster",
      type: "image",
    },
  ],
};
