"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import ArrowRight from "@/icons/ArrowRight";
import ArrowLeft from "@/icons/ArrowLeft";

export default function SalaryPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const options = [
    "£20,000–£30,000",
    "£30,000–£40,000",
    "£40,000+",
    "I’m flexible",
  ];

  const handleSubmit = async () => {
    if (!selected) return;

    setLoading(true);
    try {
      const res = await fetch("/api/onboarding/job-seeker/salary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ salaryExpectation: selected }),
      });

      if (!res.ok) throw new Error("Failed to save");

      router.push("/onboarding/job-seeker/thank-you");
    } catch (err) {
      console.error("Error saving salary:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col bg-primary-50 ">
      <ProgressBar percent={91} stepInfo="Step 10 of 11" />
      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl m-auto pb-10">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-4 font-montserrat text-center">
          Your salary expectations
        </h1>
        <p className="font-karla mb-10 text-center max-w-lg">
          This helps employers know your expectations upfront. You can skip this
          if you’re flexible.
        </p>

        {/* Salary Options */}
        <div className="space-y-4 w-full max-w-lg">
          {options.map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 border rounded-md px-4 py-3 cursor-pointer ${
                selected === option ? "border-gray-500" : "border-gray-300"
              } bg-white`}
            >
              <input
                type="radio"
                name="salary"
                value={option}
                checked={selected === option}
                onChange={() => setSelected(option)}
                className="accent-gray-100 h-4 w-4"
              />
              <span className="text-sm text-gray-900 font-bold font-karla">
                {option}
              </span>
            </label>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t-2 border-primary-300 py-4 px-4">
        <div className="max-w-xl mx-auto flex justify-center font-karla gap-4">
          <button
            type="button"
            onClick={() => router.push("/onboarding/job-seeker/language")}
            className="px-4 py-2 rounded bg-white hover:bg-primary-200 text-primary-500 font-bold"
          >
            <div className="flex items-center gap-2 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back
            </div>
          </button>
          <button
            type="submit"
            form="onbord-profile-form"
            className="w-auto rounded-md bg-primary-500 py-2 px-5 text-gray-25 disabled:opacity-50 hover:bg-primary-700 transition"
            disabled={!selected || loading}
            onClick={handleSubmit}
          >
            {loading ? (
              "Saving..."
            ) : (
              <div className="flex items-center gap-2 font-bold">
                Continue
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
