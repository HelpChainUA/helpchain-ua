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
            industries: {
              include: { industry: true },
            },
            locations: {
              include: { location: true },
            },
            companySize: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.company) {
      return NextResponse.json({
        company: {
          companyName: user.company.companyName,
          companyWebsite: user.company.companyWebsite,
          companyLinkedIn: user.company.companyLinkedIn,
          companySizeId: user.company.companySizeId,
          industryIds: user.company.industries.map((ci) => ci.industryId),
          locationIds: user.company.locations.map((cl) => cl.locationId),
        },
      });
    }

    return NextResponse.json({ company: null });
  } catch (error) {
    console.error("Error fetching company data:", error);
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
    const {
      companyName,
      companyWebsite,
      companyLinkedIn,
      industryIds,
      companySizeId,
      locationIds,
    } = body;

    if (!companyName || !companyName.trim()) {
      return NextResponse.json(
        { message: "Company name is required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Upsert company
    const company = await prisma.company.upsert({
      where: { userId: user.id },
      update: {
        companyName,
        companyWebsite: companyWebsite || null,
        companyLinkedIn: companyLinkedIn || null,
        companySizeId: companySizeId || null,
      },
      create: {
        userId: user.id,
        companyName,
        companyWebsite: companyWebsite || null,
        companyLinkedIn: companyLinkedIn || null,
        companySizeId: companySizeId || null,
      },
    });

    // Update industries
    if (industryIds && Array.isArray(industryIds)) {
      // Delete existing
      await prisma.companyIndustry.deleteMany({
        where: { companyId: company.id },
      });
      // Create new
      if (industryIds.length > 0) {
        await prisma.companyIndustry.createMany({
          data: industryIds.map((industryId: string) => ({
            companyId: company.id,
            industryId,
          })),
        });
      }
    }

    // Update locations
    if (locationIds && Array.isArray(locationIds)) {
      // Delete existing
      await prisma.companyLocation.deleteMany({
        where: { companyId: company.id },
      });
      // Create new
      if (locationIds.length > 0) {
        await prisma.companyLocation.createMany({
          data: locationIds.map((locationId: string) => ({
            companyId: company.id,
            locationId,
          })),
        });
      }
    }

    return NextResponse.json({ success: true, company });
  } catch (error) {
    console.error("Error saving company data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
