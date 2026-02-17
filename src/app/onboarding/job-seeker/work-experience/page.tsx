"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ProgressBar from "@/components/ProgressBar";
import ArrowRight from "@/icons/ArrowRight";
import ArrowLeft from "@/icons/ArrowLeft";
import LoadingSpinner from "@/icons/LoadingSpinner";
import Select from "@/components/Select";
import { XIcon } from "lucide-react";

type JobOption = { label: string; value: string };

type WorkPosition = {
  jobOptionId: string;
  yearsRange: string;
};

const yearsOptions = [
  { label: "0-1 years", value: "YEARS_0_1" },
  { label: "1-2 years", value: "YEARS_1_2" },
  { label: "3-5 years", value: "YEARS_3_5" },
  { label: "6-10 years", value: "YEARS_6_10" },
  { label: "10+ years", value: "YEARS_10_PLUS" },
];

export default function WorkExperiencePage() {
  const router = useRouter();
  const { update } = useSession();

  const [positions, setPositions] = useState<WorkPosition[]>([
    { jobOptionId: "", yearsRange: "" },
  ]);
  const [summary, setSummary] = useState("");
  const [jobOptions, setJobOptions] = useState<JobOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [optionsRes, savedRes] = await Promise.all([
          fetch("/api/meta/job-options"),
          fetch("/api/onboarding/job-seeker/work-experience"),
        ]);

        const optionsData = await optionsRes.json();
        const savedData = await savedRes.json();

        if (Array.isArray(optionsData)) {
          setJobOptions(
            optionsData.map((option) => ({
              label: option.label,
              value: option.id,
            })),
          );
        }

        const savedPositions = Array.isArray(savedData?.positions)
          ? savedData.positions
          : [];
        if (savedPositions.length > 0) {
          setPositions([
            ...savedPositions.map((item: WorkPosition) => ({
              jobOptionId: String(item.jobOptionId || ""),
              yearsRange: String(item.yearsRange || ""),
            })),
            { jobOptionId: "", yearsRange: "" },
          ]);
        }

        if (typeof savedData?.summary === "string") {
          setSummary(savedData.summary);
        }
      } catch (err) {
        console.error("Failed to load work experience data", err);
        setError("Failed to load work experience data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    index: number,
    field: keyof WorkPosition,
    value: string,
  ) => {
    const updated = [...positions];
    updated[index][field] = value;
    setPositions(updated);

    const isLast = index === updated.length - 1;
    const isFilled = updated[index].jobOptionId && updated[index].yearsRange;
    const hasEmpty = updated.some((p) => !p.jobOptionId || !p.yearsRange);

    if (isLast && isFilled && !hasEmpty) {
      setPositions([...updated, { jobOptionId: "", yearsRange: "" }]);
    }
  };

  const handleDelete = (index: number) => {
    const updated = [...positions];
    updated.splice(index, 1);
    setPositions(
      updated.length > 0 ? updated : [{ jobOptionId: "", yearsRange: "" }],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const validPositions = positions.filter(
      (item) => item.jobOptionId && item.yearsRange,
    );

    try {
      const res = await fetch("/api/onboarding/job-seeker/work-experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          positions: validPositions,
          summary,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      await update();
      router.push("/onboarding/job-seeker/upload-cv");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col bg-primary-50">
      <ProgressBar percent={64} stepInfo="Step 7 of 11" />
      <main className="flex-1 flex flex-col gap-4 items-center justify-center px-6">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 text-gray-600">
            <LoadingSpinner className="animate-spin" />
            <p className="font-karla text-sm">Loading your experience...</p>
          </div>
        ) : (
          <>
            {error && (
              <p className="text-sm text-red-600 bg-red-100 p-2 rounded">
                {error}
              </p>
            )}
            <h1 className="text-2xl font-bold mb-2 font-montserrat text-center">
              Work experience and skills
            </h1>
            <div className="font-karla pb-6 text-center max-w-2xl">
              <p>
                Tell us about any of your experience throughout your
                professional life. This helps us find the right match for you.
              </p>
            </div>

            <form
              id="onbord-work-experience-form"
              onSubmit={handleSubmit}
              className="w-full md:w-xl space-y-6 text-gray-300 font-semibold font-karla mb-20"
            >
              <div className="space-y-4">
                <p className="text-base font-bold text-gray-900">
                  What position are you used to working in?
                </p>
                {positions.map((position, index) => (
                  <div
                    key={index}
                    className="flex flex-wrap gap-2 items-center"
                  >
                    <div className="flex-1 min-w-[240px]">
                      <Select
                        name={`position-${index}`}
                        value={position.jobOptionId}
                        onChange={(e) =>
                          handleChange(index, "jobOptionId", e.target.value)
                        }
                        placeholder="Select position"
                        options={jobOptions}
                      />
                    </div>
                    <div className="w-full sm:w-[200px]">
                      <Select
                        name={`years-${index}`}
                        value={position.yearsRange}
                        onChange={(e) =>
                          handleChange(index, "yearsRange", e.target.value)
                        }
                        placeholder="Years of experience"
                        options={yearsOptions}
                      />
                    </div>
                    {positions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDelete(index)}
                        className="text-primary-300 hover:text-primary-700"
                        aria-label="Remove position"
                      >
                        <XIcon size={32} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-base font-bold text-gray-900">
                  Briefly describe your previous work experience, up to 500
                  characters
                </p>
                <textarea
                  name="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value.slice(0, 500))}
                  rows={5}
                  className="w-full rounded-md border bg-white border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Write a short summary of your experience"
                />
                <p className="text-sm text-gray-500 text-right">
                  {summary.length}/500
                </p>
              </div>
            </form>
          </>
        )}
      </main>
      <footer className="bg-white border-t-2 border-primary-300 py-4 px-4 item-center">
        <div className="max-w-xl mx-auto flex justify-center font-karla gap-4">
          <button
            type="button"
            onClick={() => router.push("/onboarding/job-seeker/profession")}
            className="px-4 py-2 rounded bg-white hover:bg-primary-200 text-primary-500 font-bold"
          >
            <div className="flex items-center gap-2 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back
            </div>
          </button>
          <button
            type="submit"
            form="onbord-work-experience-form"
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
