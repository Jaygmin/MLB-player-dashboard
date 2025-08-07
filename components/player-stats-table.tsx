import { PlayerStatsTableProps } from "@/lib/types/player-stats-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { getTeamAbbreviation } from "@/constants/getTeamColor";

export function PlayerStatsTable({
  players,
  getTeamColor,
}: PlayerStatsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">선수명</TableHead>
            <TableHead>팀</TableHead>
            <TableHead>포지션</TableHead>
            <TableHead className="text-center">경기</TableHead>
            <TableHead className="text-center">타율</TableHead>
            <TableHead className="text-center">안타</TableHead>
            <TableHead className="text-center">득점</TableHead>
            <TableHead className="text-center">홈런</TableHead>
            <TableHead className="text-center">타점</TableHead>
            <TableHead className="text-center">도루</TableHead>
            <TableHead className="text-center">OPS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={index} className={index < 3 ? "bg-yellow-50" : ""}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {index < 3 && (
                    <Badge variant="secondary" className="text-xs">
                      {index + 1}위
                    </Badge>
                  )}
                  {player.name}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`${getTeamColor(player.team)} text-white`}>
                  {getTeamAbbreviation(player.team)}
                </Badge>
              </TableCell>
              <TableCell>{player.position}</TableCell>
              <TableCell className="text-center">
                {player.stats.games}
              </TableCell>
              <TableCell className="text-center font-mono">
                {player.stats.avg}
              </TableCell>
              <TableCell className="text-center">{player.stats.hits}</TableCell>
              <TableCell className="text-center text-blue-600 font-semibold">
                {player.stats.runs}
              </TableCell>
              <TableCell className="text-center font-bold text-orange-600">
                {player.stats.hr}
              </TableCell>
              <TableCell className="text-center font-bold text-green-600">
                {player.stats.rbi}
              </TableCell>
              <TableCell className="text-center font-bold text-purple-600">
                {player.stats.sb}
              </TableCell>
              <TableCell className="text-center font-mono font-bold">
                {player.stats.ops}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
