import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const jobOptions = await prisma.jobOption.findMany({
    select: { id: true, slug: true, label: true },
    orderBy: { label: "asc" },
  });

  return NextResponse.json(jobOptions);
}
