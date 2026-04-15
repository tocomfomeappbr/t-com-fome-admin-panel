import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockUsers, formatCurrency } from "@/lib/mock-data";

export const Route = createFileRoute("/_admin/usuarios")({
  component: UsuariosPage,
});

function UsuariosPage() {
  const [search, setSearch] = useState("");

  const filtered = mockUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Usuários</h1>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <Input placeholder="Buscar por nome, email ou telefone..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="p-4 font-medium">Nome</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium hidden md:table-cell">Telefone</th>
                  <th className="p-4 font-medium hidden lg:table-cell">Cadastro</th>
                  <th className="p-4 font-medium">Pedidos</th>
                  <th className="p-4 font-medium hidden sm:table-cell">Total gasto</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{u.name}</span>
                        {u.orderCount > 5 && (
                          <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">Frequente</Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{u.email}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{u.phone}</td>
                    <td className="p-4 text-muted-foreground hidden lg:table-cell">{new Date(u.createdAt).toLocaleDateString('pt-BR')}</td>
                    <td className="p-4 font-medium text-foreground">{u.orderCount}</td>
                    <td className="p-4 font-medium text-foreground hidden sm:table-cell">{formatCurrency(u.totalSpent)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
