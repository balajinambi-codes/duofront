export function getLevelFromXp(
  xp: number
) {
  if (xp >= 1000) return 5;

  if (xp >= 500) return 4;

  if (xp >= 250) return 3;

  if (xp >= 100) return 2;

  return 1;
}

export function getXpForNextLevel(
  level: number
) {
  switch (level) {
    case 1:
      return 100;

    case 2:
      return 250;

    case 3:
      return 500;

    case 4:
      return 1000;

    default:
      return 1000;
  }
}

export function getCurrentLevelXp(
  level: number
) {
  switch (level) {
    case 1:
      return 0;

    case 2:
      return 100;

    case 3:
      return 250;

    case 4:
      return 500;

    default:
      return 1000;
  }
}