import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function RedirectAfterAuthPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return redirect("/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) },
    select: {
      onboardingStep: true,
      role: true,
    },
  });

  if (!user) {
    return redirect("/signin");
  }

  // If user is an EMPLOYER, redirect to employer onboarding
  if (user.role === "EMPLOYER") {
    const employerStepToPathMap: Record<number, string> = {
      4: "/onboarding/employer/company",
      100: "/", // Completed
    };

    const onboardingStep = user.onboardingStep;

    if (onboardingStep >= 100) {
      return redirect("/");
    }

    const nextPath =
      employerStepToPathMap[onboardingStep] || "/onboarding/employer/company";
    return redirect(nextPath);
  }

  // Default: Job Seeker onboarding
  const stepToPathMap: Record<number, string> = {
    4: "/onboarding/job-seeker/profile",
    5: "/onboarding/job-seeker/job-location",
    6: "/onboarding/job-seeker/profession",
    7: "/onboarding/job-seeker/work-experience",
    8: "/onboarding/job-seeker/upload-cv",
    9: "/onboarding/job-seeker/language",
    10: "/onboarding/job-seeker/salary",
  };

  const onboardingStep = user.onboardingStep;

  // If onboarding is completed, send to home page
  if (onboardingStep >= 11) {
    return redirect("/");
  }

  // Otherwise, send to the correct onboarding step
  const nextPath = stepToPathMap[onboardingStep] || "/";
  return redirect(nextPath);
}
