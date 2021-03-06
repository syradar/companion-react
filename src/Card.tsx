import React from 'react';
import './App.css';
import { CombatParticipant } from './App';

interface CardProps {
  character: CombatParticipant;
  onCharacterDelete: (id: number) => void;
}

function Card({ character, onCharacterDelete }: CardProps) {
  return (
    <div className="card">
      <h1>{character.name}</h1>
      <h2>{character.initiative}</h2>
      <button onClick={() => onCharacterDelete(character.id)}>Remove</button>
    </div>
  );
}

export default Card;
