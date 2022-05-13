// import urlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";

const SanityImageComponent = ({ value }) => {
  const { width, height } = getImageDimensions(value);
  return (
    <Image
      src={value.image}
      alt={value.alt || " "}
      loading="lazy"
      style={{
        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
      width={width}
      height={height}
    />
  );
};

export default SanityImageComponent;
