"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import SideNav from "./SideNav";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebar();

  return (
    <div
      className={`flex flex-col-reverse sm:grid sm:h-screen sm:w-screen sm:overflow-hidden transition-all duration-300 ${
        isOpen ? "sm:grid-cols-[256px,1fr]" : "sm:grid-cols-[0,1fr]"
      }`}
    >
      <SideNav />
      <main className="w-full h-full overflow-y-auto p-4 flex flex-col gap-4">
        {children}
      </main>
    </div>
  );
}
