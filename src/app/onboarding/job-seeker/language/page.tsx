"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ArrowRight from "@/icons/ArrowRight";
import ArrowLeft from "@/icons/ArrowLeft";
import LoadingSpinner from "@/icons/LoadingSpinner";
import ProgressBar from "@/components/ProgressBar";
import Select from "@/components/Select";
import { XIcon } from "lucide-react";

type LanguageSkill = {
  languageId: string;
  levelId: string;
};

export default function LanguagePage() {
  const router = useRouter();
  const [languageSkills, setLanguageSkills] = useState<LanguageSkill[]>([
    { languageId: "", levelId: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [languageOptions, setLanguageOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [levelOptions, setLevelOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [langRes, levelRes, skillsRes] = await Promise.all([
          fetch("/api/meta/languages"),
          fetch("/api/meta/levels"),
          fetch("/api/onboarding/job-seeker/language"),
        ]);

        const langData = await langRes.json();
        const levelData = await levelRes.json();
        const savedData = await skillsRes.json();

        setLanguageOptions(langData.options || []);
        setLevelOptions(levelData.options || []);

        const saved = savedData.languageSkills || [];
        if (saved.length > 0) {
          setLanguageSkills([
            ...saved.map((s: any) => ({
              languageId: String(s.languageId),
              levelId: String(s.levelId),
            })),
            { languageId: "", levelId: "" },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch language data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    index: number,
    field: keyof LanguageSkill,
    value: string,
  ) => {
    const updated = [...languageSkills];
    updated[index][field] = value;
    setLanguageSkills(updated);

    const isLast = index === updated.length - 1;
    const isFilled = updated[index].languageId && updated[index].levelId;
    const hasEmpty = updated.some((s) => !s.languageId || !s.levelId);

    if (isLast && isFilled && !hasEmpty) {
      setLanguageSkills([...updated, { languageId: "", levelId: "" }]);
    }
  };

  const handleDelete = (index: number) => {
    const updated = [...languageSkills];
    const removed = updated.splice(index, 1);
    setLanguageSkills(updated);

    const languageId = removed[0].languageId;
    if (languageId) {
      fetch("/api/onboarding/job-seeker/language", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ languageId: Number(languageId) }),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const valid = languageSkills.filter((s) => s.languageId && s.levelId);

    const res = await fetch("/api/onboarding/job-seeker/language", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ languageSkills: valid }),
    });

    if (res.ok) {
      router.push("/onboarding/job-seeker/salary");
    } else {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col bg-primary-50">
      <ProgressBar percent={82} stepInfo="Step 9 of 11" />

      <main className="flex-1 flex flex-col items-center justify-center px-4 mb-10">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 text-gray-600">
            <LoadingSpinner className="animate-spin" />
            <p className="font-karla text-sm">Loading your language data...</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 font-montserrat text-center">
              Languages you can work in
            </h1>
            <p className="font-karla mb-10 text-center max-w-lg">
              We’ll use this to match you with jobs requiring language skills.
            </p>
            {error && <p className="text-red-600">{error}</p>}

            <form
              onSubmit={handleSubmit}
              className="space-y-6 w-auto sm:w-xl font-karla"
            >
              {languageSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-row wrap gap-2 items-center"
                >
                  <Select
                    name={`language-${index}`}
                    value={skill.languageId}
                    onChange={(e) =>
                      handleChange(index, "languageId", e.target.value)
                    }
                    placeholder="Select language"
                    options={languageOptions}
                  />
                  <Select
                    name={`level-${index}`}
                    value={skill.levelId}
                    onChange={(e) =>
                      handleChange(index, "levelId", e.target.value)
                    }
                    placeholder="Select level"
                    options={levelOptions}
                  />
                  {languageSkills.length > 1 && (
                    <XIcon
                      size={45}
                      className="cursor-pointer hover:text-primary-700  text-primary-300"
                      onClick={() => handleDelete(index)}
                    />
                  )}
                </div>
              ))}
            </form>
          </>
        )}
      </main>

      <footer className="bg-white border-t-2 border-primary-300 py-4 px-4">
        <div className="max-w-xl mx-auto flex justify-center font-karla gap-4">
          <button
            type="button"
            onClick={() => router.push("/onboarding/job-seeker/upload-cv")}
            className="px-4 py-2 rounded bg-white hover:bg-primary-200 text-primary-500 font-bold"
          >
            <div className="flex items-center gap-2 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back
            </div>
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
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
