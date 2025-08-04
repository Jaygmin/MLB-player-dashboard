import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Player } from "@/lib/types/player-interface";
import { getMaxStat } from "@/lib/utils";

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
  const { value, playerName } = getMaxStat(players, statKey, defaultValue);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <p className="text-sm text-muted-foreground">{playerName}</p>
      </CardContent>
    </Card>
  );
}
