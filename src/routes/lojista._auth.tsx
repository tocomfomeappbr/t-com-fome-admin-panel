import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLojistaAuth } from "@/lib/lojista-auth";
import { LojistaSidebar } from "@/components/LojistaSidebar";
import { LojistaHeader } from "@/components/LojistaHeader";

export const Route = createFileRoute("/lojista/_auth")({
  component: LojistaAuthLayout,
});

function LojistaAuthLayout() {
  const { isAuthenticated } = useLojistaAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/lojista/login" });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <LojistaSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <LojistaHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
