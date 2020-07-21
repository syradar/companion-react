import React, { Fragment } from 'react';
import './App.css';

interface SeparatedListProps<T> {
  separator: string;
  values: T[];
  display: (value: T) => JSX.Element;
}

function SeparatedList<T>({
  separator,
  values,
  display,
}: SeparatedListProps<T>) {
  return (
    <Fragment>
      {values.map((value, index) => (
        <Fragment key={index}>
          {index > 0 && separator}
          {display(value)}
        </Fragment>
      ))}
    </Fragment>
  );
}

export default SeparatedList;
