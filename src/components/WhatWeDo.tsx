"use client";
import HeartIcon from "@/icons/HeartIcon";
import CheckIcon from "@/icons/CheckIcon";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    title: "Connect",
    subtitle: "Connecting people for finding",
    image: "/images/conect.png",
    items: [
      "a job",
      "employees or busines partners",
      "networking opportunities",
    ],
    button: "Find best matches",
  },
  {
    title: "Possibilities",
    subtitle: "How we do best matches",
    image: "/images/help.png",
    items: [
      "AI-powered job matching",
      "BullCV & interview supportet point",
      "And?",
    ],
    button: "Explore the possibilities",
  },
  {
    title: "And more",
    subtitle: "Additional features",
    image: "/images/support.png",
    items: [
      "training & certification",
      "English courses for employment",
      "Funding & mentorship programs",
    ],
    button: "Develop yourself",
  },
];

export default function WhatWeDo() {
  return (
    <section className="bg-white py-5 px-6 md:py-10 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-2xl font-montserrat font-bold text-black mb-6">
          What We Do
        </p>
        <p className="max-w-2xl mx-auto text-center justify-center font-karla mb-3 text-primary-900">
          We are a dedicated platform helping Ukrainians find employment,
          training, and business opportunities in the UK. Whether you are
          looking for a job, offering employment, or want to support our
          initiative, we connect people to the right resources.
        </p>

        <div className="grid gap-8 md:grid-cols-3 text-left">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col justify-between h-full overflow-hidden p-4"
            >
              <div className="relative w-full h-48">
                <Image
                  src={`${card.image}`}
                  alt={card.title}
                  className="object-cover rounded-lg "
                  fill
                />
                <div className="absolute bottom-3 left-3 bg-white text-primary-400 p-2 rounded flex items-center gap-1 text-sm font-extrabold font-montserrat">
                  <HeartIcon className="w-4 h-4 text-accent-500" />
                  {card.title}
                </div>
              </div>

              <div className="pt-6">
                <p className="text-lg font-karla font-semibold text-black">
                  {card.subtitle}
                </p>
                <ul className="space-y-2 mb-6">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 font-karla ">
                      <CheckIcon className="w-4 h-4 text-accent-500 mt-1" />
                      <span className="text-sm text-black">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/some-where"
                className="flex w-full justify-end gap-2 text-primary-500 font-karla font-semibold text-sm items-center hover:text-primary-700 transition duration-200"
              >
                {card.button}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
