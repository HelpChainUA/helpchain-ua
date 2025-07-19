"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { eyeOn } from "@/icons/EyeOn";
import { eyeOff } from "@/icons/EyeOff";
import SocialAuthButtons from "@/components/SocialAuthButtons";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");

    if (!email || !password) return;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log("SignIn response:", res);

    if (res?.ok) {
      router.push("/redirect-after-auth"); // use page here instead of route
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col min-h-screen py-20 px-4 items-center justify-start bg-primary-50">
      <h1 className="mb-12 text-2xl font-extrabold font-montserrat text-center tracking-[0.1em]">
        Sign in to your account
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-[624px] sm:w-4/5 md:w-3/5 lg:w-1/2"
      >
        {error && (
          <p className="rounded-md bg-red-100 p-2 text-center text-red-700">
            {error}
          </p>
        )}

        <div>
          <label className="font-karla font-normal text-base text-gray-700">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full rounded-lg border px-4 py-3 bg-white focus:outline-none focus:ring-3
              ${
                (submitted && !email) || error
                  ? "border-error-500 focus:ring-error-100 focus:shadow-error-sm"
                  : "border-gray-300 focus:ring-primary-100 focus:shadow-input focus:border-primary-300"
              }
            `}
          />
          {submitted && !email && (
            <p className="mt-1 font-karla text-sm text-error-500">
              Email is required.
            </p>
          )}
        </div>

        <div>
          <label className="font-karla font-normal text-base text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 bg-white focus:outline-none focus:ring-3
              ${
                (submitted && !password) || error
                  ? "border-error-500 focus:ring-error-100 focus:shadow-error-sm"
                  : "border-gray-300 focus:ring-primary-100 focus:shadow-input focus:border-primary-300"
              }
            `}
            />
            {submitted && !password && (
              <p className="mt-1 font-karla text-sm text-error-500">
                Password is required.
              </p>
            )}
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-4 top-4 text-gray-500"
            >
              {showPassword ? eyeOn : eyeOff}
            </button>
          </div>
        </div>
        <div className="cursor-pointer py-4 text-center font-karla text-base font-bold text-brand-primary hover:underline">
          <Link href="/forgot-password">Forgot your password?</Link>
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full h-[46px] rounded-md bg-primary-500 py-2.5 px-3 font-karla font-bold text-white transition hover:bg-primary-700"
        >
          Sign In
        </button>

        <div className="text-center text-sm text-gray-600">OR</div>

        <div className="space-y-2">
          <SocialAuthButtons />
        </div>

        <p className="text-center text-sm text-gray-600">
          {"Don't have an account? "}
          <Link
            href="/signup"
            className="cursor-pointer font-bold text-brand-primary hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
