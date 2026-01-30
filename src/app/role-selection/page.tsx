"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ArrowRight from "@/icons/ArrowRight";
import Image from "next/image";

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
      description: "I'm looking for work and want to be matched with jobs.",
      icon: "/images/Human.svg",
    },
    {
      value: "EMPLOYER",
      title: "Employer",
      description: "I'm hiring and want to post opportunities.",
      icon: "/images/Building.svg",
    },
    {
      value: "PARTNER",
      title: "Partner",
      description: "I want to support people with resources or services.",
      icon: "/images/Heart.svg",
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

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          {roles.map((role) => (
            <div
              key={role.value}
              onClick={() => setSelectedRole(role.value)}
              className={`flex flex-col gap-2 p-6 border-2 rounded-lg cursor-pointer transition h-full ${
                selectedRole === role.value
                  ? "border-primary-500 bg-primary-500 text-white"
                  : "border-gray-300 bg-white text-gray-700"
              }`}
            >
              <div className="flex-shrink-0">
                <Image
                  src={role.icon}
                  alt={role.title}
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-xl font-bold font-montserrat">
                {role.title}
              </h3>
              <p className="font-karla">{role.description}</p>
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
