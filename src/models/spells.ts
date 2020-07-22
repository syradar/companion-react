import { Nameable, FeatHaver, FeatLevel, Describeable } from './races';
import { Dice, ToHit } from '../Spellbook';
import { DamageType, Defense } from '../App';
import { AbilityScoreTag } from './abilityScores';

export type RangeTypes = 'Close-quarters spell' | 'Ranged' | 'Melee';

export type SpellType = 'At-Will' | 'Encounter' | 'Daily';

export type CharacterPropType = 'Level';

export interface DiceDamageEffect {
  dice: Dice;
  type: DamageType;
}

export interface LevelDamageEffect {
  type: DamageType;
  prop: CharacterPropType;
}

export type SpellEffect = string | DiceDamageEffect | LevelDamageEffect;

export interface SpellLevel {
  level: number;
  effect: SpellEffect;
}

export type Attack = 'Automatic hit' | ToHit;

export interface Spell extends Nameable {
  range: RangeTypes;
  type: SpellType;
  target: string;
  attack?: Attack;
  effect: SpellLevel[];
  miss?: SpellEffect;
  feats: FeatLevel[];
}

const spells: Spell[] = [
  {
    name: 'Magic Missile',
    range: 'Ranged',
    type: 'At-Will',
    target: 'One nearby or far away enemy',
    attack: 'Automatic hit',
    effect: [
      {
        level: 1,
        effect: {
          type: DamageType.Force,
          dice: { amount: 2, size: 4, modifier: { value: 0 } },
        },
      },
    ],
    feats: [
      {
        featLevel: 'Adventurer',
        description: 'adad',
      },
    ],
  },
  {
    name: 'Ray of Frost',
    range: 'Ranged',
    type: 'At-Will',
    target: 'One nearby enemy',
    attack: {
      ability: AbilityScoreTag.INT,
      defense: Defense.PD,
      modifier: { value: 0 },
      addLevel: true,
    },
    miss: {
      type: DamageType.Cold,
      prop: 'Level',
    },
    effect: [
      {
        level: 1,
        effect: {
          type: DamageType.Cold,
          dice: { amount: 3, size: 6, modifier: { value: 0 } },
        },
      },
      {
        level: 3,
        effect: {
          type: DamageType.Cold,
          dice: { amount: 4, size: 8, modifier: { value: 0 } },
        },
      },
    ],
    feats: [
      {
        featLevel: 'Adventurer',
        description: 'adad',
      },
    ],
  },
  {
    name: 'Shield',
    range: 'Ranged',
    type: 'At-Will',
    target: 'One nearby enemy',
    attack: {
      ability: AbilityScoreTag.INT,
      defense: Defense.PD,
      modifier: { value: 0 },
      addLevel: true,
    },
    miss: {
      type: DamageType.Cold,
      prop: 'Level',
    },
    effect: [
      {
        level: 1,
        effect: {
          type: DamageType.Cold,
          dice: { amount: 3, size: 6, modifier: { value: 0 } },
        },
      },
      {
        level: 3,
        effect: {
          type: DamageType.Cold,
          dice: { amount: 4, size: 8, modifier: { value: 0 } },
        },
      },
    ],
    feats: [
      {
        featLevel: 'Adventurer',
        description: 'adad',
      },
    ],
  },
];
