import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  return parseInt(session.user.id);
}

// GET
export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const langs = await prisma.userLangLevel.findMany({
    where: { userId },
    include: { language: true, level: true },
  });

  const languageSkills = langs.map((item) => ({
    languageId: item.languageId,
    levelId: item.levelId,
    language: item.language.name,
    level: item.level.name,
  }));

  return NextResponse.json({ languageSkills });
}

// POST
export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { languageSkills } = await req.json();

  await prisma.userLangLevel.deleteMany({ where: { userId } });

  await prisma.userLangLevel.createMany({
    data: languageSkills.map((s: any) => ({
      userId,
      languageId: Number(s.languageId),
      levelId: Number(s.levelId),
    })),
  });

  await prisma.user.update({
    where: { id: userId },
    data: { onboardingStep: 10 },
  });

  return NextResponse.json({ success: true });
}

// DELETE: Delete one language
export async function DELETE(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { languageId } = await req.json();
  if (!languageId) {
    return NextResponse.json({ error: "Missing languageId" }, { status: 400 });
  }

  await prisma.userLangLevel.delete({
    where: {
      userId_languageId: {
        userId,
        languageId: Number(languageId),
      },
    },
  });

  return NextResponse.json({ success: true });
}
