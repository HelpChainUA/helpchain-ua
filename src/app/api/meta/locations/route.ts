import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const locations = await prisma.location.findMany({
    orderBy: [{ country: "asc" }, { city: "asc" }],
  });

  const options = locations.map((location) => ({
    label: `${location.city}, ${location.country}`,
    value: location.id,
  }));

  return NextResponse.json({ options });
}
