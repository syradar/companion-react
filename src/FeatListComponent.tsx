import React from 'react';
import './App.css';
import { Feat } from './models/races';
import FeatLevelComponent from './FeatLevelComponent';

interface FeatListProps {
  feats: Feat[];
}

function FeatListComponent({ feats }: FeatListProps) {
  return (
    <>
      {feats.map((feat, index) => (
        <div key={index}>
          <h4>{feat.name}</h4>
          <p>{feat.description}</p>

          {feat.levels.map((l, index) => (
            <FeatLevelComponent
              key={index}
              featLevel={l.featLevel}
              description={l.description}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export default FeatListComponent;
