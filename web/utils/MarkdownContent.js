import { PortableText } from '@portabletext/react'
import React from 'react'
import SanityImageComponent from './sanityImageComponent'

const MarkdownContent = ({ blocks }) => {
  const components = {
    types: {
      image: SanityImageComponent,
      pdfFile: ({ value }) => {
        console.log(value)
        const { file, fileText } = value;
        return <a
          className="pdf-file"
          href={`${file}?dl=`}
          target="_blank">
          {fileText}
        </a>;
      }
    }
  }

  return <PortableText value={blocks} components={components} />
}

export default MarkdownContent