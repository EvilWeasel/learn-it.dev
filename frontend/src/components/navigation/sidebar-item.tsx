"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  className?: string;
  inset?: boolean;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  className,
  inset = false,
}: SidebarItemProps) => {
  const pathname = window.location.pathname;

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    window.location.href = href;
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "box-border flex h-full w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600",
        !inset ? "pl-6" : "pl-2",
        isActive &&
          "bg-sky-200/20 text-sky-700 hover:bg-sky-200/20 hover:text-sky-700",
      )}
    >
      <div className="flex h-full items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto h-full border-2 border-sky-700 opacity-0 transition-all",
          isActive && "opacity-100",
        )}
      />
    </button>
  );
};
