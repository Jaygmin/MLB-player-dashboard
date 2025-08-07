export const getTeamAbbreviation = (teamName: string): string => {
  const teamMappings: { [key: string]: string } = {
    "New York Yankees": "NYY",
    "Boston Red Sox": "BOS",
    "Toronto Blue Jays": "TOR",
    "Baltimore Orioles": "BAL",
    "Tampa Bay Rays": "TB",
    "Cleveland Guardians": "CLE",
    "Detroit Tigers": "DET",
    "Kansas City Royals": "KC",
    "Minnesota Twins": "MIN",
    "Chicago White Sox": "CWS",
    "Houston Astros": "HOU",
    "Texas Rangers": "TEX",
    "Los Angeles Angels": "LAA",
    "Oakland Athletics": "OAK",
    "Seattle Mariners": "SEA",

    "Los Angeles Dodgers": "LAD",
    "San Francisco Giants": "SF",
    "San Diego Padres": "SD",
    "Arizona Diamondbacks": "ARI",
    "Colorado Rockies": "COL",
    "Atlanta Braves": "ATL",
    "Miami Marlins": "MIA",
    "New York Mets": "NYM",
    "Philadelphia Phillies": "PHI",
    "Washington Nationals": "WSH",
    "Chicago Cubs": "CHC",
    "Milwaukee Brewers": "MIL",
    "St. Louis Cardinals": "STL",
    "Cincinnati Reds": "CIN",
    "Pittsburgh Pirates": "PIT",
  };

  return teamMappings[teamName] || teamName;
};

export const getTeamColor = (team: string) => {
  // 팀 이름이 전체 이름인 경우 약어로 변환
  const teamAbbr = getTeamAbbreviation(team);

  const colors: { [key: string]: string } = {
    LAD: "bg-blue-500",
    NYY: "bg-slate-700",
    ATL: "bg-red-500",
    TEX: "bg-blue-600",
    HOU: "bg-orange-500",
    SD: "bg-yellow-600",
    TOR: "bg-blue-400",
    PHI: "bg-red-600",
    SF: "bg-orange-600",
    LAA: "bg-red-700",
    SEA: "bg-teal-600",
    TB: "bg-blue-300",
    BOS: "bg-red-800",
    CWS: "bg-black",
    MIN: "bg-blue-800",
    DET: "bg-orange-700",
    CLE: "bg-red-900",
    KC: "bg-blue-900",
    OAK: "bg-green-600",
    MIL: "bg-yellow-500",
    STL: "bg-red-700",
    CHC: "bg-blue-700",
    CIN: "bg-red-600",
    PIT: "bg-yellow-400",
    ARI: "bg-red-500",
    COL: "bg-purple-600",
    WSH: "bg-red-600",
    NYM: "bg-blue-600",
    MIA: "bg-teal-500",
    BAL: "bg-orange-600",
  };
  return colors[teamAbbr] || "bg-gray-500";
};
