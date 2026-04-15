import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChevronRight, X } from "lucide-react";
import { mockOrders, mockRestaurants, statusColors, formatCurrency, type OrderStatus, type Order } from "@/lib/mock-data";

export const Route = createFileRoute("/_admin/pedidos")({
  component: PedidosPage,
});

const allStatuses: OrderStatus[] = ['Pendente', 'Confirmado', 'Preparando', 'Saiu para entrega', 'Entregue', 'Cancelado'];
const statusFlow: Record<string, OrderStatus | null> = {
  'Pendente': 'Confirmado',
  'Confirmado': 'Preparando',
  'Preparando': 'Saiu para entrega',
  'Saiu para entrega': 'Entregue',
  'Entregue': null,
  'Cancelado': null,
};

function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRestaurant, setFilterRestaurant] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = orders.filter((o) => {
    if (filterStatus !== "all" && o.status !== filterStatus) return false;
    if (filterRestaurant !== "all" && o.restaurant !== filterRestaurant) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const advanceStatus = (id: number) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next = statusFlow[o.status];
        return next ? { ...o, status: next } : o;
      })
    );
  };

  const cancelOrder = (id: number) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'Cancelado' as OrderStatus } : o)));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Pedidos</h1>

      <div className="flex flex-wrap gap-3">
        <Select value={filterStatus} onValueChange={(v) => { setFilterStatus(v); setPage(1); }}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {allStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterRestaurant} onValueChange={(v) => { setFilterRestaurant(v); setPage(1); }}>
          <SelectTrigger className="w-52"><SelectValue placeholder="Restaurante" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos restaurantes</SelectItem>
            {mockRestaurants.map((r) => <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="p-4 font-medium">#</th>
                  <th className="p-4 font-medium">Cliente</th>
                  <th className="p-4 font-medium">Restaurante</th>
                  <th className="p-4 font-medium hidden lg:table-cell">Itens</th>
                  <th className="p-4 font-medium">Valor</th>
                  <th className="p-4 font-medium hidden md:table-cell">Pagamento</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((o) => (
                  <tr key={o.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-medium text-foreground">{o.id}</td>
                    <td className="p-4 text-foreground">{o.customer}</td>
                    <td className="p-4 text-muted-foreground">{o.restaurant}</td>
                    <td className="p-4 text-muted-foreground hidden lg:table-cell max-w-[200px] truncate">{o.items}</td>
                    <td className="p-4 font-medium text-foreground">{formatCurrency(o.total)}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{o.payment}</td>
                    <td className="p-4">
                      <Badge variant="outline" className={`text-xs ${statusColors[o.status]} ${o.status === 'Saiu para entrega' ? 'animate-delivery-pulse' : ''}`}>
                        {o.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {statusFlow[o.status] && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={() => advanceStatus(o.id)} title="Avançar status">
                            <ChevronRight size={16} />
                          </Button>
                        )}
                        {o.status !== 'Cancelado' && o.status !== 'Entregue' && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => cancelOrder(o.id)} title="Cancelar">
                            <X size={16} />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>Anterior</Button>
          <span className="text-sm text-muted-foreground">Página {page} de {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Próxima</Button>
        </div>
      )}
    </div>
  );
}
