import React from 'react';
import { Character, AbilityScoreTag, AbilityScores } from './App';

type Defense = 'PD' | 'AC' | 'MD';
type Ability = 'INT' | 'CHA' | 'WIZ';
type DamageType = 'Fire' | 'Frost' | 'Positive energy';

interface Dice {
  amount: number;
  size: number;
  modifier?: number | AbilityScoreTag;
}

interface Damage extends Dice {
  type: DamageType;
}

interface ToHit {
  ability: Ability;
  modifier?: AbilityScoreTag;
  defense: Defense;
}

interface Spell {
  id: number;
  level: number;
  name: string;
  hit: ToHit;
  damage: Damage[];
}

const spells: Spell[] = [
  {
    id: 0,
    level: 3,
    name: 'Fireball',
    hit: { ability: 'INT', defense: 'PD', modifier: 'INT' },
    damage: [{ amount: 10, size: 6, modifier: 'INT', type: 'Fire' }],
  },
  {
    id: 0,
    level: 1,
    name: 'Smite',
    hit: { ability: 'WIZ', defense: 'AC', modifier: 'WIS' },
    damage: [
      { amount: 2, size: 8, modifier: 'WIS', type: 'Positive energy' },
      { amount: 1, size: 4, modifier: 'WIS', type: 'Fire' },
    ],
  },
];

interface SpellbookPageProps {
  character: Character;
}

function SpellbookPage({ character }: SpellbookPageProps) {
  console.log(
    Object.values(character.abilityScores as AbilityScores).find(
      (value) => value.tag === spells[0].hit.modifier
    ).modifier
  );
  return (
    <section>
      <h1>Spellbook for</h1>
      <div>
        <div>{character.name}</div>
        <div>{character.id}</div>

        <table>
          <thead>
            <tr>
              <th>{character.abilityScores?.strength.tag}</th>
              <th>{character.abilityScores?.constitution.tag}</th>
              <th>{character.abilityScores?.dexterity.tag}</th>
              <th>{character.abilityScores?.intelligence.tag}</th>
              <th>{character.abilityScores?.wisdom.tag}</th>
              <th>{character.abilityScores?.charisma.tag}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {character.abilityScores?.strength.score} (
                {character.abilityScores?.strength.modifier})
              </td>
              <td>
                {character.abilityScores?.constitution.score} (
                {character.abilityScores?.constitution.modifier})
              </td>
              <td>
                {character.abilityScores?.dexterity.score} (
                {character.abilityScores?.dexterity.modifier})
              </td>
              <td>
                {character.abilityScores?.intelligence.score} (
                {character.abilityScores?.intelligence.modifier})
              </td>
              <td>
                {character.abilityScores?.wisdom.score} (
                {character.abilityScores?.wisdom.modifier})
              </td>
              <td>
                {character.abilityScores?.charisma.score} (
                {character.abilityScores?.charisma.modifier})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <input
        type="search"
        name=""
        id=""
        placeholder="Search for name, ability, defense, damage type..."
      />
      <table>
        <thead>
          <tr>
            <th>LVL</th>
            <th>Name</th>
            <th>Hit</th>
            <th>DMG</th>
          </tr>
        </thead>
        <tbody>
          {spells.map((s) => (
            <tr>
              <td>{s.level}</td>
              <td>{s.name}</td>
              <td>
                {s.hit.ability}{' '}
                {Object.values(character.abilityScores as AbilityScores).find(
                  (value) => value.tag === s.hit.modifier
                ).modifier >= 0
                  ? '+ '
                  : ''}
                {
                  Object.values(character.abilityScores as AbilityScores).find(
                    (value) => value.tag === s.hit.modifier
                  ).modifier
                }
                {' vs. '}
                {s.hit.defense}
              </td>
              <td>
                {s.damage.map((d) => (
                  <>
                    {d.amount}D{d.size}{' '}
                    {Object.values(
                      character.abilityScores as AbilityScores
                    ).find((value) => value.tag === d.modifier).modifier >= 0
                      ? '+ '
                      : ''}
                    {
                      Object.values(
                        character.abilityScores as AbilityScores
                      ).find((value) => value.tag === d.modifier).modifier
                    }{' '}
                    {d.type}
                    {', '}
                  </>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default SpellbookPage;
