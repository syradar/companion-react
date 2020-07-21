import React from 'react';
import './App.css';
import { displaySign } from './functions';

interface DisplayModifierComponentProps {
  value: number;
}

function DisplayModifierComponent({ value }: DisplayModifierComponentProps) {
  return (
    <>
      {displaySign(value)}
      {value}
    </>
  );
}

export default DisplayModifierComponent;
