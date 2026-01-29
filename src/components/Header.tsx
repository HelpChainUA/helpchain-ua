"use client";

import { dropDownIcon } from "@/icons/DropDownIcon";
import { ukFlag, uaFlag } from "../icons/Flags";
import DownArrowIcon from "@/icons/ChevronDown";
import UpArrowIcon from "@/icons/ChevronUp";
import CheckMark2 from "@/icons/CheckMark2";
import { crossCloseIcon } from "@/icons/Cross";
import { hamburger } from "@/icons/Hamburger";
import { logoDark } from "@/icons/LogoDark";
import { logoLight } from "@/icons/LogoLight";
import { avatar } from "@/icons/Avatar";

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
    <header className="bg-white">
      {/* =======> Mobile menu <======= */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-25 bg-gray-350 lg:hidden">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 z-50 p-2"
          >
            {crossCloseIcon}
          </button>
          <div className="flex flex-col items-center pt-6 gap-8 absolute top-0 left-0 min-w-xs w-3/5 h-full z-30 bg-white sm:w-2/6 md:w-2/5">
            <div className="flex flex-col items-center">
              <ul className="flex flex-col items-center font-karla font-bold text-primary-500">
                <li className="cursor-pointer p-4 active:text-primary-700">
                  Projects
                </li>
                <li className="cursor-pointer p-4 active:text-primary-700">
                   About Us
                </li>
                <li className="cursor-pointer p-4 active:text-primary-700">
                  Events
                </li>
                <li className="cursor-pointer p-4 active:text-primary-700">
                  Projects
                </li>
                <li className="cursor-pointer p-4 active:text-primary-700">
                  <Link href="/contact-us" onClick={() => setIsMenuOpen(false)}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* ======= Dropdown language button ======= */}
            <div className="flex flex-col gap-2" ref={mobileDropdownRef}>
              {/* <button
                onClick={() => setShowMobileDropdown((prev) => !prev)}
                className={`flex items-center p-2.5 min-w-52 h-11 bg-white rounded-md active:bg-gray-50 ${
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
              </button> */}

              {showMobileDropdown && (
                <div className="w-56 rounded-md border border-neutral-300 bg-white">
                  {/* ======= Eng lang button ======= */}
                  <button
                    className="flex gap-2 p-2.5 min-w-52 h-11 font-karla font-bold"
                    onClick={() => handleSelectLang("en")}
                  >
                    <div className="flex gap-3 pr-3">
                      {ukFlag}
                      En
                    </div>
                    {selectedLang === "en" && <CheckMark2 />}
                  </button>

                  {/* ======= Ukrainian lang button ======= */}
                  <button
                    className="flex items-center p-2.5 min-w-52 h-11 gap-2"
                    onClick={() => handleSelectLang("ukr")}
                  >
                    <div className="flex gap-3 pr-3">
                      {uaFlag}
                      Укр
                    </div>
                    {selectedLang === "ukr" && <CheckMark2 />}
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center px-8 py-4 gap-8 text-lg font-karla font-bold">
              {status === "authenticated" ? (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="cursor-pointer py-2 px-5 bg-accent-400 active:bg-accent-600 rounded-md w-32 h-11 text-lg text-white"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="cursor-pointer text-primary-500 active:text-primary-700 font-karla font-bold"
                  >
                    Login
                  </Link>

                  <button className="cursor-pointer py-2 px-6 bg-accent-400 active:bg-accent-600 rounded-md w-32 h-11 text-lg font-karla font-bold text-white">
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      Join us
                    </Link>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =======> Mobile container: visible up to 1024px <======= */}
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
        {status === "authenticated" ? (
          <button
            onClick={handleUserNameClick}
            className="cursor-pointer flex items-center"
          >
            {avatar}
          </button>
        ) : (
          <button className="cursor-pointer py-2 px-6 bg-accent-400 active:bg-accent-600 rounded-md w-28 h-11 text-lg font-karla font-bold text-white">
            <Link href="/signup">Join us</Link>
          </button>
        )}
      </div>

      {/* =======> Tablet & Desktop container: visible from lg (1024px) and up <======= */}
      <div className={`hidden lg:flex justify-center bg-white`}>
        <div className="w-full max-w-7xl px-10 py-7">
          <nav className="flex justify-between items-center">
            {/* === Left side: Logo + Nav === */}
            <div className="flex items-center gap-6">
              <Link href="/" aria-label="Go to homepage">
                {status === "authenticated" ? logoDark : logoLight}
              </Link>
              <ul
                className={`flex items-center gap-4 h-12 font-karla font-bold cursor-pointer text-primary-400`}
              >
                <li className="cursor-pointer p-2.5 hover:text-primary-700">
                   Projects
                </li>
                <li className="cursor-pointer p-2.5 hover:text-primary-700">
                   About Us
                </li>
                <li className="cursor-pointer p-2.5 hover:text-primary-700">
                  Events
                </li>
                <li className="cursor-pointer p-2.5 hover:text-primary-700">
                  Partners
                </li>
                <li className="cursor-pointer p-2.5 hover:text-primary-700">
                  {" "}
                  <Link href="/contact-us">Contact</Link>
                </li>
              </ul>
            </div>

            {/* === Right side: Lang + User Actions === */}
            <div className="flex items-center gap-6 h-12 whitespace-nowrap">
              {/* Language Dropdown (always visible on tablet & desktop) */}
              {/* <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className={`cursor-pointer flex items-center p-2.5 w-28 h-12 bg-white hover:bg-gray-50 rounded-md ${
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
                    className="absolute top-full left-0 w-28 rounded-md border bg-white border-neutral-300"
                    style={{ top: "calc(100% + 6px)" }}
                  >
                    <div>
                      <button
                        className="cursor-pointer flex gap-2 p-2.5 font-karla font-bold"
                        onClick={() => handleSelectLang("en")}
                      >
                        <div className="flex gap-3 pr-3">
                          {ukFlag}
                          En
                        </div>
                        {selectedLang === "en" && <CheckMark2 />}
                      </button>
                      <button
                        className="cursor-pointer flex items-center p-2.5 gap-2"
                        onClick={() => handleSelectLang("ukr")}
                      >
                        <div className="flex gap-3 pr-3">
                          {uaFlag}
                          Укр
                        </div>
                        {selectedLang === "ukr" && <CheckMark2 />}
                      </button>
                    </div>
                  </div>
                )}
              </div> */}

              {/* === Authenticated user controls === */}
              {status === "authenticated" ? (
                <div className="flex items-center gap-6">
                  {/* Tablet view: avatar only */}
                  <div className="xl:hidden flex items-center">
                    <button
                      className="cursor-pointer h-full flex items-center"
                      onClick={handleUserNameClick}
                      aria-label="Open user profile"
                    >
                      {avatar}
                    </button>
                  </div>

                  {/* Desktop view: email + dropdown */}
                  <div className="hidden xl:flex items-center">
                    <button
                      className="cursor-pointer font-karla font-bold text-primary-500 hover:text-primary-700 text-base"
                      onClick={handleUserNameClick}
                    >
                      <div className="flex gap-2 items-center">
                        {user?.email}
                        {dropDownIcon}
                      </div>
                    </button>
                  </div>

                  {/* Sign out (shown on both) */}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="cursor-pointer py-2 px-5 bg-accent-400 hover:bg-accent-600 lg:w-28 h-12 text-base rounded-md font-karla font-bold text-white"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    className="cursor-pointer text-primary-400 font-karla font-bold"
                    href="/signin"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="cursor-pointer py-2 px-6 bg-accent-400 hover:bg-accent-600 rounded-md lg:w-28 h-12 text-lg font-karla font-bold text-white"
                  >
                    Join us
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
