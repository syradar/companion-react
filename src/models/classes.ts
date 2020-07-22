import { Nameable, AbilityScoreBonus } from './races';
import { AbilityScoreTag } from './abilityScores';
import { coinPurse, CoinPurse } from './money';
import { rollD6 } from '../utils/dice';

export interface PlayerClass extends Nameable {
  bonus: AbilityScoreBonus[];
  backgroundsExample: string;
  money: {
    static: {
      name: string;
      get: () => CoinPurse;
    };
    random: {
      name: string;
      get: () => CoinPurse;
    };
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
      static: {
        name: '25 gp',
        get: () => coinPurse({ gp: 25 }),
      },
      random: {
        name: '1d6 x 10 gp',
        get: () => coinPurse({ gp: rollD6() * 10 }),
      },
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
      static: {
        name: '25 gp',
        get: () => coinPurse({ gp: 25 }),
      },
      random: {
        name: '1d6 x 10 gp',
        get: () => coinPurse({ gp: rollD6() * 10 }),
      },
    },
  },
];
