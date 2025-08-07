import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Player } from "@/lib/types/player-interface";
import { getMaxStat } from "@/lib/utils";
import { getTeamColor, getTeamAbbreviation } from "@/constants/getTeamColor";
import { Badge } from "./ui/badge";

interface StatsCardProps {
  title: string;
  statKey: keyof Player["stats"];
  players: Player[];
  color: string;
  defaultValue?: string | number;
}

export function StatsCard({
  title,
  statKey,
  players,
  color,
  defaultValue = 0,
}: StatsCardProps) {
  const { value, playerName, player } = getMaxStat(
    players,
    statKey,
    defaultValue
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-muted-foreground">{playerName}</p>
          {player && (
            <Badge
              className={`${getTeamColor(player.team)} text-white text-xs`}
            >
              {getTeamAbbreviation(player.team)}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
