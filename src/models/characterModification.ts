export interface ModifyCharacterStep {
  name: string;
}

export const defaultModifyCharacterSteps: ModifyCharacterStep[] = [
  {
    name: 'Choose race',
  },
  {
    name: 'Choose class',
  },
];
