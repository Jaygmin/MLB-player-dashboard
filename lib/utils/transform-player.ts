import { MlbApiTypes } from "../types/mlb-api";
import { Player } from "../types/player-interface";

export async function transformPlayer(item: MlbApiTypes): Promise<Player> {
  const id = item.player.id;
  const fullName = item.player.fullName;
  const stats = item.stat;

  let teamName = "Unknown";
  let teamId = null;
  let position = "미정";
  let role: "투수" | "야수" = "야수";

  try {
    const detailRes = await fetch(
      `https://statsapi.mlb.com/api/v1/people/${id}`
    );
    const detailData = await detailRes.json();
    const detail = detailData.people?.[0];

    teamId =
      detail?.currentTeam?.id || item.player.currentTeam?.id || item.team?.id;
    teamName =
      detail?.currentTeam?.name ||
      item.player.currentTeam?.name ||
      item.team?.name ||
      "Unknown";
    position = detail?.primaryPosition?.abbreviation || "미정";
    role = detail?.primaryPosition?.type === "Pitcher" ? "투수" : "야수";
  } catch (error) {
    console.error(`❌ 선수 정보 조회 실패: ${fullName}`, error);
  }

  return {
    name: fullName,
    team: teamName,
    teamId,
    position,
    role,
    stats: {
      games: stats.gamesPlayed ?? 0,
      avg: stats.avg ?? "0.000",
      hits: stats.hits ?? 0,
      runs: stats.runs ?? 0,
      hr: stats.homeRuns ?? 0,
      rbi: stats.rbi ?? 0,
      sb: stats.stolenBases ?? 0,
      ops: stats.ops ?? "0.000",
    },
  };
}
