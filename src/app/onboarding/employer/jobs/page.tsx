"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import ArrowRight from "@/icons/ArrowRight";
import ArrowLeft from "@/icons/ArrowLeft";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Checkbox from "@/components/Checkbox";

interface JobForm {
  title: string;
  types: string[]; // PAID_JOB, INTERNSHIP, VOLUNTEERING
  locationId: string;
  housingAssistance: string; // YES, NO, POSSIBLE
  workTypeId: string;
}

export default function EmployerJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobForm[]>([
    {
      title: "",
      types: [],
      locationId: "",
      housingAssistance: "",
      workTypeId: "",
    },
  ]);
  const [locations, setLocations] = useState<
    { label: string; value: string }[]
  >([]);
  const [workTypes, setWorkTypes] = useState<
    { label: string; value: string }[]
  >([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch locations and work types
  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsRes = await fetch("/api/onboarding/employer/locations");
        if (locationsRes.ok) {
          const data = await locationsRes.json();
          setLocations(data.locations);
        }

        const workTypesRes = await fetch("/api/onboarding/employer/work-types");
        if (workTypesRes.ok) {
          const data = await workTypesRes.json();
          setWorkTypes(data.workTypes);
        }

        // Fetch existing jobs
        const jobsRes = await fetch("/api/onboarding/employer/jobs");
        if (jobsRes.ok) {
          const data = await jobsRes.json();
          if (data.jobs && data.jobs.length > 0) {
            setJobs(data.jobs);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (index: number, field: string, value: string) => {
    const updated = [...jobs];
    updated[index] = { ...updated[index], [field]: value };
    setJobs(updated);
  };

  const handleTypeToggle = (index: number, type: string) => {
    const updated = [...jobs];
    const types = updated[index].types;
    if (types.includes(type)) {
      updated[index].types = types.filter((t) => t !== type);
    } else {
      updated[index].types = [...types, type];
    }
    setJobs(updated);
  };

  const addJob = () => {
    setJobs([
      ...jobs,
      {
        title: "",
        types: [],
        locationId: "",
        housingAssistance: "",
        workTypeId: "",
      },
    ]);
  };

  const removeJob = (index: number) => {
    if (jobs.length > 1) {
      setJobs(jobs.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      if (!job.title.trim()) {
        setError(`Job ${i + 1}: Title is required`);
        return;
      }
      if (job.types.length === 0) {
        setError(`Job ${i + 1}: Select at least one type`);
        return;
      }
      if (!job.housingAssistance) {
        setError(`Job ${i + 1}: Housing assistance answer is required`);
        return;
      }
      if (!job.workTypeId) {
        setError(`Job ${i + 1}: Work type is required`);
        return;
      }
    }

    setLoading(true);

    try {
      const res = await fetch("/api/onboarding/employer/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobs }),
      });

      if (res.ok) {
        router.push("/onboarding/employer/thank-you");
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col bg-primary-50">
      <ProgressBar percent={100} stepInfo="Step 6 of 6" />
      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl m-auto pb-10">
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <h1 className="text-2xl font-bold mb-2 font-montserrat text-gray-900">
          What do you offer?
        </h1>
        <div className="font-karla mb-10 text-center text-gray-700">
          <p>
            Tell us what opportunities you offer candidates. This helps us find
            the right match for you.
          </p>
        </div>

        <form
          id="employer-jobs-form"
          onSubmit={handleSubmit}
          className="w-full md:w-xl space-y-8 text-gray-300 font-semibold font-karla mb-20"
        >
          {jobs.map((job, index) => (
            <div
              key={index}
              className="border-2 border-gray-300 rounded-lg p-6 bg-white"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Job {index + 1}
                </h3>
                {jobs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeJob(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-bold"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <Input
                  name={`title-${index}`}
                  value={job.title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  placeholder="e.g. Software Developer"
                  label="Position Title"
                  required
                />

                <div>
                  <label className="text-base font-bold text-gray-900 mb-2 block">
                    What kind of opportunity it is{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <Checkbox
                      label="Paid job"
                      checked={job.types.includes("PAID_JOB")}
                      onChange={() => handleTypeToggle(index, "PAID_JOB")}
                    />
                    <Checkbox
                      label="Internships"
                      checked={job.types.includes("INTERNSHIP")}
                      onChange={() => handleTypeToggle(index, "INTERNSHIP")}
                    />
                    <Checkbox
                      label="Volunteering"
                      checked={job.types.includes("VOLUNTEERING")}
                      onChange={() => handleTypeToggle(index, "VOLUNTEERING")}
                    />
                  </div>
                </div>

                <Select
                  name={`location-${index}`}
                  value={job.locationId}
                  onChange={(e) =>
                    handleInputChange(index, "locationId", e.target.value)
                  }
                  label="Location"
                  options={locations}
                  placeholder="Select location"
                />

                <div>
                  <label className="text-base font-bold text-gray-900 mb-2 block">
                    Do you provide housing/relocation assistance for this
                    position? <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <Checkbox
                      type="round"
                      name={`housing-${index}`}
                      label="Yes"
                      checked={job.housingAssistance === "YES"}
                      onChange={() =>
                        handleInputChange(index, "housingAssistance", "YES")
                      }
                    />
                    <Checkbox
                      type="round"
                      name={`housing-${index}`}
                      label="No"
                      checked={job.housingAssistance === "NO"}
                      onChange={() =>
                        handleInputChange(index, "housingAssistance", "NO")
                      }
                    />
                    <Checkbox
                      type="round"
                      name={`housing-${index}`}
                      label="Possible"
                      checked={job.housingAssistance === "POSSIBLE"}
                      onChange={() =>
                        handleInputChange(
                          index,
                          "housingAssistance",
                          "POSSIBLE",
                        )
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="text-base font-bold text-gray-900 mb-2 block">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {workTypes.map((workType) => (
                      <Checkbox
                        key={workType.value}
                        type="round"
                        name={`workType-${index}`}
                        label={workType.label}
                        checked={job.workTypeId === workType.value}
                        onChange={() =>
                          handleInputChange(index, "workTypeId", workType.value)
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addJob}
            className="w-full border-2 border-dashed border-primary-500 text-primary-500 py-3 rounded-lg hover:bg-primary-50 font-bold transition"
          >
            + Add another job
          </button>
        </form>
      </main>

      <footer className="bg-white border-t-2 border-primary-300 py-4 px-4">
        <div className="max-w-xl mx-auto flex justify-center font-karla gap-4">
          <button
            type="button"
            onClick={() => router.push("/onboarding/employer/contact-person")}
            className="px-4 py-2 rounded bg-white hover:bg-primary-200 text-primary-500 font-bold"
          >
            <div className="flex items-center gap-2 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back
            </div>
          </button>
          <button
            type="submit"
            form="employer-jobs-form"
            className="w-auto rounded-md bg-primary-500 py-2 px-5 text-gray-25 hover:bg-primary-700 transition"
            disabled={loading}
          >
            {loading ? (
              "Submitting..."
            ) : (
              <div className="flex items-center gap-2 font-bold">
                Submit
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
