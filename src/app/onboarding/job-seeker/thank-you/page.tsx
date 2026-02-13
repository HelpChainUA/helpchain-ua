"use client";

import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import ArrowRight from "@/icons/ArrowRight";
import ArrowLeft from "@/icons/ArrowLeft";
import SuccessIcon from "@/icons/SuccessIcon";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col  bg-primary-50">
      <ProgressBar percent={100} stepInfo="Step 11 of 11" />
      <main className="flex-1 flex flex-col gap-8 items-center justify-center p-6 max-w-2xl m-auto">
        <SuccessIcon />
        <h1 className="text-4xl text-black font-bold mb-4 font-montserrat text-center">
          Thank you – your profile has been submitted!
        </h1>
        <p className="font-karla text-center">
          We’ve received your information. Our team will review your profile and
          contact you if any suitable opportunities match your skills.
        </p>
        <p className="font-karla text-center">
          In the meantime, you can follow us on{" "}
          <a
            href="https://www.facebook.com"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Facebook
          </a>{" "}
          or{" "}
          <a
            href="https://www.linkedin.com"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>{" "}
          to stay updated on jobs, training, and support for Ukrainians in the
          UK.
        </p>
      </main>

      <footer className="bg-white border-t-2 border-primary-300 py-4 px-4 item-center">
        <div className="max-w-xl mx-auto flex justify-center font-karla gap-4">
          <button
            type="button"
            onClick={() => router.push("/onboarding/job-seeker/salary")}
            className="px-4 py-2 rounded bg-white hover:bg-primary-200 text-primary-500 font-bold"
          >
            <div className="flex items-center gap-2 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back
            </div>
          </button>
          <button
            type="submit"
            form="onbord-upload-cv-form"
            className="w-auto rounded-md bg-primary-500 py-2 px-5 text-gray-25 hover:bg-primary-700 transition"
            onClick={() => router.push("/")}
          >
            <div className="flex items-center gap-2 font-bold">
              Continue
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}
