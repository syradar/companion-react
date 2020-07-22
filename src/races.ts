import { AbilityScoreTag } from './abilityScores';

export interface Nameable {
  name: string;
}

export interface Describeable {
  description: string;
}

export interface FeatHaver {
  feats: Feat[];
}

export type FeatLevels = 'Adventurer' | 'Champion' | 'Epic';

export interface FeatLevel extends Describeable {
  featLevel: FeatLevels;
}

export interface Feat extends Nameable, Describeable {
  levels: FeatLevel[];
}

export interface RacialPower extends Nameable, Describeable, FeatHaver {}

export interface AbilityScoreBonus {
  tag: AbilityScoreTag;
  value: number;
}

export interface Race extends Nameable, FeatHaver {
  bonus: AbilityScoreBonus[];
  power: RacialPower[];
}

export const playerRaces: Race[] = [
  {
    name: 'Wood elf',
    bonus: [
      { tag: AbilityScoreTag.DEX, value: 2 },
      { tag: AbilityScoreTag.WIS, value: 2 },
    ],
    feats: [
      {
        name: 'Heritage of the Sword',
        description: '',
        levels: [
          {
            featLevel: 'Adventurer',
            description: `If you can already use swords that deal d6 and d8 damage without attack penalties, you gain a +2 damage bonus with them. (This bonus doesn’t increase miss damage.) Otherwise, if your class would ordinarily have an attack penalty with such swords, you can now use them without penalties.`,
          },
        ],
      },
    ],
    power: [
      {
        name: 'Elven Grace',
        description: `At the start of each of your turns, roll a die to see if you get an extra standard action. If your roll is equal to or lower than the escalation die, you get an extra standard action that turn.
        At the start of battle, you roll a d6. Each time you successfully gain an extra action, the size of the die you roll increases by one step on the following progression: (d4), d6, d8, d10, d12, d20. If you get an extra action after rolling a d20, you can’t get any more extra actions that battle.`,
        feats: [
          {
            name: '',
            description: '',
            levels: [
              {
                featLevel: 'Champion',
                description:
                  'Once per day, start a battle rolling a d4 for elven grace instead of a d6.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Human',
    bonus: [
      { tag: AbilityScoreTag.DEX, value: 2 },
      { tag: AbilityScoreTag.WIS, value: 2 },
    ],
    feats: [
      {
        name: 'Heritage of the Sword',
        description: '',
        levels: [
          {
            featLevel: 'Adventurer',
            description: `If you can already use swords that deal d6 and d8 damage without attack penalties, you gain a +2 damage bonus with them. (This bonus doesn’t increase miss damage.) Otherwise, if your class would ordinarily have an attack penalty with such swords, you can now use them without penalties.`,
          },
        ],
      },
    ],
    power: [
      {
        name: 'Elven Grace',
        description: `At the start of each of your turns, roll a die to see if you get an extra standard action. If your roll is equal to or lower than the escalation die, you get an extra standard action that turn.
        At the start of battle, you roll a d6. Each time you successfully gain an extra action, the size of the die you roll increases by one step on the following progression: (d4), d6, d8, d10, d12, d20. If you get an extra action after rolling a d20, you can’t get any more extra actions that battle.`,
        feats: [
          {
            name: '',
            description: '',
            levels: [
              {
                featLevel: 'Champion',
                description:
                  'Once per day, start a battle rolling a d4 for elven grace instead of a d6.',
              },
            ],
          },
        ],
      },
    ],
  },
];
