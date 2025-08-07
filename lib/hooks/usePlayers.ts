import { useState, useEffect } from "react";
import { Player } from "../types/player-interface";
import { filterPlayers, sortPlayers } from "../utils";

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("ops");
  const [selectedPosition, setSelectedPosition] = useState("ALL");
  const [isClient, setIsClient] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 선수 데이터 가져오기
  const fetchPlayers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/players");
      if (!response.ok) {
        throw new Error("선수 데이터를 가져오는데 실패했습니다.");
      }

      const data = await response.json();
      setPlayers(data);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      console.error("선수 데이터 요청 실패:", err);
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  // 클라이언트에서만 실행되도록 설정
  useEffect(() => {
    setIsClient(true);
    fetchPlayers();
  }, []);

  const filteredPlayers = filterPlayers(players, searchTerm, selectedPosition);

  // 정렬 처리
  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    const sortedPlayers = sortPlayers(players, sortType);
    setPlayers(sortedPlayers);
  };

  const handleRefresh = () => {
    fetchPlayers();
    console.log("최신 기록 조회 완료:", new Date().toLocaleString("ko-KR"));
  };

  return {
    players,
    filteredPlayers,
    searchTerm,
    setSearchTerm,
    sortBy,
    selectedPosition,
    setSelectedPosition,
    isClient,
    lastUpdated,
    loading,
    error,
    handleSort,
    handleRefresh,
  };
}
