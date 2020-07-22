/** @jsx jsx */
import { jsx } from '@emotion/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from 'twin.macro';
import { Fragment } from 'react';

interface ParagraphsProps {
  paragraphs: string;
}

function Paragraphs({ paragraphs }: ParagraphsProps) {
  return (
    <Fragment>
      {paragraphs.split('\n').map((para, index) => (
        <p key={index}>{para}</p>
      ))}
    </Fragment>
  );
}

export default Paragraphs;
