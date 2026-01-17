import { BacklogItem, Confidence, Effort, Impact, RankedItem } from '../types';

export const impactValues: Record<Impact, number> = {
  Low: 1,
  Medium: 3,
  High: 5,
};

export const confidenceValues: Record<Confidence, number> = {
  Low: 0.5,
  Medium: 0.75,
  High: 1,
};

export const effortValues: Record<Effort, number> = {
  S: 1,
  M: 3,
  L: 5,
  XL: 8,
};

export const capacityFromTeam = (teamSize: number): number => Math.round(teamSize * 1.5);

export const computeScore = (item: BacklogItem): number => {
  const impact = impactValues[item.impact];
  const confidence = confidenceValues[item.confidence];
  const effort = effortValues[item.effort];
  return Number(((impact * confidence) / effort).toFixed(2));
};

export const rankBacklog = (
  items: BacklogItem[],
  teamSize: number
): {
  capacityPoints: number;
  ranked: RankedItem[];
  ship: RankedItem[];
  cut: RankedItem[];
} => {
  const capacityPoints = capacityFromTeam(teamSize);

  const ranked = items
    .filter((item) => item.item.trim())
    .map((item) => {
      const score = computeScore(item);
      return { ...item, score, effortPoints: effortValues[item.effort], decision: 'CUT' as const };
    })
    .sort((a, b) => b.score - a.score);

  let used = 0;
  const ship: RankedItem[] = [];
  const cut: RankedItem[] = [];

  ranked.forEach((item) => {
    if (used + item.effortPoints <= capacityPoints) {
      ship.push({ ...item, decision: 'SHIP' });
      used += item.effortPoints;
    } else {
      cut.push({ ...item, decision: 'CUT' });
    }
  });

  return { capacityPoints, ranked: [...ship, ...cut], ship, cut };
};
