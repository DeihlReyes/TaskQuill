"use client";

import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, ScrollText, Presentation, Settings, CalendarCheck2} from "lucide-react";

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "./ui/button";

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
    {
        title: 'Corporate Meeting',
        Link: '/meetings',
        date: '2021-10-20',
    },
    {
        title: 'Emergency Meeting',
        Link: '/settings',
        date: '2021-10-20',
    }

];

export const MeetingSidebar = () => {
  const handleButtonClick = (link: any) => {
    window.open(link, '_blank');
  };
  return (
    <div className="space-y-4 py-4 px-2 flex flex-col h-full shadow-lg shadow-[#0d0d0d]/20">
      <div className="px-3 py-2 flex-1">
        <h1 className="text-xl font-extrabold py-4">Meetings</h1>
        <div className="space-y-4">
          {routes.map((route) => (
            <Card key={null}>
                <CardHeader>
                    <CardTitle className="text-lg">{route.title}</CardTitle>
                    <CardDescription>{route.date}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end">
                    <Button onClick={() => handleButtonClick(route.Link)}>Join</Button>
                </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};