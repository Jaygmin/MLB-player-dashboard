import { ArrowUpDown, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Player } from "@/lib/types/player-interface";
import { sortOptions } from "@/constants/sortOptions";
import { getUniquePositions } from "@/lib/utils";

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedPosition: string;
  setSelectedPosition: (position: string) => void;
  sortBy: string;
  handleSort: (sortType: string) => void;
  players: Player[];
}

export function SearchFilters({
  searchTerm,
  setSearchTerm,
  selectedPosition,
  setSelectedPosition,
  sortBy,
  handleSort,
  players,
}: SearchFiltersProps) {
  const uniquePositions = getUniquePositions(players);

  return (
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
            포지션: {selectedPosition === "ALL" ? "전체" : selectedPosition}
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
          <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSort}>
            {sortOptions.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
