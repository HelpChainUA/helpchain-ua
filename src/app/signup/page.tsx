"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { eyeOn } from "@/icons/EyeOn";
import { eyeOff } from "@/icons/EyeOff";
import { checkmark } from "@/icons/CheckMark";
import SocialAuthButtons from "@/components/SocialAuthButtons";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // console.log("Submitting registration:", { email, password });

    if (passwordConfirmed !== password) {
      setError("Passwords don't match.");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 201) {
      router.push("/signin");
    } else {
      const data = await res.json();
      setError(data.message || "Something went wrong");
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowPasswordConfirmed = () => {
    setShowPasswordConfirmed((prev) => !prev);
  };

  return (
    <div className="flex flex-col py-20 px-4 items-center justify-center bg-primary-50">
      <div className="flex flex-col gap-4 pb-12">
        <h1 className="text-2xl font-extrabold font-montserrat text-center tracking-[0.1em]">
          Create Your Account
        </h1>
        <p className="font-karla font-normal text-center text-base text-gray-700 ">
          Use your email or sign up with Google or Facebook.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[624px]">
        {error && (
          <p className="rounded-md bg-red-100 p-2 text-center text-red-700">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-karla font-normal text-base text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-3 focus:ring-primary-100 focus:shadow-input focus:border-primary-300"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-karla font-normal text-base text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg font-karla font-medium text-base text-gray-500 border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-3 focus:ring-primary-100 focus:shadow-input focus:border-primary-300"
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? eyeOn : eyeOff}
              </button>
            </div>
            <p className="font-karla text-sm text-gray-500">
              Enter at least 8 characters
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-karla font-normal text-base text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPasswordConfirmed ? "text" : "password"}
                required
                value={passwordConfirmed}
                onChange={(e) => setPasswordConfirmed(e.target.value)}
                className="w-full rounded-lg font-karla font-medium text-base text-gray-500 border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-3 focus:ring-primary-100 focus:shadow-input focus:border-primary-300"
              />
              <button
                type="button"
                onClick={handleShowPasswordConfirmed}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPasswordConfirmed ? eyeOn : eyeOff}
              </button>
            </div>
            <p className="font-karla text-sm text-gray-500">
              Make sure it matches your password above
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <label className="relative">
              <input
                type="checkbox"
                className="peer cursor-pointer w-5 h-5 bg-white rounded-md border border-gray-300 appearance-none focus:ring-2 focus:ring-primary-300 checked:bg-primary-500"
              />
              <span className="pointer-events-none absolute top-1 left-1 hidden peer-checked:block">
                {checkmark}
              </span>
            </label>

            <label className="font-karla text-sm font-normal text-gray-500">
              {`I'd like to receive emails relating to job search and updates
              about new features.`}
            </label>
          </div>

          <div className="flex justify-center font-karla text-sm font-normal text-gray-500">
            By signing up you agree to our Privacy Policy and Terms & Conditions
            for Candidates.
          </div>
          <div className="flex justify-center font-karla text-base font-normal gray-900">
            OR
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-[46px] rounded-md bg-primary-500 py-2.5 px-3 font-karla font-bold text-white transition hover:bg-primary-700"
        >
          Create Account
        </button>

        <SocialAuthButtons />

        <p className="pt-8 text-center font-karla text-base text-gray-700">
          {"Already have an account?"}{" "}
          <Link
            href="/signin"
            className="font-bold text-brand-primary hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
