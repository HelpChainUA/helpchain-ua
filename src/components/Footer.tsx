"use client";

import { logoLight } from "@/icons/LogoLight";
import { youtube } from "@/icons/Youtube";
import { instagram } from "@/icons/Instagram";
import { xIcon } from "@/icons/X";
import { facebook } from "@/icons/Facebook";
import { linkedin } from "@/icons/Linkedin";

import Link from "next/link";

const usefulLinks = [
  { name: "Contact Us", href: "/contact-us" },
  { name: "About Us", href: "/some-where" },
  { name: "Careers", href: "/some-where" },
  { name: "Blog Posts", href: "/some-where" },
  { name: "Support Center", href: "/some-where" },
];

const connectWithUs = [
  "Newsletter",
  "Events",
  "Resources",
  "Community",
  "FAQs",
];

const socialLinks = [
  {
    name: "YouTube",
    icon: youtube,
  },
  {
    name: "Instagram",
    icon: instagram,
  },
  {
    name: "X",
    icon: xIcon,
  },
  {
    name: "Facebook",
    icon: facebook,
  },
  {
    name: "LinkedIn",
    icon: linkedin,
  },
];

export default function Footer() {
  return (
    <section className="text-white font-roboto">
      {/* Desktop Layout (xl and up) */}
      <div className="hidden xl:flex justify-center">
        <div className="flex flex-col gap-20 bg-primary-800 w-full py-10 px-48 xl:px-20">
          <div className="flex justify-between gap-32">
            <div className="flex flex-col gap-6 2xl:w-[500px]">
              <div>{logoLight}</div>
              <p>
                Subscribe to our newsletter for the latest updates on features
                and releases.
              </p>
              <div>
                <form className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Your Email Here"
                    className="w-[405px] rounded-sm p-3 border border-primary-400 placeholder-white"
                    required
                  />
                  <input
                    type="submit"
                    value="Join"
                    className="w-[79px] rounded-sm border border-primary-400 px-6 py-3"
                  />
                </form>
              </div>
              <p className="text-xs">
                By subscribing, you consent to our Privacy Policy and agree to
                receive updates.
              </p>
            </div>
            <div className="flex gap-20">
              <div className="flex flex-col gap-4">
                <p className="text-base font-semibold">Useful Links</p>
                <ul className="flex flex-col gap-3">
                  {usefulLinks.map((link, index) => (
                    <li key={index} className="font-normal text-sm py-2">
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-base font-semibold">Connect With Us</p>
                <ul className="flex flex-col gap-3">
                  {connectWithUs.map((link, index) => (
                    <li key={index} className="font-normal text-sm py-2">
                      <Link href="/some-where">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-base font-semibold">Follow Us</p>
                <ul className="flex flex-col gap-3">
                  {socialLinks.map((resource, index) => (
                    <li
                      key={index}
                      className="flex items-center font-normal text-sm py-2 gap-3"
                    >
                      <span>{resource.icon}</span>
                      {resource.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-between border-t-[2px] border-primary-700 pt-8">
            <div>
              <p className="text-3.5 font-karla">
                © 2024 Relume. All rights reserved.
              </p>
            </div>
            <ul className="flex gap-6">
              <li>
                <Link href="/some-where">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/some-where">Terms of Service</Link>
              </li>
              <li>
                <Link href="/some-where">Cookie Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* lg:1024px and up */}
      <div className="hidden xl:hidden lg:flex justify-center">
        <div className="flex flex-col gap-12 bg-primary-800 w-full p-10 px-16">
          <div className="flex justify-between gap-18">
            <div className="flex flex-col gap-6 w-[400px]">
              <div>{logoLight}</div>
              <p>
                Subscribe to our newsletter for the latest updates on features
                and releases.
              </p>
              <div>
                <form className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Your Email Here"
                    className="w-[305px] rounded-sm p-3 border border-primary-400 placeholder-white"
                    required
                  />
                  <input
                    type="submit"
                    value="Join"
                    className="w-[79px] rounded-sm border border-primary-400 px-6 py-3"
                  />
                </form>
              </div>
              <p className="text-xs">
                By subscribing, you consent to our Privacy Policy and agree to
                receive updates.
              </p>
            </div>
            <div className="flex gap-11">
              <div className="flex flex-col gap-4">
                <p className="text-base font-semibold">Useful Links</p>
                <ul className="flex flex-col gap-3">
                  {usefulLinks.map((link, index) => (
                    <li key={index} className="font-normal text-sm py-2">
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-base font-semibold">Connect With Us</p>
                <ul className="flex flex-col gap-3">
                  {connectWithUs.map((link, index) => (
                    <li key={index} className="font-normal text-sm py-2">
                      <Link href="/some-where">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-base font-semibold">Follow Us</p>
                <ul className="flex flex-col gap-3">
                  {socialLinks.map((resource, index) => (
                    <li
                      key={index}
                      className="flex items-center font-normal text-sm py-2 gap-3"
                    >
                      <span>{resource.icon}</span>
                      {resource.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-between border-t-[2px] border-primary-700 pt-8">
            <div>
              <p className="text-3.5 font-karla">
                © 2024 Relume. All rights reserved.
              </p>
            </div>
            <ul className="flex gap-6">
              <li>
                <Link href="/some-where">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/some-where">Terms of Service</Link>
              </li>
              <li>
                <Link href="/some-where">Cookie Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 640px and up to 767px */}
      <div className="hidden lg:hidden sm:flex justify-center">
        <div className="flex flex-col gap-12 bg-primary-800 w-full py-10 px-10 md:px-20">
          <div className="flex justify-between gap-12">
            <div className="flex flex-col gap-6 w-[320px]">
              <div>{logoLight}</div>
              <p>
                Subscribe to our newsletter for the latest updates on features
                and releases.
              </p>
              <div>
                <form className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Your Email Here"
                    className="w-[300px] rounded-sm p-3 border border-primary-400 placeholder-white"
                    required
                  />
                  <input
                    type="submit"
                    value="Join"
                    className="w-[79px] rounded-sm border border-primary-400 px-6 py-3"
                  />
                </form>
              </div>
              <p className="text-xs">
                By subscribing, you consent to our Privacy Policy and agree to
                receive updates.
              </p>
            </div>
            <div className="flex gap-13">
              <div className="flex flex-col gap-4">
                <p className="text-base font-semibold">Useful Links</p>
                <ul className="flex flex-col gap-1 font-normal text-sm">
                  <li className="py-1">
                    <Link href="/some-where">About Us</Link>
                  </li>
                  <li className="py-1">
                    <Link href="/contact-us">Contact Us</Link>
                  </li>
                  <li className="py-1">
                    <Link href="/some-where">Careers</Link>
                  </li>
                  <li className="py-1">
                    <Link href="/some-where">Blog Posts</Link>
                  </li>
                  <li className="py-1">
                    <Link href="/some-where">Support Center</Link>
                  </li>
                  <li className="py-1">
                    <Link href="/some-where">Privacy Policy</Link>
                  </li>
                  <li className="py-1">
                    <Link href="/some-where">Terms of Service</Link>
                  </li>
                  <li className="py-1">
                    <Link href="/some-where">Cookie Settings</Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-base font-semibold">Connect With Us</p>
                <ul className="flex flex-col gap-1">
                  {connectWithUs.map((link, index) => (
                    <li key={index} className="font-normal text-sm py-1">
                      <Link href="/some-where">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <ul className="flex gap-10">
              {socialLinks.map((resource, index) => (
                <li key={index} className="font-normal text-sm py-2 gap-3">
                  <span>{resource.icon}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center gap-4 border-t-[2px] border-primary-700 pt-8">
            <p className="text-3.5 font-karla">
              © 2024 Relume. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* mobile 375px and up to 639px */}
      <div className="sm:hidden flex justify-center">
        <div className="flex flex-col gap-12 bg-primary-800 w-full p-8">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <div>{logoLight}</div>
              <p>
                Subscribe to our newsletter for the latest updates on features
                and releases.
              </p>
              <div>
                <form className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Your Email Here"
                    className="min-w-3xs rounded-sm p-3 border border-primary-400 placeholder-white"
                    required
                  />
                  <input
                    type="submit"
                    value="Join"
                    className="w-20 rounded-sm border border-primary-400 px-6 py-3"
                  />
                </form>
              </div>
              <p className="text-xs">
                By subscribing, you consent to our Privacy Policy and agree to
                receive updates.
              </p>
            </div>
            <div className="flex gap-13">
              <div className="flex flex-col gap-4">
                <p className="text-base font-semibold">Useful Links</p>
                <ul className="flex flex-col gap-1 font-normal text-sm">
                  <li className="py-1">
                    <Link href="/some-where">About Us</Link>
                  </li>
                  <li className="py-1">
                    <Link href="/contact-us">Contact Us</Link>
                  </li>
                  <li className="py-1">
                    <Link href="/some-where">Careers</Link>
                  </li>
                  <li className="py-1">
                    <Link href="/some-where">Blog Posts</Link>
                  </li>
                  <li className="py-1">
                    <Link href="/some-where">Support Center</Link>
                  </li>
                  <li className="py-1">
                    <Link href="/some-where">Privacy Policy</Link>
                  </li>
                  <li className="py-1">
                    <Link href="/some-where">Terms of Service</Link>
                  </li>
                  <li className="py-1">
                    <Link href="/some-where">Cookie Settings</Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-base font-semibold">Connect With Us</p>
                <ul className="flex flex-col gap-1">
                  {connectWithUs.map((link, index) => (
                    <li key={index} className="font-normal text-sm py-2">
                      <Link href="/some-where">{link}</Link>
                    </li>
                  ))}
                </ul>
                <ul className="flex gap-6"></ul>
              </div>
            </div>
            <div className="flex justify-center">
              <ul className="flex gap-10">
                {socialLinks.map((resource, index) => (
                  <li key={index} className="font-normal text-sm py-2 gap-3">
                    <span>{resource.icon}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 border-t-[2px] border-primary-700 pt-8">
            <p className="text-3.5 font-karla">
              © 2024 Relume. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
