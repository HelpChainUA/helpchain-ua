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
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      jobTitle: user.currentRole || "",
      phoneNumber: user.phoneNumber || "",
      email: user.email,
    });
  } catch (error) {
    console.error("Error fetching contact person data:", error);
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
    const { firstName, lastName, jobTitle, phoneNumber } = body;

    if (!firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json(
        { message: "First name and last name are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        firstName,
        lastName,
        currentRole: jobTitle || null,
        phoneNumber: phoneNumber || null,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error saving contact person data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
