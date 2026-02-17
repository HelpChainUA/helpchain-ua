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

  // UK Regions/Areas (Locations)
  const englandCounties = [
    "Bedfordshire",
    "Berkshire",
    "Bristol",
    "Buckinghamshire",
    "Cambridgeshire",
    "Cheshire",
    "City of London",
    "Cornwall",
    "Cumbria",
    "Derbyshire",
    "Devon",
    "Dorset",
    "Durham",
    "East Riding of Yorkshire",
    "East Sussex",
    "Essex",
    "Gloucestershire",
    "Greater London",
    "Greater Manchester",
    "Hampshire",
    "Herefordshire",
    "Hertfordshire",
    "Isle of Wight",
    "Kent",
    "Lancashire",
    "Leicestershire",
    "Lincolnshire",
    "Merseyside",
    "Norfolk",
    "North Yorkshire",
    "Northamptonshire",
    "Northumberland",
    "Nottinghamshire",
    "Oxfordshire",
    "Rutland",
    "Shropshire",
    "Somerset",
    "South Yorkshire",
    "Staffordshire",
    "Suffolk",
    "Surrey",
    "Tyne and Wear",
    "Warwickshire",
    "West Midlands",
    "West Sussex",
    "West Yorkshire",
    "Wiltshire",
    "Worcestershire",
  ];

  const scotlandCouncilAreas = [
    "Aberdeen City",
    "Aberdeenshire",
    "Angus",
    "Argyll and Bute",
    "City of Edinburgh",
    "Clackmannanshire",
    "Dumfries and Galloway",
    "Dundee City",
    "East Ayrshire",
    "East Dunbartonshire",
    "East Lothian",
    "East Renfrewshire",
    "Falkirk",
    "Fife",
    "Glasgow City",
    "Highland",
    "Inverclyde",
    "Midlothian",
    "Moray",
    "Na h-Eileanan Siar",
    "North Ayrshire",
    "North Lanarkshire",
    "Orkney Islands",
    "Perth and Kinross",
    "Renfrewshire",
    "Scottish Borders",
    "Shetland Islands",
    "South Ayrshire",
    "South Lanarkshire",
    "Stirling",
    "West Dunbartonshire",
    "West Lothian",
  ];

  const walesPrincipalAreas = [
    "Blaenau Gwent",
    "Bridgend",
    "Caerphilly",
    "Cardiff",
    "Carmarthenshire",
    "Ceredigion",
    "Conwy",
    "Denbighshire",
    "Flintshire",
    "Gwynedd",
    "Isle of Anglesey",
    "Merthyr Tydfil",
    "Monmouthshire",
    "Neath Port Talbot",
    "Newport",
    "Pembrokeshire",
    "Powys",
    "Rhondda Cynon Taf",
    "Swansea",
    "Torfaen",
    "Vale of Glamorgan",
    "Wrexham",
  ];

  const northernIrelandDistricts = [
    "Antrim and Newtownabbey",
    "Ards and North Down",
    "Armagh City, Banbridge and Craigavon",
    "Belfast",
    "Causeway Coast and Glens",
    "Derry City and Strabane",
    "Fermanagh and Omagh",
    "Lisburn and Castlereagh",
    "Mid and East Antrim",
    "Mid Ulster",
    "Newry, Mourne and Down",
  ];

  const regionGroups = [
    { country: "England", regions: englandCounties },
    { country: "Scotland", regions: scotlandCouncilAreas },
    { country: "Wales", regions: walesPrincipalAreas },
    { country: "Northern Ireland", regions: northernIrelandDistricts },
  ];

  for (const group of regionGroups) {
    for (const region of group.regions) {
      await prisma.location.upsert({
        where: { city_country: { city: region, country: group.country } },
        update: {},
        create: { city: region, country: group.country },
      });
    }
  }

  // Job Options
  const jobOptions = [
    { slug: "caregiver", label: "Caregiver" },
    { slug: "cleaner", label: "Cleaner" },
    { slug: "warehouse-operative", label: "Warehouse Operative" },
    { slug: "warehouse-picker-packer", label: "Warehouse Picker / Packer" },
    { slug: "forklift-operator", label: "Forklift Operator" },
    { slug: "driver-delivery", label: "Driver / Delivery" },
    { slug: "construction-labourer", label: "Construction / Labourer" },
    { slug: "hospitality-hotel", label: "Hospitality / Hotel" },
    { slug: "kitchen-restaurant", label: "Kitchen / Restaurant" },
    { slug: "chef-cook", label: "Chef / Cook" },
    { slug: "barista", label: "Barista" },
    { slug: "retail", label: "Retail" },
    { slug: "sales-assistant", label: "Sales Assistant" },
    { slug: "office-admin", label: "Office / Admin" },
    { slug: "receptionist", label: "Receptionist" },
    { slug: "customer-service", label: "Customer Service" },
    { slug: "it-tech", label: "IT / Tech" },
    { slug: "education-teaching", label: "Education / Teaching" },
    { slug: "healthcare-assistant", label: "Healthcare Assistant" },
    { slug: "support-worker", label: "Support Worker" },
    { slug: "security-guard", label: "Security Guard" },
    { slug: "maintenance-handyman", label: "Maintenance / Handyman" },
    { slug: "manufacturing-operative", label: "Manufacturing Operative" },
    { slug: "logistics-coordinator", label: "Logistics Coordinator" },
    { slug: "childcare-nursery", label: "Childcare / Nursery" },
    { slug: "hair-beauty", label: "Hair & Beauty" },
  ];

  for (const option of jobOptions) {
    await prisma.jobOption.upsert({
      where: { slug: option.slug },
      update: { label: option.label },
      create: option,
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
