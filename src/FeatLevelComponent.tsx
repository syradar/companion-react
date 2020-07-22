import React from 'react';
import './App.css';
import { FeatLevel } from './models/races';

function FeatLevelComponent({ featLevel, description }: FeatLevel) {
  return (
    <div>
      <strong>{featLevel} Feat:</strong> {description}
    </div>
  );
}

export default FeatLevelComponent;
