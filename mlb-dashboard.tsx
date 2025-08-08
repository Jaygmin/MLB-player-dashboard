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
    loading,
    error,
    handleSort,
    handleRefresh,
  } = usePlayers();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Header onRefresh={handleRefresh} loading={loading} />
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

          {isClient && (
            <SearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedPosition={selectedPosition}
              setSelectedPosition={setSelectedPosition}
              sortBy={sortBy}
              handleSort={handleSort}
              players={players}
            />
          )}
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-muted-foreground">
                선수 데이터를 불러오는 중...
              </span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    데이터 로드 실패
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleRefresh}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      다시 시도
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && isClient && (
            <div className="overflow-x-auto">
              <PlayerStatsTable
                players={filteredPlayers}
                sortBy={sortBy}
                getTeamColor={getTeamColor}
              />
            </div>
          )}
        </CardContent>
      </Card>
      {!loading && !error && isClient && (
        <StatsGrid players={filteredPlayers} />
      )}
    </div>
  );
}
