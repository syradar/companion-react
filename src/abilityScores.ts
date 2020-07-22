export enum AbilityScoreTag {
  CHA = 'Charisma',
  CON = 'Constitution',
  DEX = 'Dexterity',
  INT = 'Intelligence',
  STR = 'Strength',
  WIS = 'Wisdom',
}

export const createAbilityScore = (tag: AbilityScoreTag, score: number) => {
  return {
    name: tag,
    tag,
    score,
    modifier: abilityModifier(score),
  };
};

export interface AbilityScore {
  tag: AbilityScoreTag;
  score: number;
  modifier: number;
}

export const abilityModifier = (score: number): number =>
  Math.floor((score - 10) / 2);
