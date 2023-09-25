'use client'

import { Menu, Shapes } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger
} from "@/components/ui/sheet";
import { FolderKanban, LayoutDashboard, Presentation, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

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

export const MobileSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navigateTo = (href: string) => () => {
    router.push(href);
  };
  
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="space-y-8 p-0 flex flex-col h-full border border-solid border-[#0d0d0d]/10 dark:border-[#fefefe]/10 shadow-lg dark:shadow-[#fefefe]/10 shadow-[#0d0d0d]/10">
        <SheetHeader className="py-8 px-4">
          <div>
            <div className="flex items-center pt-2">
              <div className="relative h-8 w-8 mr-4">
                <Shapes className="absolute h-full w-full text-blue-700" />
              </div>
              <h1 className="text-2xl font-bold">
                TaskQuill
              </h1>
            </div>
          </div>
        </SheetHeader>
        <SheetFooter>
            <div className="flex flex-col w-full px-4">
              {routes.map((route) => (
                <SheetClose key={route.href}>
                  <button
                    onClick={navigateTo(route.href)}
                    className={cn(
                      "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-[#0d0d0d]/10 rounded-lg transition",
                      pathname === route.href ? "bg-[#0d0d0d]/10 dark:bg-[#fefefe]/10" : "bg-transparent",
                    )}
                  >
                    <div className="flex items-center flex-1">
                      <route.icon className="h-5 w-5 mr-3" />
                      {route.label}
                    </div>
                  </button>
                </SheetClose>
              ))}
            </div>
        </SheetFooter>
      </SheetContent>

    </Sheet>
  )
}