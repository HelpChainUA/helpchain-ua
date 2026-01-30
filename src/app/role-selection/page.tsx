"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ArrowRight from "@/icons/ArrowRight";

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleContinue = () => {
    if (selectedRole) {
      localStorage.setItem("selectedRole", selectedRole);
      router.push("/signup");
    }
  };

  const roles = [
    {
      value: "JOB_SEEKER",
      title: "Job Seeker",
      description: "Looking for employment opportunities and career growth",
    },
    {
      value: "EMPLOYER",
      title: "Employer",
      description: "Hiring talented individuals for your organization",
    },
    {
      value: "PARTNER",
      title: "Partner",
      description: "Collaborate with us to support job seekers",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-primary-50">
      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl m-auto">
        <h1 className="text-3xl font-bold mb-4 font-montserrat text-center text-gray-900">
          What brings you here today?
        </h1>
        <p className="font-karla mb-10 text-center text-gray-700 text-lg">
          Select your role to get started
        </p>

        <div className="w-full space-y-4 mb-20">
          {roles.map((role) => (
            <div
              key={role.value}
              onClick={() => setSelectedRole(role.value)}
              className={`p-6 border-2 rounded-lg cursor-pointer transition ${
                selectedRole === role.value
                  ? "border-primary-500 bg-primary-100"
                  : "border-gray-300 bg-white hover:border-primary-300"
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-montserrat">
                {role.title}
              </h3>
              <p className="text-gray-700 font-karla">{role.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t-2 border-primary-300 py-4 px-4">
        <div className="max-w-xl mx-auto flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="w-auto rounded-md bg-primary-500 py-2 px-5 text-gray-25 hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-karla"
          >
            <div className="flex items-center gap-2 font-bold">
              Continue
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}
