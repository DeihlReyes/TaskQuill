"use client";

import { Menu, Shapes } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  FolderKanban,
  LayoutDashboard,
  Presentation,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Projects",
    icon: FolderKanban,
    href: "/projects",
  },
  {
    label: "Meetings",
    icon: Presentation,
    href: "/meetings",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export const MobileSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navigateTo = (href: string) => () => {
    router.push(href);
  };

  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition hover:opacity-75 md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex h-full flex-col space-y-8 border border-solid border-[#0d0d0d]/10 p-0 shadow-lg shadow-[#0d0d0d]/10 dark:border-[#fefefe]/10 dark:shadow-[#fefefe]/10"
      >
        <SheetHeader className="px-4 py-8">
          <div>
            <div className="flex items-center pt-2">
              <div className="relative mr-4 h-8 w-8">
                <Shapes className="absolute h-full w-full text-blue-700" />
              </div>
              <h1 className="text-2xl font-bold">TaskQuill</h1>
            </div>
          </div>
        </SheetHeader>
        <SheetFooter>
          <div className="flex w-full flex-col px-4">
            {routes.map((route) => (
              <SheetClose key={route.href}>
                <button
                  onClick={navigateTo(route.href)}
                  className={cn(
                    "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-[#0d0d0d]/10",
                    pathname === route.href
                      ? "bg-[#0d0d0d]/10 dark:bg-[#fefefe]/10"
                      : "bg-transparent",
                  )}
                >
                  <div className="flex flex-1 items-center">
                    <route.icon className="mr-3 h-5 w-5" />
                    {route.label}
                  </div>
                </button>
              </SheetClose>
            ))}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
