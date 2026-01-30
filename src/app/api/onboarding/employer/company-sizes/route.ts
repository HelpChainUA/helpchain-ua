import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const sizes = await prisma.companySize.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      sizes: sizes.map((size) => ({
        label: size.name,
        value: size.id,
      })),
    });
  } catch (error) {
    console.error("Error fetching company sizes:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
