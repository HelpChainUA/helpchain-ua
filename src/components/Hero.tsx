import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-primary-600 py-12 px-4 text-center mx-auto">
      <div className="mx-auto">
        <div className="font-montserrat text-3xl md:text-5xl font-bold pb-4">
          <p className="text-primary-200">Ukrainian Employment</p>
          <p className="text-white">Integration Portal</p>
        </div>

        <div className="font-karla text-sm text-white pb-10">
          <p>
            Connecting Ukrainian professionals with opportunities across the UK.
          </p>
          <p>Join us in building bridges to meaningful employment.</p>
        </div>

        <div className="font-karla text-sm text-white pb-10">
          <p>For employers and employees</p>
        </div>

        <button className="font-karla bg-accent-400 hover:bg-accent-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
          <div className="flex items-center justify-center gap-2">
            <p>Register your interest</p>
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>

        <div className="flex flex-col sm:flex-row justify-center gap-15 pt-10">
          <StatItem number="5000+" label="Pre-Registrations" />
          <StatItem number="35+" label="Industries" />
          <StatItem number="50+" label="Successful matches" />
          <StatItem number="100+" label="UK Companies" />
        </div>
      </div>
    </section>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-xl font-bold text-white font-montserrat">
        {number}
      </div>
      <div className="text-xs text-white font-karla">{label}</div>
    </div>
  );
}
