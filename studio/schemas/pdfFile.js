import React from "react";

const Preview = ({ value }) => {

  if (!value.fileText) {
    return <div style={{color: "darkred"}}>⚠ Please add hyperlink text here</div>
  }
  return (
    <p>
      {value.fileText}
    </p>
  );
};

export default {
  name: "pdfFile",
  type: "object",
  title: "PDF Embed",
  fields: [
    {
      name: "file",
      type: "file",
      title: "Upload PDF file here",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "fileText",
      type: "string",
      title: "Write associated text",
      description: "This field is for the text within the hyperlink.",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      fileText: "fileText",
    },
    component: Preview,
  },
};
