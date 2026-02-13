"use client";

import { useState, useEffect } from "react";
import {
  AgeRange,
  EmploymentTypePreference,
  OpportunityType,
  UserData,
} from "@/types/user";
import Image from "next/image";

const mainCategories = [
  "Age range",
  "Target jobs",
  "Income",
  "Opportunities",
  "Job search locations",
];

const ageRangeLabels: Record<AgeRange, string> = {
  AGE_18_24: "18-24",
  AGE_25_29: "25-29",
  AGE_30_34: "30-34",
  AGE_35_39: "35-39",
  AGE_40_44: "40-44",
  AGE_45_54: "45-54",
  AGE_55_PLUS: "55+",
};

const opportunityLabels: Record<OpportunityType, string> = {
  COURSES: "Courses",
  ENGLISH_CLASSES: "English classes",
  INTERNSHIPS: "Internships",
  PAID_WORK_ONLY: "No, only paid work",
};

const employmentTypeLabels: Record<EmploymentTypePreference, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  BOTH_FLEXIBLE: "Both / Flexible",
};

export default function JobSeekerProfile() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/profiles/job-seeker");
        const data: UserData = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <main>
      <div className="flex p-25 bg-gray-100 shadow-xl rounded-2xl">
        <div className="flex flex-col gap-10 bg-primary-900 text-white p-10">
          <div className="flex flex-col gap-5 items-center">
            <div className="relative w-[150px] h-[150px]">
              <Image
                src="/images/avatar.png"
                alt={`${user?.firstName} ${user?.lastName}`}
                className=""
                fill
              />
            </div>
            <p className="text-center text-accent-200 font-monseratte text-lg font-semibold">
              “I want to restart my career in the UK, but the job market feels
              overwhelming.”
            </p>
          </div>
          <div className="flex justify-between">
            <ul className="flex flex-col gap-3 font-bold font-karla">
              {mainCategories.map((category, i) => (
                <li key={i}>{category}</li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3 items-end">
              <li>
                {user?.ageRange ? ageRangeLabels[user.ageRange] : undefined}
              </li>
              <li>{user?.targetJobs?.join(", ")}</li>
              <li>{user?.salary}</li>
              <li>
                {user?.opportunities
                  ?.map((item) => opportunityLabels[item])
                  .join(", ")}
                {user?.employmentTypes && user.employmentTypes.length > 0
                  ? ` (${user.employmentTypes
                      .map((item) => employmentTypeLabels[item])
                      .join(", ")})`
                  : ""}
              </li>
              <li>{user?.jobSearchLocations?.join(", ")}</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col bg-white p-15 gap-10">
          <div>
            <p className="font-karla">User Persona</p>
            <h1 className="font-Montserrat text-4xl font-bold">{`${user?.firstName} ${user?.lastName}`}</h1>
          </div>
          <div>
            <h2 className="text-xl font-bold font-karla">About</h2>
            <p>
              Olena recently relocated to the UK due to the war. With 10+ years
              of experience in marketing, she is now seeking a job but faces
              barriers like certification recognition, language proficiency, and
              adapting to UK work culture. She actively uses online job boards
              and networking groups but feels lost in where to start.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold font-karla">Goals</h2>
            <ul className="p-5 list-disc">
              <li>Find a stable marketing job in the UK</li>
              <li>Improve professional English for work communication</li>
              <li>Understand UK job application processes and requirements</li>
              <li>Build connections with industry professionals in the UK</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold font-karla">Pain Points</h2>
            <ul className="p-5 list-disc">
              <li>
                UK Work Culture & Job Application Process – Different from
                Ukraine, feels confusing
              </li>
              <li>
                Language Barrier – Needs confidence in professional English
              </li>
              <li>
                Lack of UK Work Experience – Employers prioritize local
                experience
              </li>
              <li>
                Recognition of Qualifications – Unsure if her Ukrainian degree
                is valid in the UK
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold font-karla">Needs</h2>
            <ul className="p-5 list-disc">
              <li>
                A platform that connects her with employers who value Ukrainian
                professionals
              </li>
              <li>
                Guidance on UK job applications (CV, cover letters, interviews)
              </li>
              <li>
                Access to English courses focused on business and marketing
              </li>
              <li>
                A mentorship program to help her integrate into the UK job
                market
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
