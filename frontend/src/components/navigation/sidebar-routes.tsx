"use client";

import {
  BarChart,
  Compass,
  Construction,
  Home,
  Layout,
  LayoutDashboard,
  List,
  Newspaper,
} from "lucide-react";
import { SidebarItem } from "@/components/navigation/sidebar-item";
import { DashboardNav } from "@/components/navigation/dashboard-nav";

const routes = [
  {
    icon: Newspaper,
    label: "Browse Blogs",
    href: "/blogs",
  },
  {
    icon: Construction,
    label: "Browse Courses",
    href: "/courses",
  },
];
const homeRoute = {
  icon: Home,
  label: "Welcome",
  href: "/",
};
export const SidebarRoutes = () => {
  return (
    <div className="flex h-full flex-col justify-end">
      <div className="flex w-full flex-col">
        <DashboardNav />
      </div>
      <div className="flex w-full flex-col">
        {routes.map((route) => (
          <SidebarItem key={route.href} {...route} />
        ))}
      </div>
      <div className="mb-2 mt-auto w-full">
        <SidebarItem key={homeRoute.href} {...homeRoute} />
      </div>
      <div className="mb-2">{/* todo: add settings-button? */}</div>
    </div>
  );
};
