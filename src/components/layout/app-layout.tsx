import Sidebar from "@/components/layout/sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F3F7F5]">
      <Sidebar />

      <main className="min-h-screen overflow-x-hidden pt-24 md:pl-[260px] md:pt-0">
        <div className="container-responsive page-padding">
          {children}
        </div>
      </main>
    </div>
  );
}