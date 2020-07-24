import { Nameable, AbilityScoreBonus } from './races';
import { AbilityScoreTag } from './abilityScores';
import { coinPurse, CoinPurse } from './money';
import { rollD6, StaticDice } from '../utils/dice';
import { TableRow, TableCell } from '../components/table';
import { compose, head, identity, map, pluck, tap } from 'rambda';

export enum ArmorType {
  None = 'None',
  Light = 'Light',
  Heavy = 'Heavy',
  Shield = 'Shield',
}

export const armorTableRow = <ArmorType>(
  type: ArmorType,
  baseAc: number,
  attackPenalty: number,
) => ({
  type: {
    name: 'Armor Type',
    value: type,
  },
  baseAc: {
    name: 'Base AC',
    value: baseAc,
  },
  attackPenalty: {
    name: 'Attack Penalty',
    value: attackPenalty,
  },
});

export type ArmorTable = {
  [T in ArmorType]: {
    type: {
      name: string;
      value: T;
    };
    baseAc: {
      name: string;
      value: number;
    };
    attackPenalty: {
      name: string;
      value: number;
    };
  };
};

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
  armorTable: ArmorTable;
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
      None: armorTableRow(ArmorType.None, 10, 0),
      Light: armorTableRow(ArmorType.Light, 12, 0),
      Heavy: armorTableRow(ArmorType.Heavy, 13, -2),
      Shield: armorTableRow(ArmorType.Shield, 1, 0),
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
      None: armorTableRow(ArmorType.None, 10, 0),
      Light: armorTableRow(ArmorType.Light, 12, 0),
      Heavy: armorTableRow(ArmorType.Heavy, 16, 0),
      Shield: armorTableRow(ArmorType.Shield, 1, 0),
    },
    meleeWeapons: [],
    rangedWeapons: [],
  },
];

export const armorTableToTable = (armorTable: ArmorTable): TableRow[] => {
  const headerRows = compose(
    (cells: TableCell[]) => ({
      isHeader: true,
      cells,
    }),
    map(({ name }) => ({
      value: name,
      alignRight: name !== 'Armor Type',
    })),
    Object.values,
    v => head(v),
    Object.values,
  );

  const bodyRows = compose(
    map((cells: TableCell[]) => ({
      isHeader: false,
      cells,
    })),
    map(
      compose(
        map(({ name, value }) => ({
          value,
          alignRight: name !== 'Armor Type',
        })),
        Object.values,
      ),
    ),
    Object.values,
  );

  return [headerRows(armorTable), ...bodyRows(armorTable)];
};
