"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import validator from "validator";
import { EyeOn, EyeOff, CheckMark, ArrowRight, ArrowLeft } from "@/icons/index";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import { isPasswordValid, validatePassword } from "@/utils/validatePassword";
import TextInput from "@/components/ui/TextInput/TextInput";
import ProgressBar from "@/components/ProgressBar";
import OnboardingFooter from "@/components/OnboardingFooter";
import MainButton from "@/components/ui/MainButton/MainButton";
import LinkButton from "@/components/ui/LinkButton/LinkButton";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false); // Tracks if the field is currently focused (on focus)
  const [emailTouched, setEmailTouched] = useState(false); // Tracks if the user has interacted with the field (on blur)

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false); // Tracks if the user has interacted with the field (on blur)
  const [passwordFocused, setPasswordFocused] = useState(false); // Tracks if the field is currently focused (on focus)

  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);
  const [passwordConfirmedTouched, setPasswordConfirmedTouched] =
    useState(false);
  const [passwordConfirmedFocused, setPasswordConfirmedFocused] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordError = validatePassword(password);

  useEffect(() => {
    // Clear error when password becomes valid and matches
    if (!passwordError && password && password === passwordConfirmed) {
      setError("");
    }
  }, [password, passwordConfirmed, passwordError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setEmailTouched(true);
    setPasswordTouched(true);
    setPasswordConfirmedTouched(true);
    setError("");

    if (!email || !password || !passwordConfirmed) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (!validator.isEmail(email) || !isPasswordValid(password)) {
      return;
    }

    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    if (passwordConfirmed !== password) {
      return;
    }

    // Get selected role from localStorage
    const selectedRole = localStorage.getItem("selectedRole") || "JOB_SEEKER";

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role: selectedRole }),
    });

    if (res.status === 201) {
      const data = await res.json();
      const userId = data.userId;
      router.push(`/email-verification?userId=${userId}`);
    } else {
      const data = await res.json();
      setError(data.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowPasswordConfirmed = () => {
    setShowPasswordConfirmed((prev) => !prev);
  };

  const formValid =
    email &&
    validator.isEmail(email) &&
    password &&
    isPasswordValid(password) &&
    passwordConfirmed &&
    password === passwordConfirmed;

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col bg-primary-50">
      <ProgressBar percent={10} stepInfo="Step 1 of 10" />
      <main className="flex-1 flex flex-col py-20 px-4 items-center justify-center">
        <div className="flex flex-col gap-4 pb-12">
          <h1 className="text-2xl font-extrabold font-montserrat text-center tracking-[0.1em]">
            Create Your Account
          </h1>
          <p className="font-karla font-normal text-center text-base text-gray-700">
            Use your email or sign up with Google or Facebook.
          </p>
        </div>

        <form
          id="signup-form"
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-xl"
        >
          {error && (
            <p className="rounded-md bg-red-100 p-2 text-center text-error-500">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-4">
            {/* Email input field*/}
            <TextInput
              label="Email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => {
                setEmailFocused(false);
                setEmailTouched(true);
              }}
              touched={emailTouched} // tells TextInput whether the field has been touched
              error={
                emailTouched && !email && !emailFocused
                  ? "Required field." // shows error only when blurred and empty
                  : emailTouched &&
                      email &&
                      !validator.isEmail(email) &&
                      !emailFocused
                    ? "Invalid email format."
                    : undefined
              }
            />

            {/* Password input field*/}
            <TextInput
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => {
                setPasswordFocused(false);
                setPasswordTouched(true);
              }}
              touched={passwordTouched}
              error={
                passwordTouched && !password && !passwordFocused
                  ? "Required field."
                  : passwordTouched && passwordError && !passwordFocused
                    ? passwordError
                    : undefined
              }
              helperText="Enter a secure password: at least 8 characters, including upper-case and lower-case letters, numbers and special characters."
              showIconButton
              icon={showPassword ? <EyeOn /> : <EyeOff />}
              onIconButtonClick={handleShowPassword}
            />

            {/* Password confirmation input field*/}
            <TextInput
              label="Confirm Password"
              type={showPasswordConfirmed ? "text" : "password"}
              value={passwordConfirmed}
              required
              onChange={(e) => setPasswordConfirmed(e.target.value)}
              onFocus={() => setPasswordConfirmedFocused(true)}
              onBlur={() => {
                setPasswordConfirmedFocused(false);
                setPasswordConfirmedTouched(true);
              }}
              touched={passwordConfirmedTouched}
              error={
                passwordConfirmedTouched &&
                !passwordConfirmed &&
                !passwordConfirmedFocused
                  ? "Required field."
                  : passwordConfirmedTouched &&
                      passwordConfirmed &&
                      !passwordConfirmedFocused &&
                      password !== passwordConfirmed
                    ? "Passwords do not match."
                    : undefined
              }
              helperText="Make sure it matches your password above."
              showIconButton
              icon={showPasswordConfirmed ? <EyeOn /> : <EyeOff />}
              onIconButtonClick={handleShowPasswordConfirmed}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <label className="relative">
                <input
                  type="checkbox"
                  className="peer cursor-pointer w-5 h-5 bg-white rounded-md border border-gray-300 appearance-none focus:ring-2 focus:ring-primary-300 checked:bg-primary-500"
                />
                <span className="pointer-events-none absolute top-1 left-1 hidden peer-checked:block">
                  <CheckMark />
                </span>
              </label>

              <label className="font-karla text-sm font-normal text-gray-500">
                {`I'd like to receive emails relating to job search and updates
              about new features.`}
              </label>
            </div>

            <div className="flex justify-center font-karla text-sm font-normal text-gray-500">
              By signing up you agree to our Privacy Policy and Terms &
              Conditions for Candidates.
            </div>
            <div className="flex justify-center font-karla text-base font-normal gray-900">
              OR
            </div>
          </div>

          <SocialAuthButtons />
        </form>
      </main>

      <OnboardingFooter>
        <LinkButton
          size="md"
          variant="left"
          type="button"
          state="normal"
          iconLeft={<ArrowLeft className="w-6 h-6" />}
          onClick={() => router.back()}
        >
          Back
        </LinkButton>
        <MainButton
          variant="primary"
          state={loading ? "loading" : formValid ? "normal" : "disabled"}
          size="lg"
          type="submit"
          form="signup-form"
          aria-label="main button"
        >
          {loading ? "Sending link" : "Continue"}
          <ArrowRight className="w-6 h-6" />
        </MainButton>
      </OnboardingFooter>
    </div>
  );
}
