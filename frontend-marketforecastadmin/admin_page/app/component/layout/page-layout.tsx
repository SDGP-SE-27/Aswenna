"use client";

// import { SidebarMain } from "./sidebar-demo";
// import { Sidebar } from "./simple-sidebar";

// import { Footer } from "./footer";
// import { Navbar } from "./navbar";
// import { BackgroundPaths } from "../ui/floating-paths";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* <div className="fixed inset-0 z-0">
        <BackgroundPaths />
      </div> */}
      <div className="relative z-10">
        {/* <Navbar /> */}
        {/* <SidebarMain /> */}
        <main className="min-h-screen pt-16">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
