"use client";

import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { useState, useEffect } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Player } from "./lib/types/player-interface";
import { mockPlayers } from "./constants/mock/mockPlayer";
import { sortOptions } from "./constants/sortOptions";
import { PlayerStatsTable } from "./components/player-stats-table";
import { getTeamColor } from "./constants/getTeamColor";

export default function Component() {
  const [players, setPlayers] = useState<Player[]>(mockPlayers);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("ops");
  const [selectedPosition, setSelectedPosition] = useState("ALL");
  const [isClient, setIsClient] = useState(false);

  // 클라이언트에서만 실행되도록 설정
  useEffect(() => {
    setIsClient(true);
    setLastUpdated(new Date().toISOString());
  }, []);

  const uniquePositions = Array.from(
    new Set(players.filter((p) => p.role === "야수").map((p) => p.position))
  );

  const filteredPlayers = players
    .filter((p) => p.role === "야수")
    .filter(
      (p) => selectedPosition === "ALL" || p.position === selectedPosition
    )
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    const sortedPlayers = [...players].sort((a, b) => {
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
    setPlayers(sortedPlayers);
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    if (!isClient) return "";
    try {
      return new Date(dateString).toLocaleString("ko-KR");
    } catch {
      return "";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Header />
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-xl">2025 시즌 주요 선수 기록</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>2025 시즌 기록</span>
              {isClient && lastUpdated && (
                <span>• 마지막 업데이트: {formatDate(lastUpdated)}</span>
              )}
            </div>
          </div>

          {/* 검색 및 필터 */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="선수명 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                >
                  포지션:{" "}
                  {selectedPosition === "ALL" ? "전체" : selectedPosition}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup
                  value={selectedPosition}
                  onValueChange={setSelectedPosition}
                >
                  <DropdownMenuRadioItem value="ALL">
                    전체 포지션
                  </DropdownMenuRadioItem>
                  {uniquePositions.map((position) => (
                    <DropdownMenuRadioItem key={position} value={position}>
                      {position}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  정렬: {sortOptions.find((opt) => opt.value === sortBy)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuRadioGroup
                  value={sortBy}
                  onValueChange={handleSort}
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <PlayerStatsTable
              players={filteredPlayers}
              sortBy={sortBy}
              getTeamColor={getTeamColor}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
