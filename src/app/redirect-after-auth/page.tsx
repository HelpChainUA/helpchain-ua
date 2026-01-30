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
    4: "/onboarding/location",
    5: "/onboarding/profile",
    6: "/onboarding/profession",
    7: "/onboarding/upload-cv",
    8: "/onboarding/language",
    9: "/onboarding/salary",
    10: "/onboarding/thank-you",
  };

  const onboardingStep = user.onboardingStep;

  // If onboarding is completed, send to home page
  if (onboardingStep >= 10) {
    return redirect("/");
  }

  // Otherwise, send to the correct onboarding step
  const nextPath = stepToPathMap[onboardingStep] || "/";
  return redirect(nextPath);
}
