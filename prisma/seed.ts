import { PrismaClient } from "../src/generated/prisma";
const prisma = new PrismaClient();

async function main() {
  // Languages
  await prisma.language.createMany({
    data: [
      { name: "English" },
      { name: "Ukrainian" },
      { name: "German" },
      { name: "Polish" },
      { name: "Spanish" },
      { name: "French" },
      { name: "Italian" },
      { name: "Portuguese" },
      { name: "Dutch" },
      { name: "Russian" },
      { name: "Turkish" },
      { name: "Arabic" },
      { name: "Chinese" },
      { name: "Japanese" },
      { name: "Korean" },
      { name: "Hindi" },
      { name: "Greek" },
      { name: "Swedish" },
      { name: "Norwegian" },
      { name: "Finnish" },
    ],
    skipDuplicates: true,
  });

  // Language Levels
  await prisma.languageLevel.createMany({
    data: [
      { name: "Basic" },
      { name: "Intermediate" },
      { name: "Advanced" },
      { name: "Fluent" },
    ],
    skipDuplicates: true,
  });

  // Industries
  const industries = [
    "Technology & IT",
    "Healthcare",
    "Education",
    "Finance & Banking",
    "Retail & E-commerce",
    "Construction",
    "Manufacturing",
    "Hospitality & Tourism",
    "Marketing & Advertising",
    "Legal Services",
    "Transportation & Logistics",
    "Energy & Utilities",
    "Real Estate",
    "Non-Profit & NGO",
    "Agriculture",
    "Arts & Entertainment",
    "Other",
  ];

  for (const name of industries) {
    await prisma.industry.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Company Sizes
  const sizes = ["1-10", "11-50", "51-200", "201-500", "500+"];

  for (const name of sizes) {
    await prisma.companySize.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // England Cities (Locations)
  const cities = [
    "London",
    "Manchester",
    "Birmingham",
    "Liverpool",
    "Leeds",
    "Newcastle",
    "Sheffield",
    "Bristol",
    "Nottingham",
    "Leicester",
    "Southampton",
    "Brighton",
    "Oxford",
    "Cambridge",
    "York",
    "Coventry",
    "Reading",
    "Portsmouth",
    "Plymouth",
    "Derby",
  ];

  for (const city of cities) {
    await prisma.location.upsert({
      where: { city_country: { city, country: "United Kingdom" } },
      update: {},
      create: { city, country: "United Kingdom" },
    });
  }
  // Job Types
  const jobTypes = [
    { name: "PAID_JOB", displayName: "Paid Job" },
    { name: "INTERNSHIP", displayName: "Internship" },
    { name: "VOLUNTEERING", displayName: "Volunteering" },
  ];

  for (const type of jobTypes) {
    await prisma.jobType.upsert({
      where: { name: type.name },
      update: { displayName: type.displayName },
      create: type,
    });
  }

  // Work Types
  const workTypes = [
    { name: "FULL_TIME", displayName: "Full-time" },
    { name: "PART_TIME", displayName: "Part-time" },
    { name: "FLEXIBLE", displayName: "Both / Flexible" },
  ];

  for (const type of workTypes) {
    await prisma.workType.upsert({
      where: { name: type.name },
      update: { displayName: type.displayName },
      create: type,
    });
  }
  console.log("✅ Seed data created successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
