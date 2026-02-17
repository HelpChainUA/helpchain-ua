"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ProgressBar from "@/components/ProgressBar";
import ArrowRight from "@/icons/ArrowRight";
import ArrowLeft from "@/icons/ArrowLeft";
import UploadCloudIcon from "@/icons/UploadCloudIcon";
import LoadingSpinner from "@/icons/LoadingSpinner";

export default function UploadCVPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { update } = useSession();

  function getDisplayFileName(fileUrl: string): string {
    const parts = fileUrl.split("-");
    if (parts.length < 2) return fileUrl;
    return "..." + parts.slice(1).join("-");
  }

  useEffect(() => {
    const fetchCV = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/user/cv");
        const data = await res.json();
        if (data.fileUrl) {
          setUploadedFileName(data.fileUrl);
        }
      } catch (err) {
        console.error("Error fetching CV", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCV();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (
      selected &&
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(selected.type)
    ) {
      setError("Unsupported file type. Please upload a PDF or DOC.");
      return;
    }
    setError("");
    setUploadedFileName(null);
    setFile(selected || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file or click 'Skip for now'.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    setLoading(true);
    try {
      const res = await fetch("/api/onboarding/job-seeker/upload-cv", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      await update();
      router.push("/onboarding/job-seeker/language");
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.push("/onboarding/job-seeker/language");
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col  bg-primary-50">
      <ProgressBar percent={73} stepInfo="Step 8 of 11" />
      <main className="flex-1 flex flex-col gap-4 items-center justify-center px-6">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 text-gray-600">
            <LoadingSpinner className="animate-spin" />
            <p className="font-karla text-sm">Loading your CV info...</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl text-black font-bold mb-4 font-montserrat text-center">
              Upload your CV
            </h1>
            <p className="font-karla pb-8 text-center">
              Attach your most recent CV to help us match you with jobs.
            </p>
            <form
              id="onbord-upload-cv-form"
              onSubmit={handleSubmit}
              className="flex flex-col justify-center item-center w-full max-w-xl bg-white p-2 border-2 border-dashed border-gray-300 rounded-lg space-y-6"
            >
              {error && (
                <p className="text-red-600 bg-red-100 p-2 rounded text-sm text-center">
                  {error}
                </p>
              )}
              <div className="w-full flex justify-center m-0">
                <UploadCloudIcon className="w-15 h-15" />
              </div>

              {/* File input */}
              <label
                htmlFor="cv-upload"
                className="w-full p-2 text-center cursor-pointer hover:border-blue-400"
              >
                <input
                  id="cv-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {file ? (
                  <span className="text-primary-500 font-medium font-montserrat">
                    {file.name}
                  </span>
                ) : uploadedFileName ? (
                  <span className="text-primary-500 font-medium font-montserrat">
                    {getDisplayFileName(uploadedFileName)}
                    <div className="text-gray-600 text-center font-montserrat mt-5">
                      <p className="text-primary-600 font-semibold">
                        Click to upload another file
                      </p>
                      <p className="text-sm text-gray-600">
                        Supported formats: PDF, DOC
                      </p>
                    </div>
                  </span>
                ) : (
                  <div className="text-gray-600 text-center font-montserrat">
                    <p className="text-primary-600 font-semibold">
                      Click to upload
                    </p>
                    <p className="text-sm text-gray-600">
                      Supported formats: PDF, DOC
                    </p>
                  </div>
                )}
              </label>
            </form>
            <div className="text-right">
              <button
                type="button"
                onClick={handleSkip}
                className="text-base text-primary-500 font-bold hover:underline font-karla"
              >
                Skip for now
              </button>
            </div>
          </>
        )}
      </main>
      <footer className="bg-white border-t-2 border-primary-300 py-4 px-4 item-center">
        <div className="max-w-xl mx-auto flex justify-center font-karla gap-4">
          <button
            type="button"
            onClick={() =>
              router.push("/onboarding/job-seeker/work-experience")
            }
            className="px-4 py-2 rounded bg-white hover:bg-primary-200 text-primary-500 font-bold"
          >
            <div className="flex items-center gap-2 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back
            </div>
          </button>
          {uploadedFileName ? (
            <button
              type="button"
              className="w-auto rounded-md bg-primary-500 py-2 px-5 text-gray-25 hover:bg-primary-700 transition"
              onClick={handleSkip}
            >
              <div className="flex items-center gap-2 font-bold">
                Continue
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          ) : (
            <button
              type="submit"
              form="onbord-upload-cv-form"
              className="w-auto rounded-md bg-primary-500 py-2 px-5 text-gray-25 hover:bg-primary-700 transition"
              disabled={loading || isLoading}
            >
              {loading ? (
                "Uploading..."
              ) : (
                <div className="flex items-center gap-2 font-bold">
                  Upload and continue
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
