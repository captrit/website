"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollClassProvider() {
  const pathname = usePathname();
  useEffect(() => {
    const html = document.documentElement;
    if (pathname.startsWith("/blog")) {
      html.classList.add("show-scrollbar");
    } else {
      html.classList.remove("show-scrollbar");
    }
  }, [pathname]);
  return null;
} 