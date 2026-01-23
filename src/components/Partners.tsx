"use client";
import { companyLogo1 } from "@/icons/CompanyLogo1";
import { companyLogo2 } from "@/icons/CompanyLogo2";
import { companyLogo3 } from "@/icons/CompanyLogo3";
import { companyLogo4 } from "@/icons/CompanyLogo4";
import { companyLogo5 } from "@/icons/CompanyLogo5";
import { companyLogo6 } from "@/icons/CompanyLogo6";

const partners = [
  companyLogo1,
  companyLogo2,
  companyLogo3,
  companyLogo4,
  companyLogo5,
  companyLogo6,
];

export default function Partners() {
  return (
    <section className="pt-12">
      <div className="flex flex-col items-center py-10 gap-12">
        <h2 className="font-montserrat text-[22px] font-bold px-5 max-w-[1120px] sm:text-2xl">
          Trusted by 100+ companies
        </h2>
        <ul
          className="grid
                    grid-cols-2
                    justify-items-center
                    gap-6
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:flex
                    lg:justify-between
                    xl:w-[1050px]
                    2xl:w-[1120px]"
        >
          {partners.map((partner, index) => (
            <li key={index}>{partner}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
