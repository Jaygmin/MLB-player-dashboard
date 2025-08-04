"use client";

import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { PlayerStatsTable } from "./components/player-stats-table";
import { SearchFilters } from "./components/search-filters";
import { StatsGrid } from "./components/stats-grid";
import { getTeamColor } from "./constants/getTeamColor";
import { formatDate } from "./lib/utils";
import { usePlayers } from "./lib/hooks/usePlayers";

export default function Component() {
  const {
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
  } = usePlayers();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Header onRefresh={handleRefresh} />
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-xl">2025 시즌 주요 선수 기록</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="hidden sm:inline">2025 시즌 기록</span>
              {isClient && lastUpdated && (
                <span>
                  <span className="hidden sm:inline">•</span> 마지막 업데이트:{" "}
                  {formatDate(lastUpdated, isClient)}
                </span>
              )}
            </div>
          </div>

          <SearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedPosition={selectedPosition}
            setSelectedPosition={setSelectedPosition}
            sortBy={sortBy}
            handleSort={handleSort}
            players={players}
          />
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
      <StatsGrid players={filteredPlayers} />
    </div>
  );
}
