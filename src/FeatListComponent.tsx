import React, { Fragment } from 'react';
import './App.css';
import { Feat } from './models/races';
import FeatLevelComponent from './FeatLevelComponent';
import Heading from './components/heading';

interface FeatListProps {
  feats: Feat[];
}

function FeatListComponent({ feats }: FeatListProps) {
  return (
    <Fragment>
      {feats.map((feat, index) => (
        <div key={index}>
          <Heading lvl={4}>{feat.name}</Heading>
          <p className="prose">{feat.description}</p>

          {feat.levels.map((l, index) => (
            <FeatLevelComponent
              key={index}
              featLevel={l.featLevel}
              description={l.description}
            />
          ))}
        </div>
      ))}
    </Fragment>
  );
}

export default FeatListComponent;
