import React from 'react';
import './App.css';
import { FeatLevel } from './races';

function FeatLevelComponent({ featLevel, description }: FeatLevel) {
  return (
    <div>
      <strong>{featLevel} Feat:</strong> {description}
    </div>
  );
}

export default FeatLevelComponent;
