import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { city: "asc" },
    });

    return NextResponse.json({
      locations: locations.map((location) => ({
        label: location.city,
        value: location.id,
      })),
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
