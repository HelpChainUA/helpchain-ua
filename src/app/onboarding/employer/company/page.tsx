"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import ArrowRight from "@/icons/ArrowRight";
import ArrowLeft from "@/icons/ArrowLeft";
import Input from "@/components/Input";
import Select from "@/components/Select";
import MultiSelect from "@/components/MultiSelect";

interface FormData {
  companyName: string;
  companyWebsite: string;
  companyLinkedIn: string;
  industryIds: string[];
  companySizeId: string;
  locationIds: string[];
}

export default function EmployerCompanyPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    companyName: "",
    companyWebsite: "",
    companyLinkedIn: "",
    industryIds: [],
    companySizeId: "",
    locationIds: [],
  });
  const [industries, setIndustries] = useState<
    { label: string; value: string }[]
  >([]);
  const [companySizes, setCompanySizes] = useState<
    { label: string; value: string }[]
  >([]);
  const [locations, setLocations] = useState<
    { label: string; value: string }[]
  >([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch existing company data
        const companyRes = await fetch("/api/onboarding/employer/company");
        if (companyRes.ok) {
          const data = await companyRes.json();
          if (data.company) {
            setForm({
              companyName: data.company.companyName || "",
              companyWebsite: data.company.companyWebsite || "",
              companyLinkedIn: data.company.companyLinkedIn || "",
              industryIds: data.company.industryIds || [],
              companySizeId: data.company.companySizeId || "",
              locationIds: data.company.locationIds || [],
            });
          }
        }

        // Fetch industries
        const industriesRes = await fetch(
          "/api/onboarding/employer/industries",
        );
        if (industriesRes.ok) {
          const data = await industriesRes.json();
          setIndustries(data.industries);
        }

        // Fetch company sizes
        const sizesRes = await fetch("/api/onboarding/employer/company-sizes");
        if (sizesRes.ok) {
          const data = await sizesRes.json();
          setCompanySizes(data.sizes);
        }

        // Fetch locations
        const locationsRes = await fetch("/api/onboarding/employer/locations");
        if (locationsRes.ok) {
          const data = await locationsRes.json();
          setLocations(data.locations);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMultiSelectChange = (name: string, values: string[]) => {
    setForm({ ...form, [name]: values });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.companyName.trim()) {
      setError("Company name is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/onboarding/employer/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/onboarding/employer/contact-person");
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
      <ProgressBar percent={66} stepInfo="Step 4 of 6" />
      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl m-auto pb-10">
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <h1 className="text-3xl font-extrabold mb-2 font-montserrat text-gray-900">
          Company Information
        </h1>
        <div className="font-karla text-xl mb-10 text-center text-gray-700">
          <p>
            Tell us a bit about your company so we can match you with the right
            candidates.
          </p>
        </div>

        <form
          id="employer-company-form"
          onSubmit={handleSubmit}
          className="w-full md:w-xl space-y-4 text-gray-300 font-medium font-karla mb-20"
        >
          <Input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="e.g. TechNova Ltd"
            label="Company Name  (required)"
            required
          />

          <Input
            name="companyWebsite"
            value={form.companyWebsite}
            onChange={handleChange}
            placeholder="e.g. https://technova.com"
            label="Company Website"
            type="url"
          />

          <Input
            name="companyLinkedIn"
            value={form.companyLinkedIn}
            onChange={handleChange}
            placeholder="e.g. https://linkedin.com/company/technova"
            label="Company LinkedIn"
            type="url"
          />

          <MultiSelect
            name="industryIds"
            label="Industry"
            values={form.industryIds}
            onChange={handleMultiSelectChange}
            options={industries}
            placeholder="Select industries"
          />

          <Select
            name="companySizeId"
            value={form.companySizeId}
            onChange={handleChange}
            label="Company Size"
            options={companySizes}
            placeholder="Select company size"
          />

          <MultiSelect
            name="locationIds"
            label="All office locations"
            values={form.locationIds}
            onChange={handleMultiSelectChange}
            options={locations}
            placeholder="Add one or more cities where your team is based"
          />
        </form>
      </main>

      <footer className="bg-white border-t-2 border-primary-300 py-4 px-4">
        <div className="max-w-xl mx-auto flex justify-center font-karla gap-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded bg-white hover:bg-primary-200 text-primary-500 font-bold"
          >
            <div className="flex items-center gap-2 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back
            </div>
          </button>
          <button
            type="submit"
            form="employer-company-form"
            className="w-auto rounded-md bg-primary-500 py-2 px-5 text-gray-25 hover:bg-primary-700 transition"
            disabled={loading}
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
