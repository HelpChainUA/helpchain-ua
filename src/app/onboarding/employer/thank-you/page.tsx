"use client";

import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import ArrowRight from "@/icons/ArrowRight";
import SuccessIcon from "@/icons/SuccessIcon";

export default function EmployerThankYouPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-primary-50">
      <ProgressBar percent={100} stepInfo="Complete" />
      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl m-auto">
        <div className="mb-8">
          <SuccessIcon className="w-12 h-12 text-primary-500" />
        </div>

        <h1 className="text-3xl font-extrabold mb-4 font-montserrat text-gray-900 text-center">
          Thank you - your profile has been submitted!
        </h1>

        <div className="font-karla text-center text-gray-700 mb-10 space-y-3">
          <p className="text-lg">
            A member of our team will be in touch shortly to learn more about
            your needs and discuss the next steps.
          </p>
          <p>
            If necessary, you can update your profile in your personal account.
          </p>
          <p>
            Together, we're creating new opportunities for Ukrainian
            professionals and strengthening the UK workforce.
          </p>
        </div>

        <button
          onClick={() => router.push("/profiles")}
          className="w-auto rounded-md bg-primary-500 py-3 px-6 text-gray-25 hover:bg-primary-700 transition font-karla"
        >
          <div className="flex items-center gap-2 font-bold">
            View your profile
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>
      </main>
    </div>
  );
}
