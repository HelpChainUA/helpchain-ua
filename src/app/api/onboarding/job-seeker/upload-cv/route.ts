import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("cv") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const filename = `${uuid()}-${file.name}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  await writeFile(path.join(uploadDir, filename), buffer);

  const fileUrl = `/uploads/${filename}`;

  // Save to DB
  await prisma.cv.create({
    data: {
      userId: parseInt(session.user.id),
      fileUrl,
    },
  });

  // Move user forward
  await prisma.user.update({
    where: { id: parseInt(session.user.id) },
    data: {
      onboardingStep: 9,
    },
  });

  return NextResponse.json({ success: true });
}
