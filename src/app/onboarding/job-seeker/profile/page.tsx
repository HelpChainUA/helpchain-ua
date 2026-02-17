"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import ArrowRight from "@/icons/ArrowRight";
import ArrowLeft from "@/icons/ArrowLeft";
import LoadingSpinner from "@/icons/LoadingSpinner";
import TooltipIcon from "@/components/TooltipIcon";
import Input from "@/components/Input";
import Select from "@/components/Select";

const ageRangeOptions = [
  { label: "18-24", value: "AGE_18_24" },
  { label: "25-29", value: "AGE_25_29" },
  { label: "30-34", value: "AGE_30_34" },
  { label: "35-39", value: "AGE_35_39" },
  { label: "40-44", value: "AGE_40_44" },
  { label: "45-54", value: "AGE_45_54" },
  { label: "55+", value: "AGE_55_PLUS" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    ageRange: "",
    gender: "",
  });
  const [locationId, setLocationId] = useState("");
  const [locationOptions, setLocationOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [profileRes, locationsRes] = await Promise.all([
          fetch("/api/onboarding/job-seeker/profile"),
          fetch("/api/meta/locations"),
        ]);

        if (locationsRes.ok) {
          const locationsData = await locationsRes.json();
          setLocationOptions(locationsData.options || []);
        }

        if (profileRes.ok) {
          const data = await profileRes.json();
          setForm({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            ageRange: data.ageRange || "",
            gender: data.gender || "",
          });
          setLocationId(data.locationId || "");
        }
      } catch (err) {
        console.error("Failed to fetch profile data", err);
        setError("Failed to load profile data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/onboarding/job-seeker/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        locationId,
      }),
    });

    if (res.ok) {
      router.push("/onboarding/job-seeker/job-location");
      setLoading(false);
    } else {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col bg-primary-50 ">
      <ProgressBar percent={36} stepInfo="Step 4 of 11" />
      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl m-auto pb-10">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 text-gray-600">
            <LoadingSpinner className="animate-spin" />
            <p className="font-karla text-sm">Loading your profile data...</p>
          </div>
        ) : (
          <>
            {error && <p className="text-red-600">{error}</p>}
            <h1 className="text-2xl font-bold mb-4 font-montserrat">
              Tell us about yourself
            </h1>
            <div className="font-karla mb-10 text-center">
              <p>This helps us connect you with the right opportunities.</p>
            </div>

            <form
              id="onbord-profile-form"
              onSubmit={handleSubmit}
              className="w-full md:w-xl space-y-4 text-gray-300 font-semibold font-karla mb-20"
            >
              <Input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                label="First name"
              />

              <Input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                label="Last name"
              />

              <Select
                name="locationId"
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                label="Location"
                placeholder="Select location"
                options={locationOptions}
              />

              <Select
                name="ageRange"
                value={form.ageRange}
                onChange={handleChange}
                label="Age range"
                labelTooltip={
                  <TooltipIcon
                    message="Used to recommend opportunities and training relevant for you."
                    position="right"
                  />
                }
                placeholder="Select age range"
                options={ageRangeOptions}
              />

              <Select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                label="Gender"
                labelTooltip={
                  <TooltipIcon
                    message="Used to match you with the right opportunities. Private info."
                    position="right"
                  />
                }
                placeholder="Select gender"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Non-binary", value: "non_binary" },
                  { label: "Trans man", value: "trans_man" },
                  { label: "Trans woman", value: "trans_woman" },
                  { label: "Intersex", value: "intersex" },
                  { label: "Other", value: "other" },
                  { label: "Prefer not to say", value: "prefer_not_to_say" },
                ]}
              />
            </form>
          </>
        )}
      </main>

      <footer className="bg-white border-t-2 border-primary-300 py-4 px-4">
        <div className="max-w-xl mx-auto flex justify-center font-karla gap-4">
          <button
            type="submit"
            form="onbord-profile-form"
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
