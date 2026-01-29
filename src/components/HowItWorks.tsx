"use client";
import { useState } from "react";
import Link from "next/link";

const steps = [
  {
    number: 1,
    title: "Create Your Profile",
    items: [
      "Sign up and build your job seeker profile.",
      "Add skills, experience, and job preferences.",
      "Upload your CV and make it visible to employers.",
    ],
  },
  {
    number: 2,
    title: "Find & Apply for Jobs",
    items: [
      "Browse hundreds of UK job listings.",
      "Get AI-matched job suggestions.",
      "Apply with one click!",
    ],
  },
  {
    number: 3,
    title: "Get Hired & Start Working",
    items: [
      "Employers contact you for interviews.",
      "Track your applications & updates.",
      "Start your new career in the UK!",
    ],
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"find" | "hire" | "hire2">("find");

  return (
    <section className="bg-primary-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold font-montserrat  mb-4">
          How It Works
        </h2>

        {/* Tabs */}
        <div className="flex justify-center text-base font-bold mb-8 font-montserrat">
          <button
            onClick={() => setActiveTab("find")}
            className={`pb-1 transition ${
              activeTab === "find"
                ? "text-gray-900 border-b-3 border-accent-500 px-4"
                : "text-primary-500 hover:text-primary-800 px-4"
            }`}
          >
            For employers
          </button>
          <button
            onClick={() => setActiveTab("hire")}
            className={`pb-1 transition ${
              activeTab === "hire"
                ? "text-gray-900 border-b-3 border-accent-500 px-4"
                : "text-primary-500 hover:text-primary-800 px-4"
            }`}
          >
            For employees
          </button>
          <button
            onClick={() => setActiveTab("hire2")}
            className={`pb-1 transition ${
              activeTab === "hire2"
                ? "text-gray-900 border-b-3 border-accent-500 px-4"
                : "text-primary-500 hover:text-primary-800 px-4"
            }`}
          >
            Other possibilities
          </button>
        </div>

        {/* Content */}
        {activeTab === "find" && (
          <>
            <div className="grid gap-10 grid-cols-1 md:grid-cols-3 text-left font-karla">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="border-2 border-primary-200 rounded-lg p-10"
                >
                  <div className="text-primary-400 font-bold text-5xl font-montserrat mb-4 px-4">
                    {step.number}.
                  </div>
                  <p className="text-xl font-semibold text-gray-800">
                    {step.title}
                  </p>
                  <ul className="space-y-2 text-primary-900 text-sm leading-relaxed pl-2">
                    {step.items.map((item, index) => (
                      <li
                        key={index}
                        className="relative pl-4 text-primary-900 text-sm leading-relaxed"
                      >
                        <span className="absolute left-0 top-2 w-2 h-2 bg-primary-400 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 font-karla font-extrabold flex flex-col sm:flex-row items-center align-center justify-center gap-4">
              <p className="text-lg font-medium text-black">
                Ready to find your next job?
              </p>
              <Link href="/signup">
                <button className="bg-accent-400 hover:bg-accent-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                  Join us now
                </button>
              </Link>
            </div>
          </>
        )}

        {activeTab === "hire" && (
          <div className="text-gray-500 mt-8">
            <p>Content for &quot;Hire Talent&quot; will be added soon...</p>
          </div>
        )}
        {activeTab === "hire2" && (
          <div className="text-gray-500 mt-8">
            <p>Content for &quot;Hire Talent&quot; will be added soon...</p>
          </div>
        )}
      </div>
    </section>
  );
}
