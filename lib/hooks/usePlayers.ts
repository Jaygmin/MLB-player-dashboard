import { useState, useEffect } from "react";
import { Player } from "../types/player-interface";
import { mockPlayers } from "../../constants/mock/mockPlayer";
import { filterPlayers, sortPlayers } from "../utils";

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>(mockPlayers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("ops");
  const [selectedPosition, setSelectedPosition] = useState("ALL");
  const [isClient, setIsClient] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // 클라이언트에서만 실행되도록 설정
  useEffect(() => {
    setIsClient(true);
    setLastUpdated(new Date().toISOString());
  }, []);

  const filteredPlayers = filterPlayers(players, searchTerm, selectedPosition);

  // 정렬 처리
  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    const sortedPlayers = sortPlayers(players, sortType);
    setPlayers(sortedPlayers);
  };

  const handleRefresh = () => {
    setLastUpdated(new Date().toISOString());
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
    handleSort,
    handleRefresh,
  };
}
