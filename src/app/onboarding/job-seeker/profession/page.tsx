"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ProgressBar from "@/components/ProgressBar";
import ArrowRight from "@/icons/ArrowRight";
import ArrowLeft from "@/icons/ArrowLeft";
import LoadingSpinner from "@/icons/LoadingSpinner";
import MultiSelect from "@/components/MultiSelect";
import Checkbox from "@/components/Checkbox";

type JobOption = { label: string; value: string };

const opportunityOptions = [
  { label: "Courses", value: "COURSES" },
  { label: "English classes", value: "ENGLISH_CLASSES" },
  { label: "Internships", value: "INTERNSHIPS" },
  { label: "No, only paid work", value: "PAID_WORK_ONLY" },
];

const employmentTypeOptions = [
  { label: "Full-time", value: "FULL_TIME" },
  { label: "Part-time", value: "PART_TIME" },
  { label: "Both / Flexible", value: "BOTH_FLEXIBLE" },
];

export default function ProfessionPage() {
  const router = useRouter();
  const { update } = useSession();

  const [targetJobs, setTargetJobs] = useState<string[]>([]);
  const [targetJobOptions, setTargetJobOptions] = useState<JobOption[]>([]);
  const [opportunities, setOpportunities] = useState<string[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [professionRes, optionsRes] = await Promise.all([
          fetch("/api/onboarding/job-seeker/profession"),
          fetch("/api/meta/job-options"),
        ]);

        if (professionRes.ok) {
          const data = await professionRes.json();
          if (data) {
            setTargetJobs(data.targetJobs || []);
            setOpportunities(data.opportunities || []);
            setEmploymentTypes(data.employmentTypes || []);
          }
        }

        if (optionsRes.ok) {
          const data = await optionsRes.json();
          if (Array.isArray(data)) {
            setTargetJobOptions(
              data.map((option) => ({
                label: option.label,
                value: option.id,
              })),
            );
          }
        }
      } catch (err) {
        console.error("Failed to load profession data", err);
        setError("Failed to load profession data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTargetJobsChange = (values: string[]) => {
    setTargetJobs(values);
  };

  const toggleOpportunity = (value: string) => {
    if (value === "PAID_WORK_ONLY") {
      setOpportunities(["PAID_WORK_ONLY"]);
      return;
    }

    const next = opportunities.includes(value)
      ? opportunities.filter((item) => item !== value)
      : [...opportunities.filter((item) => item !== "PAID_WORK_ONLY"), value];
    setOpportunities(next);
  };

  const toggleEmploymentType = (value: string) => {
    if (value === "BOTH_FLEXIBLE") {
      setEmploymentTypes(["BOTH_FLEXIBLE"]);
      return;
    }

    const next = employmentTypes.includes(value)
      ? employmentTypes.filter((item) => item !== value)
      : [...employmentTypes.filter((item) => item !== "BOTH_FLEXIBLE"), value];
    setEmploymentTypes(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/onboarding/job-seeker/profession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetJobs,
          opportunities,
          employmentTypes,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      await update();
      router.push("/onboarding/job-seeker/work-experience");
      setLoading(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col  bg-primary-50">
      <ProgressBar percent={55} stepInfo="Step 6 of 11" />
      <main className="flex-1 flex flex-col gap-4 items-center justify-center px-6">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 text-gray-600">
            <LoadingSpinner className="animate-spin" />
            <p className="font-karla text-sm">Loading your preferences...</p>
          </div>
        ) : (
          <>
            {error && (
              <p className="text-sm text-red-600 bg-red-100 p-2 rounded">
                {error}
              </p>
            )}
            <h1 className="text-2xl font-bold mb-4 font-montserrat text-center">
              New job and opportunities
            </h1>

            <div className="font-karla pb-8 text-center">
              <p>
                Tell us what kind of job and opportunities you're open to. This
                helps us find the right match for you.
              </p>
            </div>

            <form
              id="onbord-profession-form"
              onSubmit={handleSubmit}
              className="w-full md:w-xl space-y-6 text-gray-300 font-semibold font-karla mb-20"
            >
              <div className="space-y-2">
                <p className="text-base font-bold text-gray-900">
                  Job you'd like to find now / Target job
                </p>
                <MultiSelect
                  name="targetJobs"
                  values={targetJobs}
                  onChange={(_, values) => handleTargetJobsChange(values)}
                  options={targetJobOptions}
                  placeholder="Select main options"
                />
              </div>

              <div className="space-y-4">
                <p className="text-base font-bold text-gray-900">
                  Are you considering courses, internships, etc
                </p>
                <div className="flex justify-between flex-wrap text-gray-700">
                  {opportunityOptions.map((option) => (
                    <div className="w-1/2 mb-4 " key={option.value}>
                      <Checkbox
                        key={option.value}
                        label={option.label}
                        checked={opportunities.includes(option.value)}
                        onChange={() => toggleOpportunity(option.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-base font-bold text-gray-900">
                  Type of employment
                </p>
                <div className="flex justify-between flex-wrap text-gray-700">
                  {employmentTypeOptions.map((option) => (
                    <div className="mb-4" key={option.value}>
                      <Checkbox
                        type="round"
                        key={option.value}
                        label={option.label}
                        checked={employmentTypes.includes(option.value)}
                        onChange={() => toggleEmploymentType(option.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </>
        )}
      </main>
      <footer className="bg-white border-t-2 border-primary-300 py-4 px-4 item-center">
        <div className="max-w-xl mx-auto flex justify-center font-karla gap-4">
          <button
            type="button"
            onClick={() => router.push("/onboarding/job-seeker/job-location")}
            className="px-4 py-2 rounded bg-white hover:bg-primary-200 text-primary-500 font-bold"
          >
            <div className="flex items-center gap-2 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back
            </div>
          </button>
          <button
            type="submit"
            form="onbord-profession-form"
            className="w-auto rounded-md bg-primary-500 py-2 px-5 text-gray-25 hover:bg-primary-700 transition"
            disabled={loading || isLoading}
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
