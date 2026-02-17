import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { salaryExpectation } = await req.json();

  await prisma.user.update({
    where: { id: parseInt(session.user.id) },
    data: {
      salary: salaryExpectation,
      onboardingStep: 11,
    },
  });

  return NextResponse.json({ success: true });
}
