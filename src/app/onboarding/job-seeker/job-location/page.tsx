"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import ArrowRight from "@/icons/ArrowRight";
import ArrowLeft from "@/icons/ArrowLeft";
import LoadingSpinner from "@/icons/LoadingSpinner";
import MultiSelect from "@/components/MultiSelect";
import Checkbox from "@/components/Checkbox";

const housingOptions = [
  { label: "No", value: "NO" },
  { label: "Yes, job with housing only", value: "JOB_WITH_HOUSING_ONLY" },
  { label: "I need help in moving", value: "NEED_HELP_MOVING" },
  { label: "I am considering different options", value: "CONSIDERING_OPTIONS" },
];

export default function JobLocationPage() {
  const router = useRouter();
  const [locationOptions, setLocationOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [jobSearchLocationIds, setJobSearchLocationIds] = useState<string[]>(
    [],
  );
  const [willingToRelocate, setWillingToRelocate] = useState<"yes" | "no" | "">(
    "",
  );
  const [housingAssistancePreference, setHousingAssistancePreference] =
    useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [locationsRes, jobLocationRes] = await Promise.all([
          fetch("/api/meta/locations"),
          fetch("/api/onboarding/job-seeker/job-location"),
        ]);

        if (locationsRes.ok) {
          const locationsData = await locationsRes.json();
          setLocationOptions(locationsData.options || []);
        }

        if (jobLocationRes.ok) {
          const data = await jobLocationRes.json();
          setJobSearchLocationIds(data.jobSearchLocationIds || []);
          if (data.willingToRelocate === true) {
            setWillingToRelocate("yes");
          } else if (data.willingToRelocate === false) {
            setWillingToRelocate("no");
          } else {
            setWillingToRelocate("");
          }
          setHousingAssistancePreference(
            data.housingAssistancePreference || "",
          );
        }
      } catch (err) {
        console.error("Failed to fetch job location data", err);
        setError("Failed to load job location data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/onboarding/job-seeker/job-location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobSearchLocationIds,
        willingToRelocate,
        housingAssistancePreference,
      }),
    });

    if (res.ok) {
      router.push("/onboarding/job-seeker/profession");
      setLoading(false);
    } else {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col bg-primary-50">
      <ProgressBar percent={45} stepInfo="Step 5 of 11" />
      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl m-auto pb-10">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 text-gray-600">
            <LoadingSpinner className="animate-spin" />
            <p className="font-karla text-sm">Loading your location data...</p>
          </div>
        ) : (
          <>
            {error && <p className="text-red-600">{error}</p>}
            <h1 className="text-2xl font-bold mb-4 font-montserrat">
              Where do you want to find a job?
            </h1>
            <div className="font-karla mb-10 text-center">
              <p>
                This helps us match you with jobs and support services nearby.
              </p>
            </div>

            <form
              id="onboard-job-location-form"
              onSubmit={handleSubmit}
              className="w-full md:w-xl space-y-6 text-gray-300 font-semibold font-karla mb-20"
            >
              <div className="space-y-2">
                <p className="text-base font-bold text-gray-900">
                  The location where you want to find a job
                </p>
                <MultiSelect
                  name="jobSearchLocations"
                  values={jobSearchLocationIds}
                  onChange={(_, values) => setJobSearchLocationIds(values)}
                  options={locationOptions}
                  placeholder="Choose one or more areas from the list"
                />
              </div>

              <div className="space-y-2">
                <p className="text-base font-bold text-gray-900">
                  Willing to relocate?
                </p>
                <div className="flex gap-16">
                  <Checkbox
                    type="round"
                    name="relocate"
                    value="yes"
                    label="Yes"
                    checked={willingToRelocate === "yes"}
                    onChange={() => setWillingToRelocate("yes")}
                  />
                  <Checkbox
                    type="round"
                    name="relocate"
                    value="no"
                    label="No"
                    checked={willingToRelocate === "no"}
                    onChange={() => setWillingToRelocate("no")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-base font-bold text-gray-900">
                  Do you need help with housing/moving?
                </p>
                <div className="flex gap-4 flex-wrap">
                  {housingOptions.map((option) => (
                    <div key={option.value} className="w-70">
                      <Checkbox
                        key={option.value}
                        type="square"
                        name="housing"
                        value={option.value}
                        label={option.label}
                        checked={housingAssistancePreference === option.value}
                        onChange={() =>
                          setHousingAssistancePreference(option.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </>
        )}
      </main>

      <footer className="bg-white border-t-2 border-primary-300 py-4 px-4">
        <div className="max-w-xl mx-auto flex justify-center font-karla gap-4">
          <button
            type="button"
            onClick={() => router.push("/onboarding/job-seeker/profile")}
            className="px-4 py-2 rounded bg-white hover:bg-primary-200 text-primary-500 font-bold"
          >
            <div className="flex items-center gap-2 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back
            </div>
          </button>
          <button
            type="submit"
            form="onboard-job-location-form"
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
