import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EmploymentTypePreference, OpportunityType } from "@/generated/prisma";

// GET: return profession data
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) },
    select: {
      targetJobs: { select: { jobOptionId: true } },
      opportunities: { select: { type: true } },
      employmentTypes: { select: { type: true } },
    },
  });

  return NextResponse.json({
    targetJobs: user?.targetJobs.map((item) => item.jobOptionId) || [],
    opportunities: user?.opportunities.map((item) => item.type) || [],
    employmentTypes: user?.employmentTypes.map((item) => item.type) || [],
  });
}

// POST: save profession data
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { targetJobs, opportunities, employmentTypes } = await req.json();

  const userId = parseInt(session.user.id);

  await prisma.userJobOption.deleteMany({ where: { userId } });
  await prisma.userOpportunity.deleteMany({ where: { userId } });
  await prisma.userEmploymentType.deleteMany({ where: { userId } });

  if (Array.isArray(targetJobs) && targetJobs.length > 0) {
    const uniqueTargetJobs = Array.from(
      new Set(targetJobs.filter((jobOptionId: string) => !!jobOptionId)),
    );
    await prisma.userJobOption.createMany({
      data: uniqueTargetJobs.map((jobOptionId: string) => ({
        userId,
        jobOptionId,
      })),
    });
  }

  if (Array.isArray(opportunities) && opportunities.length > 0) {
    const opportunityValues = Object.values(OpportunityType);
    const validOpportunities = opportunities.filter(
      (type: string): type is OpportunityType =>
        opportunityValues.includes(type as OpportunityType),
    );
    await prisma.userOpportunity.createMany({
      data: validOpportunities.map((type) => ({
        userId,
        type,
      })),
    });
  }

  if (Array.isArray(employmentTypes) && employmentTypes.length > 0) {
    const employmentTypeValues = Object.values(EmploymentTypePreference);
    const validEmploymentTypes = employmentTypes.filter(
      (type: string): type is EmploymentTypePreference =>
        employmentTypeValues.includes(type as EmploymentTypePreference),
    );
    await prisma.userEmploymentType.createMany({
      data: validEmploymentTypes.map((type) => ({
        userId,
        type,
      })),
    });
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      onboardingStep: 7,
    },
  });

  return NextResponse.json({ success: true });
}
