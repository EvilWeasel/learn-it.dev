import { Logo } from "@/components/navigation/logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto border-r shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex h-full w-full flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
};
