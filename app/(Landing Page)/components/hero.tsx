import Image from "next/image";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const TypeWriter = ({
  text,
  delay = 35,
  onComplete,
}: {
  text: string;
  delay?: number;
  onComplete?: () => void;
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return (
    <span className="transition duration-200 ease-linear">{currentText}</span>
  );
};

export default function HeroSection({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [showContent, setShowContent] = useState(false);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="mb-6 min-h-[4rem] text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
          <TypeWriter
            text="Master Your Tasks, Boost Your Efficiency."
            onComplete={() => {
              setTimeout(() => setShowContent(true), 500);
              onComplete();
            }}
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          <p className="mx-auto max-w-5xl text-center text-base text-muted-foreground sm:text-lg md:text-xl">
            Elevate Your Task Management with TaskQuill. Your essential hub for
            seamless organization, effortless task mastery, and heightened
            productivity. TaskQuill redefines task management, offering
            precision and control for a streamlined workflow.
          </p>
          <Button className="rounded-full" size={"lg"}>
            Try TaskQuill for Free
          </Button>
        </motion.div>

        <motion.div
          className="mt-12 px-4 sm:mt-16 sm:px-6 lg:mt-14 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative mx-auto h-full max-w-5xl overflow-hidden rounded-lg border shadow-xl">
            <Image
              src="/hero.png"
              alt="Taskquill Dashboard Preview"
              width={1920}
              height={1080}
              className="h-auto w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
