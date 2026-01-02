export type Impact = 'Low' | 'Medium' | 'High';
export type Effort = 'S' | 'M' | 'L' | 'XL';
export type Confidence = 'Low' | 'Medium' | 'High';

export type Decision = 'SHIP' | 'CUT';

export interface BacklogItem {
  id: string;
  item: string;
  impact: Impact;
  effort: Effort;
  confidence: Confidence;
}

export interface RankedItem extends BacklogItem {
  score: number;
  effortPoints: number;
  decision: Decision;
}

export interface ContextState {
  goal: string;
  timeHorizon: string;
  teamSize: number;
}
