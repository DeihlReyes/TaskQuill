import Image from "next/image";

import { CheckCircle } from "lucide-react";

export default function BenefitsSection() {
  return (
    <section id="benefits" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Why Choose TaskQuill?
        </h2>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start">
              <CheckCircle className="mr-4 h-6 w-6 flex-shrink-0 text-[#7c5cfc]" />
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  Boost Productivity
                </h3>
                <p className="text-gray-600">
                  Streamline your workflow and accomplish more in less time.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="mr-4 h-6 w-6 flex-shrink-0 text-[#7c5cfc]" />
              <div>
                <h3 className="mb-2 text-xl font-semibold">Stay Organized</h3>
                <p className="text-gray-600">
                  Keep all your tasks and projects neatly organized in one
                  place.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="mr-4 h-6 w-6 flex-shrink-0 text-[#7c5cfc]" />
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  Collaborate Effectively
                </h3>
                <p className="text-gray-600">
                  Work seamlessly with your team, assigning tasks and sharing
                  progress.
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-96">
            <Image
              src="/task.svg"
              alt="TaskQuill Benefits"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
