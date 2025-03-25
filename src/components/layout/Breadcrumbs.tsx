"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { useSidebar } from "@/contexts/SidebarContext";
import { PanelLeftOpen, PanelRightOpen } from "lucide-react";

export const Breadcrumbs = ({
  pageName,
  isLoading,
}: {
  pageName?: string;
  isLoading?: boolean;
}) => {
  const { toggleSidebar, isOpen } = useSidebar();

  return (
    <Breadcrumb className="h-20 bg-muted rounded-lg border flex items-center justify-start px-6">
      <button
        onClick={toggleSidebar}
        className="text-sm px-2 py-1 bg-muted transition mr-4"
      >
        {isOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
      </button>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbPage className="px-2 py-1 border bg-background rounded-sm">
          {isLoading ? (
            <Skeleton className="h-5 w-20" />
          ) : (
            <BreadcrumbLink>{pageName || "Dashboard"}</BreadcrumbLink>
          )}
        </BreadcrumbPage>
      </BreadcrumbList>
      {/* <Image
        className="hover:animate-spin dark:invert"
        src={Icon}
        width={24}
        height={24}
        alt="Router.so Icon"
      /> */}
    </Breadcrumb>
  );
};
