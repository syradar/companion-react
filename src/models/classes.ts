import { Nameable, AbilityScoreBonus, playerRaces } from './races';
import { AbilityScoreTag } from './abilityScores';
import { coinPurse, CoinPurse } from './money';
import { rollD6, StaticDice, createStaticDice } from '../utils/dice';
import { TableRow, TableCell } from '../components/table';
import {
  compose,
  head,
  identity,
  map,
  pluck,
  tap,
  groupBy,
  reduce,
  uniq,
  join,
  prop,
  filter,
  ifElse,
  isEmpty,
} from 'rambda';
import { matchPath } from 'react-router-dom';

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
  LightOrSimple = 'Light or simple',
  HeavyOrMartial = 'Heavy or martial',
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

export type WeaponCategory = MeleeWeaponCategories | RangedWeaponCategories;

export interface ClassWeapon {
  type: WeaponTypes;
  name: string;
  damage: StaticDice;
  attackModifier?: number;
  category: WeaponCategory;
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
  meleeWeapons: ClassWeapon[];
  rangedWeapons: ClassWeapon[];
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
    meleeWeapons: [
      {
        category: MeleeWeaponCategories.OneHanded,
        type: WeaponTypes.Small,
        damage: createStaticDice(1, 4),
        name: 'Dagger',
      },
      {
        category: MeleeWeaponCategories.TwoHanded,
        type: WeaponTypes.Small,
        damage: createStaticDice(1, 6),
        name: 'Club',
      },
      {
        category: MeleeWeaponCategories.OneHanded,
        type: WeaponTypes.LightOrSimple,
        damage: createStaticDice(1, 6),
        name: 'Hand-axe',
      },
      {
        category: MeleeWeaponCategories.OneHanded,
        type: WeaponTypes.LightOrSimple,
        damage: createStaticDice(1, 6),
        name: 'Warclub',
      },
      {
        category: MeleeWeaponCategories.TwoHanded,
        type: WeaponTypes.LightOrSimple,
        damage: createStaticDice(1, 8),
        name: 'Spear',
      },
      {
        category: MeleeWeaponCategories.OneHanded,
        type: WeaponTypes.HeavyOrMartial,
        damage: createStaticDice(1, 8),
        name: 'Longsword',
      },
      {
        category: MeleeWeaponCategories.OneHanded,
        type: WeaponTypes.HeavyOrMartial,
        damage: createStaticDice(1, 8),
        name: 'Battleaxe',
      },
      {
        category: MeleeWeaponCategories.TwoHanded,
        type: WeaponTypes.HeavyOrMartial,
        damage: createStaticDice(1, 10),
        name: 'Greatsword',
      },
      {
        category: MeleeWeaponCategories.TwoHanded,
        type: WeaponTypes.HeavyOrMartial,
        damage: createStaticDice(1, 10),
        name: 'Greataxe',
      },
    ],
    rangedWeapons: [
      {
        category: RangedWeaponCategories.Thrown,
        type: WeaponTypes.Small,
        damage: createStaticDice(1, 4),
        name: 'Dagger',
      },
      {
        category: RangedWeaponCategories.Crossbow,
        type: WeaponTypes.Small,
        damage: createStaticDice(1, 4),
        name: 'Hand crossbow',
        attackModifier: -5,
      },
      {
        category: RangedWeaponCategories.Thrown,
        type: WeaponTypes.LightOrSimple,
        damage: createStaticDice(1, 6),
        name: 'Javelin',
      },
      {
        category: RangedWeaponCategories.Thrown,
        type: WeaponTypes.LightOrSimple,
        damage: createStaticDice(1, 6),
        name: 'Axe',
      },
      {
        category: RangedWeaponCategories.Thrown,
        type: WeaponTypes.LightOrSimple,
        damage: createStaticDice(1, 6),
        name: 'Spear',
      },
      {
        category: RangedWeaponCategories.Crossbow,
        type: WeaponTypes.LightOrSimple,
        damage: createStaticDice(1, 6),
        name: 'Light crossbow',
        attackModifier: -5,
      },
      {
        category: RangedWeaponCategories.Bow,
        type: WeaponTypes.LightOrSimple,
        damage: createStaticDice(1, 6),
        name: 'Shortbow',
      },
      {
        category: RangedWeaponCategories.Crossbow,
        type: WeaponTypes.HeavyOrMartial,
        damage: createStaticDice(1, 8),
        name: 'Heavy crossbow',
        attackModifier: -5,
      },
      {
        category: RangedWeaponCategories.Bow,
        type: WeaponTypes.HeavyOrMartial,
        damage: createStaticDice(1, 8),
        name: 'Longbow',
      },
    ],
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

export const weaponsToTable = (
  categories: MeleeWeaponCategories[] | RangedWeaponCategories[],
) => (weapons: ClassWeapon[]) => {
  const headerRows = compose(
    (cells: TableCell[]) => ({
      isHeader: true,
      cells: [
        {
          value: '',
        },
        ...cells,
      ],
    }),
    map(createCell),
    uniq,
    map(t => t.category),
    Object.values,
  );

  const typeCats = (cats: MeleeWeaponCategories[] | RangedWeaponCategories[]) =>
    compose(
      map((w: string) =>
        createRow([
          createCell(w),
          ...map(c =>
            compose(
              (ws: ClassWeapon[]) =>
                isEmpty(ws) ? createCell('—') : createWeaponCell(ws),
              filter((mw: ClassWeapon) => mw.category === c && mw.type === w),
            )(weapons),
          )(cats),
        ]),
      ),
    );

  return [
    headerRows(weapons),
    ...typeCats(categories)(Object.values(WeaponTypes)),
  ];
};

export const meleeWeaponsToTable = weaponsToTable(
  Object.values(MeleeWeaponCategories),
);
export const rangedWeaponsToTable = weaponsToTable(
  Object.values(RangedWeaponCategories),
);

const createCell = (value: string | number): TableCell => ({ value });

const createRow = (cells: TableCell[]): TableRow => ({
  isHeader: false,
  cells,
});

export const diceDisplay = (die: StaticDice): string =>
  `${die.amount}d${die.sides}`;

export const attackModifierDisplay = (attackModifier?: number): string =>
  attackModifier ? `(${attackModifier} atk)` : ``;

const die = compose(
  diceDisplay,
  prop('damage'),
  (w: ClassWeapon[]) => head<ClassWeapon>(w) as ClassWeapon,
);

const names = compose(
  join(', '),
  map(
    (w: ClassWeapon) => `${w.name}${attackModifierDisplay(w.attackModifier)}`,
  ),
);

const createWeaponCell = (weapons: ClassWeapon[]): TableCell =>
  createCell(`${die(weapons)} ${names(weapons)}`);
