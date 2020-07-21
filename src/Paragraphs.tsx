import React, { Fragment } from 'react';
import './App.css';

interface ParagraphsProps {
  paragraphs: string;
}

function Paragraphs({ paragraphs }: ParagraphsProps) {
  return (
    <Fragment>
      {paragraphs.split('\n').map((para) => (
        <p>{para}</p>
      ))}
    </Fragment>
  );
}

export default Paragraphs;
