// components/ClientLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isMapboxPage = pathname === "/mapbox"; // or startsWith for nested paths

  return (
    <>
      {!isMapboxPage && <Header />}
      <div className={!isMapboxPage ? "mt-20" : ""}>{children}</div>
      {!isMapboxPage && <Footer />}
    </>
  );
}
