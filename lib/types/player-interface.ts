export interface Player {
  name: string;
  team: string;
  teamId: number | null;
  position: string;
  role: "투수" | "야수";
  stats: {
    games: number;
    avg: string;
    hits: number;
    runs: number;
    hr: number;
    rbi: number;
    sb: number;
    ops: string;
  };
}
