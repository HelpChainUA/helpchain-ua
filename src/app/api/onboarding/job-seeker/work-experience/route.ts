import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ExperienceRange } from "@/generated/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) },
    select: {
      workExperienceSummary: true,
      workExperiences: { select: { jobOptionId: true, yearsRange: true } },
    },
  });

  return NextResponse.json({
    summary: user?.workExperienceSummary || "",
    positions: user?.workExperiences || [],
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { positions, summary } = await req.json();
  const userId = parseInt(session.user.id);

  await prisma.userWorkExperience.deleteMany({ where: { userId } });

  if (Array.isArray(positions) && positions.length > 0) {
    const experienceRanges = Object.values(ExperienceRange);
    const validPositions = positions.filter(
      (item: { jobOptionId?: string; yearsRange?: string }) =>
        typeof item.jobOptionId === "string" &&
        experienceRanges.includes(item.yearsRange as ExperienceRange),
    );

    if (validPositions.length > 0) {
      const uniquePositions = Array.from(
        new Map(
          validPositions.map((item) => [item.jobOptionId, item]),
        ).values(),
      );
      await prisma.userWorkExperience.createMany({
        data: uniquePositions.map((item) => ({
          userId,
          jobOptionId: item.jobOptionId as string,
          yearsRange: item.yearsRange as ExperienceRange,
        })),
      });
    }
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      workExperienceSummary:
        typeof summary === "string" ? summary.slice(0, 500) : null,
      onboardingStep: 8,
    },
  });

  return NextResponse.json({ success: true });
}
