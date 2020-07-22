import React, { Fragment } from 'react';
import './App.css';

interface SeparatedListProps<T> {
  separator: string;
  values: T[] | T;
  display: (value: T) => JSX.Element;
}

function SeparatedList<T>({
  separator,
  values,
  display,
}: SeparatedListProps<T>) {
  if (values == null) return null;

  return (
    <Fragment>
      {Array.isArray(values) ? (
        values.map((value, index) => (
          <Fragment key={index}>
            {index > 0 && separator}
            {display(value)}
          </Fragment>
        ))
      ) : (
        <Fragment>{display(values)}</Fragment>
      )}
    </Fragment>
  );
}

export default SeparatedList;
