import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const workTypes = await prisma.workType.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      workTypes: workTypes.map((type) => ({
        label: type.displayName,
        value: type.id,
      })),
    });
  } catch (error) {
    console.error("Error fetching work types:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
