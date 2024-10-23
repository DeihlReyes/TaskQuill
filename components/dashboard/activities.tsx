import { BellRing } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const activities = [
  {
    activity: "Assigned you to a task",
    title: "Create a Draft",
    date: "2021-10-28",
  },
  {
    activity: "Added you to a project",
    title: "Project 303",
    date: "2021-08-16",
  },
];

const Activities = () => {
  return (
    <Card className="w-1/3 shadow-sm shadow-slate-400">
      <CardHeader className="flex flex-row items-center gap-4 px-5 pt-8">
        <BellRing className="h-7 pt-1 text-primary" />
        <div>
          <CardTitle className="text-base leading-tight tracking-wide">
            Activities
          </CardTitle>
          <CardDescription className="text-xs">
            Recent activities from your projects
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-5 pb-8">
        <div>
          {activities.map((activity) => (
            <div
              className="flex flex-row justify-between border-b-2 px-2 py-4"
              key={activity.activity}
            >
              <div>
                <h1 className="text-base font-semibold leading-loose">
                  {activity.title}
                </h1>
                <p className="text-sm text-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Activities;
