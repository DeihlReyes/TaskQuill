"use client";

import Link from "next/link";
import Image from "next/image";
import { FolderKanban, LayoutDashboard, ScrollText, Presentation, Settings, Shapes} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
    },
    {
        label: 'Projects',
        icon: FolderKanban,
        href: '/projects',
    },
    {
        label: 'Tasks',
        icon: ScrollText,
        href: '/Tasks',
    },
    {
        label: 'Meetings',
        icon: Presentation,
        href: '/meetings',
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
    }

];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full shadow-lg shadow-[#0d0d0d]/10">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Shapes className="absolute h-full w-full text-blue-700" />
          </div>
          <h1 className="text-2xl font-bold">
            TaskQuill
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href} 
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-[#0d0d0d]/10 rounded-lg transition",
                pathname === route.href ? " bg-[#0d0d0d]/10" : "text-[#0d0d0d]",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};