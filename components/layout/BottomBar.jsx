"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants";

function Bottombar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 z-100 w-full bg-dark-1 px-6 py-3 flex items-center justify-between md:hidden">
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            href={link.route}
            key={link.label}
            className={`flex gap-2 items-center rounded-lg py-2 px-4 ${isActive && "bg-purple-1"}`}
          >
            {link.icon}
            <p className='text-small-medium text-light-1 max-sm:hidden'>
                {link.label.split(/\s+/)[0]}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export default Bottombar;
