"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import ArrowRight from "@/icons/ArrowRight";
import ArrowLeft from "@/icons/ArrowLeft";
import Input from "@/components/Input";

export default function EmployerContactPersonPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    phoneNumber: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch profile data
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/onboarding/employer/contact-person");
      if (res.ok) {
        const data = await res.json();
        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          jobTitle: data.jobTitle || "",
          phoneNumber: data.phoneNumber || "",
          email: data.email || "",
        });
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError("Full name is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/onboarding/employer/contact-person", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/onboarding/employer/jobs");
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
      <ProgressBar percent={83} stepInfo="Step 5 of 6" />
      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl m-auto pb-10">
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <h1 className="text-3xl font-bold mb-2 font-montserrat text-gray-900">
          Contact Person
        </h1>
        <div className="font-karla mb-10 text-xl text-center text-gray-700">
          <p>
            This will be our main point of contact for this company profile.
          </p>
        </div>

        <form
          id="employer-contact-form"
          onSubmit={handleSubmit}
          className="w-full md:w-xl space-y-4 text-gray-300 font-semibold font-karla mb-20"
        >
          <Input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="e.g. Sarah"
            label="Full Name"
            required
          />

          <Input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="e.g. Jenkins"
            label="Last Name"
            required
          />

          <Input
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
            placeholder="e.g. HR Manager"
            label="Job Title or Role (optional)"
          />

          <div>
            <Input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="e.g. +44 7911 123456"
              label="Phone Number (optional)"
              type="tel"
            />
            <p className="text-sm text-gray-500 mt-1 font-normal">
              We'll only use it if we can't reach you by email
            </p>
          </div>

          <div>
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              label="E-mail (which was used during registration)"
              type="email"
              disabled
            />
          </div>
        </form>
      </main>

      <footer className="bg-white border-t-2 border-primary-300 py-4 px-4">
        <div className="max-w-xl mx-auto flex justify-center font-karla gap-4">
          <button
            type="button"
            onClick={() => router.push("/onboarding/employer/company")}
            className="px-4 py-2 rounded bg-white hover:bg-primary-200 text-primary-500 font-bold"
          >
            <div className="flex items-center gap-2 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back
            </div>
          </button>
          <button
            type="submit"
            form="employer-contact-form"
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
