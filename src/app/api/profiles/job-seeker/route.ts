import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  console.log("API route GET called");
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) },
    select: {
      firstName: true,
      lastName: true,
      onboardingStep: true,
      ageRange: true,
      willingToRelocate: true,
      salary: true,
      housingAssistancePreference: true,
      targetJobs: { select: { jobOption: { select: { label: true } } } },
      opportunities: { select: { type: true } },
      employmentTypes: { select: { type: true } },
      location: {
        select: { city: true, country: true },
      },
      jobSearchLocations: {
        select: { location: { select: { city: true, country: true } } },
      },
    },
  });

  return NextResponse.json({
    isLoggedIn: true,
    firstName: user?.firstName,
    lastName: user?.lastName,
    onboardingStep: user?.onboardingStep,
    ageRange: user?.ageRange,
    locationLabel: user?.location
      ? `${user.location.city}, ${user.location.country}`
      : undefined,
    willingToRelocate: user?.willingToRelocate,
    housingAssistancePreference: user?.housingAssistancePreference,
    targetJobs: user?.targetJobs.map((item) => item.jobOption.label) || [],
    opportunities: user?.opportunities.map((item) => item.type) || [],
    employmentTypes: user?.employmentTypes.map((item) => item.type) || [],
    jobSearchLocations:
      user?.jobSearchLocations
        .map((item) =>
          item.location
            ? `${item.location.city}, ${item.location.country}`
            : "",
        )
        .filter(Boolean) || [],
    salary: user?.salary,
  });
}
