import { Player } from "./player-interface";

export interface PlayerStatsTableProps {
  players: Player[];
  sortBy: string;
  getTeamColor: (team: string) => string;
}
