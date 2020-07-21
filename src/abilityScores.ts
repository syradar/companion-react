export type AbilityScoreName =
  | 'Charisma'
  | 'Constitution'
  | 'Dexterity'
  | 'Intelligence'
  | 'Strength'
  | 'Wisdom';

export type AbilityScoreTag = 'CHA' | 'CON' | 'DEX' | 'INT' | 'STR' | 'WIS';

export const abilityScoreNameFromTag = (
  tag: AbilityScoreTag
): AbilityScoreName => {
  switch (tag) {
    case 'CHA':
      return 'Charisma';
    case 'CON':
      return 'Constitution';
    case 'DEX':
      return 'Dexterity';
    case 'INT':
      return 'Intelligence';
    case 'STR':
      return 'Strength';
    case 'WIS':
      return 'Wisdom';
  }
};

export const createAbilityScore = (tag: AbilityScoreTag, score: number) => {
  return {
    name: abilityScoreNameFromTag(tag),
    tag,
    score,
    modifier: abilityModifier(score),
  };
};

export interface AbilityScore {
  name: AbilityScoreName;
  tag: AbilityScoreTag;
  score: number;
  modifier: number;
}

export const abilityModifier = (score: number): number =>
  Math.floor((score - 10) / 2);
