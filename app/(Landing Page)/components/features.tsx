import { motion } from "framer-motion";
import { CheckCircle, BarChart2, Clock, CalendarCheck2 } from "lucide-react";

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="flex flex-col items-center rounded-lg border p-6 shadow-md">
    <Icon className="mb-4 h-12 w-12 text-[#7c5cfc]" />
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <p className="text-center text-gray-600">{description}</p>
  </div>
);

interface FeaturesSectionProps {
  showContent: boolean;
}

export default function FeaturesSection() {
  return (
    <motion.section
      id="features"
      className="px-4 py-20 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={CheckCircle}
            title="Task Management"
            description="Organize and prioritize your tasks with ease."
          />
          <FeatureCard
            icon={BarChart2}
            title="Progress Tracking"
            description="Visualize your productivity and track your progress."
          />
          <FeatureCard
            icon={Clock}
            title="Time Management"
            description="Efficiently manage your time with built-in timers and reminders."
          />
          <FeatureCard
            icon={CalendarCheck2}
            title="Meeting Scheduling"
            description="Schedule and manage your meetings efficiently."
          />
        </div>
      </div>
    </motion.section>
  );
}
