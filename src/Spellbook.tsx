import React from 'react';

type Defense = 'PD' | 'AC' | 'MD';
type Ability = 'INT' | 'CHA' | 'WIZ';
type DamageType = 'Fire' | 'Frost' | 'Positive energy';

interface Dice {
  amount: number;
  size: number;
  modifier?: number;
}

interface Damage extends Dice {
  type: DamageType;
}

interface ToHit {
  ability: Ability;
  modifier?: number;
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
    hit: { ability: 'INT', defense: 'PD', modifier: 0 },
    damage: [{ amount: 10, size: 6, modifier: 0, type: 'Fire' }],
  },
  {
    id: 0,
    level: 1,
    name: 'Smite',
    hit: { ability: 'WIZ', defense: 'AC', modifier: 2 },
    damage: [
      { amount: 2, size: 8, modifier: 2, type: 'Positive energy' },
      { amount: 1, size: 4, modifier: 2, type: 'Fire' },
    ],
  },
];

function SpellbookPage() {
  return (
    <section>
      <h1>Spellbook</h1>
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
                {s.hit.ability} {s.hit.modifier ? '+ ' + s.hit.modifier : ''}{' '}
                {s.hit.defense}
              </td>
              <td>
                {s.damage.map((d) => (
                  <>
                    {d.amount}D{d.size}
                    {d.modifier ? '+ ' + d.modifier : ''} {d.type}
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
