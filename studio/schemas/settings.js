export default {
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    {
      name: "mainImage",
      title: "Landing page image",
      description: "Leave blank / remove image for the 'XXX' animation",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "textColor",
      title: "Text color",
      description: "Please enter a hex value, e.g. #ffffff",
      type: "string",
    },
    {
      name: "backgroundColor",
      title: "backgroundColor",
      description: "Please enter a hex value, e.g. #ffffff",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "Settings",
    },
  },
};
