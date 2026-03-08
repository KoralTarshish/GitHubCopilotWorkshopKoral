import { NextRequest, NextResponse } from "next/server";
import { playerInfo } from "@/lib/player-info";

export async function GET() {
  try {
    // Early return for empty data - use 200 with empty array instead of 404
    // 404 should be reserved for missing resources, not empty collections
    if (!playerInfo?.length) {
      return NextResponse.json([]);
    }

    // Destructure only needed properties directly in map for better performance
    // Removed unnecessary intermediate variable
    return NextResponse.json(
      playerInfo.map(({ id, name, team, weight, height, position }) => ({
        id,
        name,
        team,
        weight,
        height,
        position
      }))
    );
  } catch (error) {
    console.error('Error fetching player info:', error);
    return NextResponse.json(
      { error: "Failed to fetch player information" },
      { status: 500 }
    );
  }
}
