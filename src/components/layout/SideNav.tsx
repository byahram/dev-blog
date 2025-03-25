"use client";

import React from "react";
import {
  BarChart,
  Contact,
  Layers,
  LifeBuoy,
  Disc3,
  Book,
  LucideProps,
} from "lucide-react";
import Link from "next/link";
import { useSidebar } from "@/contexts/SidebarContext";

const links = [
  { href: "/", text: "Dashboard", icon: BarChart },
  { href: "/endpoints", text: "Endpoints", icon: Layers },
  { href: "/leads", text: "Leads", icon: Contact },
  { href: "/logs", text: "Logs", icon: Disc3 },
];

const snsLinks = [
  { href: "https://router.so/docs", text: "", icon: Book },
  { href: "/support", text: "", icon: LifeBuoy },
];

const SideNav = () => {
  const { isOpen } = useSidebar();

  return (
    <aside
      className={`p-4 pr-0 flex flex-col gap-4 justify-between h-screen transition-all duration-300 ${
        isOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <Link
        href="/"
        className="h-20 border bg-muted flex items-center gap-2 rounded-lg px-6"
      >
        Dev.Ahram
      </Link>
      <nav className="border bg-muted rounded-lg flex flex-col justify-between p-6 h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="grid gap-2">
            {links.map((link) => (
              <NavLink key={link.href} icon={link.icon} href={link.href}>
                {link.text}
              </NavLink>
            ))}
          </div>
          <div className="flex gap-2 justify-center w-full">
            {snsLinks.map((link) => (
              <NavLink key={link.href} icon={link.icon} href={link.href}>
                {link.text}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SideNav;

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon: React.ComponentType<LucideProps>;
  className?: string;
}

const NavLink = ({ href, children, icon: Icon, className }: NavLinkProps) => {
  return (
    <Link
      className={`flex items-center gap-2 group p-2 rounded-md -ml-2 transition-all ${className}`}
      href={href}
    >
      <Icon
        className="text-muted-foreground group-hover:text-foreground transition-all"
        size={20}
      />
      {children}
    </Link>
  );
};
