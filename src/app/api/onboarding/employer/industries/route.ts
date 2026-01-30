import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const industries = await prisma.industry.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      industries: industries.map((industry) => ({
        label: industry.name,
        value: industry.id,
      })),
    });
  } catch (error) {
    console.error("Error fetching industries:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
