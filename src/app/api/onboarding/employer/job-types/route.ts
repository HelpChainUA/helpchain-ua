import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const jobTypes = await prisma.jobType.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      jobTypes: jobTypes.map((type) => ({
        label: type.displayName,
        value: type.name,
      })),
    });
  } catch (error) {
    console.error("Error fetching job types:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
