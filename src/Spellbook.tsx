import React from 'react';
import { Character, Defense, DamageType } from './App';
import { displaySign } from './functions';
import { AbilityScoreTag } from './models/abilityScores';

export interface AbilityScoreModifier {
  tag: AbilityScoreTag;
}
export interface FlatModifier {
  value: number;
}

export type Modifier = FlatModifier | AbilityScoreModifier;

export interface Dice {
  amount: number;
  size: number;
  modifier: Modifier;
}

export interface Damage extends Dice {
  type: DamageType;
}

export interface ToHit {
  ability: AbilityScoreTag;
  modifier: Modifier;
  defense: Defense;
  addLevel: boolean;
}

interface testspell {
  id: number;
  level: number;
  name: string;
  hit: ToHit;
  damage: Damage[];
}

const spells: testspell[] = [
  {
    id: 0,
    level: 3,
    name: 'Fireball',
    hit: {
      ability: AbilityScoreTag.INT,
      defense: Defense.PD,
      modifier: { tag: AbilityScoreTag.INT },
      addLevel: false,
    },
    damage: [
      { amount: 10, size: 6, modifier: { value: 0 }, type: DamageType.Fire },
    ],
  },
  {
    id: 0,
    level: 1,
    name: 'Smite',
    hit: {
      ability: AbilityScoreTag.WIS,
      defense: Defense.AC,
      modifier: { tag: AbilityScoreTag.WIS },
      addLevel: false,
    },
    damage: [
      {
        amount: 2,
        size: 8,
        modifier: { tag: AbilityScoreTag.WIS },
        type: DamageType.Positive,
      },
      { amount: 1, size: 4, modifier: { value: 12 }, type: DamageType.Fire },
    ],
  },
];

interface SpellbookPageProps {
  character: Character;
}

const isFlatModifier = (m: Modifier): m is FlatModifier =>
  (m as FlatModifier).value !== undefined;

function SpellbookPage({ character }: SpellbookPageProps) {
  return (
    <section>
      <h1>Spellbook for</h1>
      <div>
        <div>{character.name}</div>
        <div>{character.id}</div>

        <table>
          <thead>
            <tr>
              {character.abilityScores?.map(as => (
                <th>{as.tag}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {character.abilityScores?.map(as => (
                <td>
                  {as.score}({displaySign(as.modifier) + as.modifier})
                </td>
              ))}
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
          {spells.map(s => (
            <tr>
              <td>{s.level}</td>
              <td>{s.name}</td>
              <td>
                {s.hit.ability}{' '}
                {displaySign(
                  character.abilityScores?.find(
                    value =>
                      value.tag ===
                      (s.hit.modifier as AbilityScoreModifier).tag,
                  )?.modifier ?? 0,
                )}
                {isFlatModifier(s.hit.modifier)
                  ? s.hit.modifier
                  : character.abilityScores?.find(
                      value =>
                        value.tag ===
                        (s.hit.modifier as AbilityScoreModifier).tag,
                    )?.modifier}
                {' vs. '}
                {s.hit.defense}
              </td>
              <td>
                {s.damage.map(d => (
                  <>
                    {d.amount}D{d.size}{' '}
                    {displaySign(
                      isFlatModifier(d.modifier)
                        ? (d.modifier as FlatModifier).value
                        : character.abilityScores?.find(
                            value =>
                              value.tag ===
                              (d.modifier as AbilityScoreModifier).tag,
                          )?.modifier ?? 0,
                    )}{' '}
                    {isFlatModifier(d.modifier)
                      ? (d.modifier as FlatModifier).value
                      : character.abilityScores?.find(
                          value =>
                            value.tag ===
                            (d.modifier as AbilityScoreModifier).tag,
                        )?.modifier}{' '}
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
