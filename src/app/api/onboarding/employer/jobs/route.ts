import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        company: {
          include: {
            jobs: {
              include: {
                types: {
                  include: {
                    jobType: true,
                  },
                },
                workType: true,
              },
            },
          },
        },
      },
    });

    if (!user || !user.company) {
      return NextResponse.json({ jobs: [] });
    }

    const jobs = user.company.jobs.map((job) => ({
      title: job.title,
      types: job.types.map((t) => t.jobType.name),
      locationId: job.locationId || "",
      housingAssistance: job.housingAssistance,
      workTypeId: job.workTypeId || "",
    }));

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { jobs } = body;

    if (!jobs || !Array.isArray(jobs)) {
      return NextResponse.json(
        { message: "Invalid jobs data" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { company: true },
    });

    if (!user || !user.company) {
      return NextResponse.json(
        {
          message:
            "Company not found. Please complete company information first.",
        },
        { status: 404 },
      );
    }

    // Delete existing jobs and their relations
    await prisma.job.deleteMany({
      where: { companyId: user.company.id },
    });

    // Create new jobs with relations
    for (const jobData of jobs) {
      const job = await prisma.job.create({
        data: {
          companyId: user.company.id,
          title: jobData.title,
          locationId: jobData.locationId || null,
          housingAssistance: jobData.housingAssistance,
          workTypeId: jobData.workTypeId || null,
        },
      });

      // Create job type relations
      if (jobData.types && Array.isArray(jobData.types)) {
        for (const typeName of jobData.types) {
          const jobType = await prisma.jobType.findUnique({
            where: { name: typeName },
          });

          if (jobType) {
            await prisma.jobTypeRelation.create({
              data: {
                jobId: job.id,
                jobTypeId: jobType.id,
              },
            });
          }
        }
      }
    }

    // Update user's onboarding step to complete
    await prisma.user.update({
      where: { id: user.id },
      data: { onboardingStep: 100 },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error saving jobs:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
