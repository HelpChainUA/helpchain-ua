import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) },
    select: {
      willingToRelocate: true,
      housingAssistancePreference: true,
      jobSearchLocations: {
        select: { locationId: true },
      },
    },
  });

  return NextResponse.json({
    willingToRelocate: user?.willingToRelocate ?? null,
    housingAssistancePreference: user?.housingAssistancePreference ?? "",
    jobSearchLocationIds:
      user?.jobSearchLocations.map((item) => item.locationId) || [],
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    jobSearchLocationIds,
    willingToRelocate,
    housingAssistancePreference,
  } = await req.json();

  const userId = parseInt(session.user.id);

  await prisma.userJobLocation.deleteMany({ where: { userId } });

  if (Array.isArray(jobSearchLocationIds) && jobSearchLocationIds.length > 0) {
    await prisma.userJobLocation.createMany({
      data: jobSearchLocationIds.map((locationId: string) => ({
        userId,
        locationId,
      })),
    });
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      willingToRelocate: willingToRelocate === "yes",
      housingAssistancePreference,
      onboardingStep: 6,
    },
  });

  return NextResponse.json({ success: true });
}
