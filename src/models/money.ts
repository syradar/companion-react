export enum Denomination {
  CP = 'Copper pieces',
  SP = 'Silver pieces',
  GP = 'Gold pieces',
  PP = 'Platinum pieces',
}

export interface Money {
  amount: number;
  denomination: Denomination;
}

export const silverToCopper = (amount: number) => amount * 10;
export const goldToCopper = (amount: number) => amount * 100;
export const platinumToCopper = (amount: number) => amount * 1000;

export interface CoinPurse {
  cp?: number;
  sp?: number;
  gp?: number;
  pp?: number;
}

export const coinPurse = ({ gp, sp, cp, pp }: CoinPurse): CoinPurse => {
  return { gp: gp ?? 0, sp: sp ?? 0, cp: cp ?? 0, pp: pp ?? 0 };
};
