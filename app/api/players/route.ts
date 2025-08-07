import { Player } from "@/lib/types/player-interface";
import { transformPlayer } from "@/lib/utils/transform-player";
import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic"; // 항상 새로고침

export const revalidate = 3600; // 1시간마다 캐시 갱신

export async function GET() {
  try {
    const res = await fetch(
      "https://statsapi.mlb.com/api/v1/stats?stats=season&group=hitting&season=2025&limit=100"
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "기본 선수 데이터 요청 실패" },
        { status: 500 }
      );
    }

    const data = await res.json();
    const splits = data.stats?.[0]?.splits ?? [];

    const players: Player[] = await Promise.all(splits.map(transformPlayer));

    return NextResponse.json(players);
  } catch (error) {
    console.error("❌ 전체 요청 실패:", error);
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
}
