import { Nameable, AbilityScoreBonus } from './races';
import { AbilityScoreTag } from './abilityScores';
import { coinPurse, CoinPurse } from './money';
import { rollD6 } from '../utils/dice';

export interface PlayerClass extends Nameable {
  bonus: AbilityScoreBonus[];
  backgroundsExample: string;
  money: {
    static: () => CoinPurse;
    random: () => CoinPurse;
  };
}

export const classes: PlayerClass[] = [
  {
    name: 'Barbarian',
    bonus: [
      {
        tag: AbilityScoreTag.STR,
        value: 2,
      },
      {
        tag: AbilityScoreTag.CON,
        value: 2,
      },
    ],
    backgroundsExample:
      'Possible backgrounds include: clan champion, caravan outrider, fur trapper, mountain tribeswoman, wasteland survivalist, and gladiator.',
    money: {
      static: () => coinPurse({ gp: 25 }),
      random: () => coinPurse({ gp: rollD6() * 10 }),
    },
  },
  {
    name: 'Paladin',
    bonus: [
      {
        tag: AbilityScoreTag.STR,
        value: 2,
      },
      {
        tag: AbilityScoreTag.CHA,
        value: 2,
      },
    ],
    backgroundsExample:
      'Possible backgrounds include: city guardsman, combat medic, bodyguard, outlaw hunter, and inquisitor.',
    money: {
      static: () => coinPurse({ gp: 25 }),
      random: () => coinPurse({ gp: rollD6() * 10 }),
    },
  },
];
