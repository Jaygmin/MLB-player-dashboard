import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Player } from "./types/player-interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 선수 필터링 함수
export const filterPlayers = (
  players: Player[],
  searchTerm: string,
  selectedPosition: string
): Player[] => {
  return players
    .filter((p) => p.role === "야수")
    .filter(
      (p) => selectedPosition === "ALL" || p.position === selectedPosition
    )
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
};

// 선수 정렬 함수
export const sortPlayers = (players: Player[], sortType: string): Player[] => {
  return [...players].sort((a, b) => {
    if (sortType === "name") {
      return a.name.localeCompare(b.name);
    }
    const aValue = Number.parseFloat(
      a.stats[sortType as keyof Player["stats"]] as string
    );
    const bValue = Number.parseFloat(
      b.stats[sortType as keyof Player["stats"]] as string
    );
    return bValue - aValue;
  });
};

// 통계 최대값 계산 함수
export const getMaxStat = (
  players: Player[],
  statKey: keyof Player["stats"],
  defaultValue: string | number = 0
): { value: string | number; playerName: string; player?: Player } => {
  if (players.length === 0) {
    return { value: defaultValue, playerName: "데이터 없음" };
  }

  const maxValue = Math.max(
    ...players.map((p) => {
      const stat = p.stats[statKey];
      return typeof stat === "string" ? Number.parseFloat(stat) : stat;
    })
  );

  const maxPlayer = players.find((p) => {
    const stat = p.stats[statKey];
    const value = typeof stat === "string" ? Number.parseFloat(stat) : stat;
    return value === maxValue;
  });

  return {
    value: typeof defaultValue === "string" ? maxValue.toFixed(3) : maxValue,
    playerName: maxPlayer?.name || "데이터 없음",
    player: maxPlayer,
  };
};

// 날짜 포맷팅 함수
export const formatDate = (dateString: string, isClient: boolean): string => {
  if (!isClient) return "";
  try {
    return new Date(dateString).toLocaleString("ko-KR");
  } catch {
    return "";
  }
};

// 고유 포지션 목록 가져오기
export const getUniquePositions = (players: Player[]): string[] => {
  return Array.from(
    new Set(players.filter((p) => p.role === "야수").map((p) => p.position))
  );
};
