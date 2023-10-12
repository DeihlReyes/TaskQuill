"use client";

import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, ScrollText, Presentation, Settings, CalendarCheck2, Plus, CalendarRange} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";

const routes = [
    {
        title: 'Project 101',
        Link: '/projects',
        date: '2021-10-10',
    },
    {
        title: 'Daily Scrum Meeting',
        Link: '/meetings',
        date: '2021-10-20',
    },
];

export const MeetingSidebar = () => {
  const handleButtonClick = (link: any) => {
    window.open(link, '_blank');
  };
  return (
    <Card className="shadow-sm shadow-slate-400 w-full lg:w-1/3">
      <CardHeader className="px-5 pt-8 flex flex-row gap-4 items-center">
        <CalendarRange className="text-primary pt-1 h-7"/>
        <div>
          <CardTitle className="text-base tracking-wide leading-tight">Upcoming Meetings</CardTitle>
          <CardDescription className="text-xs">List of your upcoming meetings.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-5 pb-8">
        <div>
          {routes.map((routes) => (
            <div className="flex flex-row justify-between py-4 px-2 border-b-2" key={routes.title}>
              <div>
                <h1 className="text-base font-semibold leading-loose">{routes.title}</h1>
                <p className="text-sm text-slate-600">{routes.date}</p>
              </div>
              <Button>
                <Plus className="h-5 w-5 pr-2"/>
                Join
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};