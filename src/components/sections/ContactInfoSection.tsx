import { Clock, Mail } from "lucide-react";

export function ContactInfoSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-white to-[#F8FDF5] px-4 py-16 md:py-20">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="mb-8 text-center font-medium text-2xl text-neutral-800 md:mb-12 md:text-3xl">
          Other Ways to Reach Us
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Email */}
          <div className="flex flex-col items-center rounded-xl border border-primary/10 bg-white/60 p-6 text-center backdrop-blur-sm md:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-medium text-lg text-neutral-800">
              Email Us
            </h3>
            <a
              className="text-neutral-600 transition-colors hover:text-primary"
              href="mailto:hello@meetlucas.ai"
            >
              hello@meetlucas.ai
            </a>
          </div>

          {/* Response Time */}
          <div className="flex flex-col items-center rounded-xl border border-primary/10 bg-white/60 p-6 text-center backdrop-blur-sm md:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-medium text-lg text-neutral-800">
              Response Time
            </h3>
            <p className="text-neutral-600">
              We typically respond within 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
