export default {
  name: "videoEmbed",
  type: "document",
  title: "Video Embed",
  fields: [
    {
      name: "url",
      type: "url",
      title: "Video URL",
      description:
        "To be uploaded from your S3 bucket, here: https://s3.console.aws.amazon.com/s3/buckets/exposenoir?region=ca-central-1&tab=objects",
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
