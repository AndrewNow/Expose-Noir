// import urlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
import { DownloadPoster } from "../pages/tickets";
import urlFor from "../lib/sanity/urlFor";

const SanityImageComponent = ({ value }) => {
  const { width, height } = getImageDimensions(value);
  return (
    <DownloadPoster
      href={urlFor(value?.image)}
      aria-label="download poster"
      target="_blank"
      download={`${value.alt}_poster`}
    >
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
    </DownloadPoster>
  );
};

export default SanityImageComponent;
