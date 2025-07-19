"use client";

import { dropDownIcon } from "@/icons/DropDownIcon";
import { ukFlag, uaFlag } from "../icons/Flags";
import DownArrowIcon from "@/icons/DownArrow";
import UpArrowIcon from "@/icons/UpArrow";
import { checkIcon2 } from "@/icons/CheckIcon2";
import { crossCloseIcon } from "@/icons/Cross";
import { hamburger } from "@/icons/Hamburger";
import { logoDark } from "@/icons/LogoDark";
import { logoLight } from "@/icons/LogoLight";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node)
      ) {
        setShowMobileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup in case component unmounts
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSelectLang = (lang: string) => {
    setSelectedLang(lang);
    setShowDropdown(false);
  };

  const handleUserNameClick = () => {
    router.push("/profiles/job-seeker");
  };

  return (
    <header className="bg-white lg:bg-primary-600">
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-25 bg-[#191B2366] lg:hidden">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 z-50 p-2"
          >
            {crossCloseIcon}
          </button>
          <div className="flex flex-col items-center pt-[24px] gap-8 absolute top-0 left-0 min-w-[300px] w-[60%] h-full z-30 bg-white sm:w-[30%] md:w-[40%]">
            <div className="flex flex-col items-center">
              <ul className="flex flex-col items-center font-karla font-bold text-primary-500">
                <li className="cursor-pointer px-4 py-4">Find a job</li>
                <li className="cursor-pointer px-4 py-4">Hire Talent</li>
                <li className="cursor-pointer px-4 py-4">Projects</li>
                <li className="cursor-pointer px-4 py-4">Contact</li>
              </ul>
            </div>

            {/* ======= Dropdown language button ======= */}
            <div className="flex flex-col gap-2" ref={mobileDropdownRef}>
              <button
                onClick={() => setShowMobileDropdown((prev) => !prev)}
                className={`flex items-center py-2.5 px-2.5 w-[236px] h-[44px] bg-white rounded-md ${
                  showMobileDropdown
                    ? "border-4 border-primary-300"
                    : "border border-neutral-300"
                }`}
              >
                <div className="flex gap-2 pr-5 font-karla">
                  {selectedLang === "en" ? ukFlag : uaFlag}
                  {selectedLang === "en" ? "En" : "Укр"}
                </div>
                {showMobileDropdown ? <UpArrowIcon /> : <DownArrowIcon />}
              </button>

              {showMobileDropdown && (
                <div className="w-[236px] rounded-md border border-neutral-300  bg-white">
                  {/* ======= Eng lang button ======= */}
                  <button
                    className="flex gap-2 px-2.5 py-2.5 font-karla font-bold"
                    onClick={() => handleSelectLang("en")}
                  >
                    <div className="flex gap-3 pr-3">
                      {ukFlag}
                      En
                    </div>
                    {selectedLang === "en" && checkIcon2}
                  </button>

                  {/* ======= Ukrainian lang button ======= */}
                  <button
                    className="flex items-center py-2.5 px-2.5 w-[236px] h-[44px] gap-2"
                    onClick={() => handleSelectLang("ukr")}
                  >
                    <div className="flex gap-3 pr-3">
                      {uaFlag}
                      Укр
                    </div>
                    {selectedLang === "ukr" && checkIcon2}
                  </button>
                </div>
              )}
            </div>

            <div className="flex px-8 py-4 gap-8 text-lg font-karla font-bold">
              <Link
                className="cursor-pointer text-primary-500 font-karla font-bold"
                href="/signin"
              >
                Login
              </Link>

              <button className="cursor-pointer py-2 px-6 bg-accent-400 rounded-md w-[135px] h-[44px] text-lg font-karla font-bold text-white">
                Join us
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======> Mobile / Tablet container: visible up to 1024px <======= */}
      <div className="lg:hidden flex justify-between items-center px-3 py-6 sm:px-12 md:px-18">
        <button
          className="cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div>{hamburger}</div>
        </button>
        <Link href="/" aria-label="Go to homepage">
          {logoDark}
        </Link>
        <button className="cursor-pointer py-2 px-6 bg-accent-400 rounded-md w-[109px] h-[44px] text-lg font-karla font-bold text-white">
          Join us
        </button>
      </div>

      {/* =======> Desktop container: visible above 1024px <======= */}
      <div
        className={`flex justify-center ${status === "authenticated" ? "bg-white" : ""}`}
      >
        <div className="hidden lg:block px-10 py-7 xl:w-6xl 2xl:w-7xl">
          <nav className="flex justify-between items-center max-w-[1200px] h-[52px] lg:gap-x-12 2xl:w-1200px">
            <div className="flex items-center lg:gap-x-7">
              {/* change logo color based on auth user */}
              <Link href="/" aria-label="Go to homepage">
                {status === "authenticated" ? logoDark : logoLight}
              </Link>
              <ul
                className={`flex items-center gap-4 h-[48px] font-karla font-bold ${
                  status === "authenticated" ? "text-primary-500" : "text-white"
                }`}
              >
                <li className="cursor-pointer px-[10px] py-[10px]">
                  Find a job
                </li>
                <li className="cursor-pointer px-[10px] py-[10px]">
                  Hire Talent
                </li>
                <li className="cursor-pointer px-[10px] py-[10px]">Projects</li>
                <li className="cursor-pointer px-[10px] py-[10px]">Contact</li>
              </ul>
            </div>
            <div className="flex items-center gap-8 h-[48px]">
              {/* Dropdown language button */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className={`cursor-pointer flex items-center py-2.5 px-2.5 w-[120px] h-[44px] bg-white rounded-md ${
                    showDropdown
                      ? "border-4 border-primary-300"
                      : "border border-neutral-300"
                  }`}
                >
                  <div className="flex gap-2 pr-5 font-karla">
                    {selectedLang === "en" ? ukFlag : uaFlag}
                    {selectedLang === "en" ? "En" : "Укр"}
                  </div>
                  {showDropdown ? <UpArrowIcon /> : <DownArrowIcon />}
                </button>

                {showDropdown && (
                  <div
                    className=" absolute top-full left-0 w-[120px] rounded-md border bg-white border-neutral-300"
                    style={{ top: "calc(100% + 6px)" }}
                  >
                    <div className="">
                      {/* Eng lang button */}
                      <button
                        className="cursor-pointer flex gap-2 px-2.5 py-2.5 font-karla font-bold"
                        onClick={() => handleSelectLang("en")}
                      >
                        <div className="flex gap-3 pr-3">
                          {ukFlag}
                          En
                        </div>
                        {selectedLang === "en" && checkIcon2}
                      </button>

                      {/* Ukrainian lang button */}
                      <button
                        className="cursor-pointer flex items-center py-2.5 px-2.5 gap-2"
                        onClick={() => handleSelectLang("ukr")}
                      >
                        <div className="flex gap-3 pr-3">
                          {uaFlag}
                          Укр
                        </div>
                        {selectedLang === "ukr" && checkIcon2}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {status === "authenticated" ? (
                <div className="flex gap-8">
                  <button
                    className="cursor-pointer font-karla font-bold text-primary-500 text-base"
                    onClick={handleUserNameClick}
                  >
                    <div className="flex gap-2 items-center">
                      {user?.email}{dropDownIcon}
                    </div>
                  </button>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="cursor-pointer py-2 px-6 bg-accent-400 rounded-md text-lg font-karla font-bold text-white"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    className="cursor-pointer text-white font-karla font-bold"
                    href="/signin"
                  >
                    Login
                  </Link>
                  <button className="cursor-pointer py-2 px-6 bg-accent-400 rounded-md w-[109px] h-[44px] text-lg font-karla font-bold text-white">
                    Join us
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
