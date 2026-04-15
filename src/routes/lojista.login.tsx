import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useLojistaAuth } from "@/lib/lojista-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const Route = createFileRoute("/lojista/login")({
  component: LojistaLoginPage,
});

function LojistaLoginPage() {
  const { login, isAuthenticated } = useLojistaAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    navigate({ to: "/lojista/dashboard" });
    return null;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(email, password);
    if (success) {
      navigate({ to: "/lojista/dashboard" });
    } else {
      setError("Email ou senha incorretos.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center gap-2 pb-2">
          <span className="text-5xl">🍔</span>
          <h1 className="text-2xl font-bold text-foreground">Painel do Lojista</h1>
          <p className="text-sm text-muted-foreground">Tô Com Fome - Marketplace</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
            )}
            <div className="space-y-2">
              <Label htmlFor="lojista-email">Email</Label>
              <Input id="lojista-email" type="email" placeholder="lojista@burgerhousepg.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lojista-password">Senha</Label>
              <Input id="lojista-password" type="password" placeholder="••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">Entrar</Button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Ponta Grossa - PR • Versão 1.0
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
