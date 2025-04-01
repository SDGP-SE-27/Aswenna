"use client";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <main className="min-h-screen pt-16">{children}</main>
      </div>
    </div>
  );
}
