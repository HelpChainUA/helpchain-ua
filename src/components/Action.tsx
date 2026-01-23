import ArrowRight from "@/icons/ArrowRight";

export default function Action() {
  return (
    <section className="flex justify-center py-20">
      <div className="flex flex-col gap-8 bg-primary-500 w-[350px] sm:w-[550px] lg:w-[840px] p-6 sm:p-10 rounded-2xl">
        <h2 className="font-montserrat text-white text-[22px] font-bold sm:text-2xl">
          Take the Next Step Today
        </h2>
        <p className="text-4 font-karla text-white">
          Whether you are looking for a job, offering employment, or want to
          support our initiative, we connect people to the right resources.
        </p>
        <p className="text-4 font-karla text-white">
          Join us for finding your best match.
        </p>
        <button className="font-karla bg-accent-400 hover:bg-accent-600 w-[150px] h-[44px] text-white font-semibold py-2 pr-5 pl-6 rounded-lg transition duration-200 cursor-pointer">
          <div className="flex items-center justify-center gap-2">
            <p>Join us</p>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>
    </section>
  );
}
