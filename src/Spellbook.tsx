import React from 'react';
import { Character, Defense, DamageType } from './App';
import { displaySign } from './functions';
import { AbilityScoreTag } from './abilityScores';

interface AbilityScoreModifier {
  tag: AbilityScoreTag;
}
interface FlatModifier {
  value: number;
}

type Modifier = FlatModifier | AbilityScoreModifier;

interface Dice {
  amount: number;
  size: number;
  modifier: Modifier;
}

interface Damage extends Dice {
  type: DamageType;
}

interface ToHit {
  ability: AbilityScoreTag;
  modifier: Modifier;
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
    hit: { ability: 'INT', defense: 'PD', modifier: { tag: 'INT' } },
    damage: [{ amount: 10, size: 6, modifier: { value: 0 }, type: 'Fire' }],
  },
  {
    id: 0,
    level: 1,
    name: 'Smite',
    hit: { ability: 'WIS', defense: 'AC', modifier: { tag: 'WIS' } },
    damage: [
      { amount: 2, size: 8, modifier: { tag: 'WIS' }, type: 'Positive energy' },
      { amount: 1, size: 4, modifier: { value: 12 }, type: 'Fire' },
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
              {character.abilityScores?.map((as) => (
                <th>{as.tag}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {character.abilityScores?.map((as) => (
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
          {spells.map((s) => (
            <tr>
              <td>{s.level}</td>
              <td>{s.name}</td>
              <td>
                {s.hit.ability}{' '}
                {displaySign(
                  character.abilityScores?.find(
                    (value) =>
                      value.tag === (s.hit.modifier as AbilityScoreModifier).tag
                  )?.modifier ?? 0
                )}
                {isFlatModifier(s.hit.modifier)
                  ? s.hit.modifier
                  : character.abilityScores?.find(
                      (value) =>
                        value.tag ===
                        (s.hit.modifier as AbilityScoreModifier).tag
                    )?.modifier}
                {' vs. '}
                {s.hit.defense}
              </td>
              <td>
                {s.damage.map((d) => (
                  <>
                    {d.amount}D{d.size}{' '}
                    {displaySign(
                      isFlatModifier(d.modifier)
                        ? (d.modifier as FlatModifier).value
                        : character.abilityScores?.find(
                            (value) =>
                              value.tag ===
                              (d.modifier as AbilityScoreModifier).tag
                          )?.modifier ?? 0
                    )}{' '}
                    {isFlatModifier(d.modifier)
                      ? (d.modifier as FlatModifier).value
                      : character.abilityScores?.find(
                          (value) =>
                            value.tag ===
                            (d.modifier as AbilityScoreModifier).tag
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
