import { Nameable, AbilityScoreBonus } from './races';
import { AbilityScoreTag } from './abilityScores';
import { coinPurse, CoinPurse } from './money';
import { rollD6, StaticDice } from '../utils/dice';

export enum ArmorType {
  None = 'None',
  Light = 'Light',
  Heavy = 'Heavy',
  Shield = 'Shield',
}

export enum WeaponTypes {
  Small = 'Small',
  LightOrSimple = 'LightOrSimple',
  HeavyOrMartial = 'HeavyOrMartial',
}

export enum MeleeWeaponCategories {
  OneHanded = 'One Handed',
  TwoHanded = 'Two Handed',
}

export enum RangedWeaponCategories {
  Thrown = 'Thrown',
  Crossbow = 'Crossbow',
  Bow = 'Bow',
}

export interface ClassWeapon {
  type: WeaponTypes;
  damage: StaticDice;
  attackModifier?: number;
}

export interface MeleeWeapon extends ClassWeapon {
  category: MeleeWeaponCategories;
}
export interface RangedWeapon extends ClassWeapon {
  category: RangedWeaponCategories;
}

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
  armorTable: {
    [T in ArmorType]: {
      name: T;
      baseAc: number;
      attackPenalty: number;
    };
  };
  meleeWeapons: MeleeWeapon[];
  rangedWeapons: RangedWeapon[];
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
    armorTable: {
      None: {
        name: ArmorType.None,
        baseAc: 10,
        attackPenalty: 0,
      },
      Light: {
        name: ArmorType.Light,
        baseAc: 12,
        attackPenalty: 0,
      },
      Heavy: {
        name: ArmorType.Heavy,
        baseAc: 13,
        attackPenalty: -2,
      },
      Shield: {
        name: ArmorType.Shield,
        baseAc: 1,
        attackPenalty: 0,
      },
    },
    meleeWeapons: [],
    rangedWeapons: [],
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
    armorTable: {
      None: {
        name: ArmorType.None,
        baseAc: 10,
        attackPenalty: 0,
      },
      Light: {
        name: ArmorType.Light,
        baseAc: 12,
        attackPenalty: 0,
      },
      Heavy: {
        name: ArmorType.Heavy,
        baseAc: 16,
        attackPenalty: 0,
      },
      Shield: {
        name: ArmorType.Shield,
        baseAc: 1,
        attackPenalty: 0,
      },
    },
    meleeWeapons: [],
    rangedWeapons: [],
  },
];
