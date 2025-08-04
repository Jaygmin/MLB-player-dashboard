import { Player } from "@/lib/types/player-interface";
import { StatsCard } from "./stats-card";

interface StatsGridProps {
  players: Player[];
}

export function StatsGrid({ players }: StatsGridProps) {
  const statsConfig = [
    {
      title: "최고 타율",
      statKey: "avg" as keyof Player["stats"],
      color: "text-green-600",
      defaultValue: "0.000",
    },
    {
      title: "최다 홈런",
      statKey: "hr" as keyof Player["stats"],
      color: "text-orange-600",
      defaultValue: 0,
    },
    {
      title: "최다 타점",
      statKey: "rbi" as keyof Player["stats"],
      color: "text-blue-600",
      defaultValue: 0,
    },
    {
      title: "최고 OPS",
      statKey: "ops" as keyof Player["stats"],
      color: "text-purple-600",
      defaultValue: "0.000",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statsConfig.map((config) => (
        <StatsCard
          key={config.title}
          title={config.title}
          statKey={config.statKey}
          players={players}
          color={config.color}
          defaultValue={config.defaultValue}
        />
      ))}
    </div>
  );
}
