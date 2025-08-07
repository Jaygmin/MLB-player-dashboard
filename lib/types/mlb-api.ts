export interface MlbApiTypes {
  player: {
    id: number;
    fullName: string;
    currentTeam?: {
      id: number;
      name: string;
    };
  };
  team?: {
    id: number;
    name: string;
  };
  stat: {
    gamesPlayed?: number;
    avg?: string;
    hits?: number;
    runs?: number;
    homeRuns?: number;
    rbi?: number;
    stolenBases?: number;
    ops?: string;
  };
}
