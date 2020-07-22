interface DiceRoll {
  amount: number;
  size: number;
}

export const rollD = (sides: number) => Math.floor(Math.random() * sides) + 1;

export const rollD6 = () => rollD(6);
export const rollD8 = () => rollD(8);
export const rollD10 = () => rollD(10);
export const rollD12 = () => rollD(12);
export const rollD20 = () => rollD(20);
