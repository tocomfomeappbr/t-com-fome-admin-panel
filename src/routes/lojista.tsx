import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LojistaAuthProvider } from "@/lib/lojista-auth";

export const Route = createFileRoute("/lojista")({
  component: LojistaRoot,
});

function LojistaRoot() {
  return (
    <LojistaAuthProvider>
      <Outlet />
    </LojistaAuthProvider>
  );
}
