"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, PlusCircle } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

export const DashboardNav = () => {
  const dashboardItem = {
    label: "Dashboard",
    href: "/dashboard",
  };
  const pathname = window.location.pathname;

  const isActive = pathname === dashboardItem.href;

  const onClick = () => {
    window.location.href = dashboardItem.href;
  };

  return (
    <div className={cn("rounded-lg border-2 border-slate-500")}>
      <button
        onClick={onClick}
        type="button"
        className={cn(
          "flex h-fit w-full items-center gap-x-2 pl-6 text-sm font-[500] text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600",
          isActive &&
            "bg-sky-200/20 text-sky-700 hover:bg-sky-200/20 hover:text-sky-700",
        )}
      >
        <div className="flex h-full items-center gap-x-2 py-4">
          <LayoutDashboard
            size={22}
            className={cn("text-slate-500", isActive && "text-sky-700")}
          />
          {dashboardItem.label}
        </div>
        <div
          className={cn(
            "ml-auto mr-[1px] block h-12 border-2 border-sky-700 opacity-0 transition-all",
            isActive && "opacity-100",
          )}
        />
      </button>
      <div className="ml-2 flex flex-col">
        <span className="flex items-center">
          <PlusCircle size={22} />
          <SidebarItem
            icon={LayoutDashboard}
            label="My Articles"
            href="/dashboard/articles"
          />
        </span>
        <span className="flex items-center">
          <PlusCircle size={22} />
          <SidebarItem
            icon={LayoutDashboard}
            label="My Courses"
            href="/dashboard/courses"
          />
        </span>
      </div>
    </div>
  );
};
