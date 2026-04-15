import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronRight } from "lucide-react";
import { lojistaOrders, lojistaKanbanStatuses, formatCurrency, type LojistaOrder } from "@/lib/lojista-mock-data";

export const Route = createFileRoute("/lojista/_auth/pedidos")({
  component: LojistaPedidos,
});

const statusColors: Record<string, string> = {
  Novo: "border-destructive/50 bg-destructive/5",
  Confirmado: "border-info/50 bg-info/5",
  Preparando: "border-chart-4/50 bg-chart-4/5",
  Pronto: "border-primary/50 bg-primary/5",
  Saiu: "border-success/50 bg-success/5",
};

const badgeColors: Record<string, string> = {
  Novo: "bg-destructive/20 text-destructive",
  Confirmado: "bg-info/20 text-info",
  Preparando: "bg-chart-4/20 text-chart-4",
  Pronto: "bg-primary/20 text-primary",
  Saiu: "bg-success/20 text-success",
};

const nextStatus: Record<string, string> = {
  Novo: "Confirmado",
  Confirmado: "Preparando",
  Preparando: "Pronto",
  Pronto: "Saiu",
};

function LojistaPedidos() {
  const [orders, setOrders] = useState<LojistaOrder[]>(lojistaOrders);
  const [newOrderAlert, setNewOrderAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNewOrderAlert(true);
      setTimeout(() => setNewOrderAlert(false), 3000);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const advanceOrder = (orderId: number) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId && nextStatus[o.status]
          ? { ...o, status: nextStatus[o.status] as LojistaOrder["status"] }
          : o
      )
    );
  };

  const rejectOrder = (orderId: number) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Pedidos</h1>
        {newOrderAlert && (
          <Badge className="animate-delivery-pulse bg-destructive text-destructive-foreground">
            🔔 Novo pedido!
          </Badge>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {lojistaKanbanStatuses.map((status) => {
          const columnOrders = orders.filter((o) => o.status === status);
          return (
            <div key={status} className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">{status}</h2>
                <Badge variant="secondary" className="text-xs">{columnOrders.length}</Badge>
              </div>
              <div className="space-y-3">
                {columnOrders.map((order) => (
                  <Card key={order.id} className={`border-2 ${statusColors[order.status]}`}>
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground">#{order.id}</span>
                        <Badge variant="outline" className={badgeColors[order.status]}>{order.status}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        {order.items.map((item, i) => (
                          <p key={i}>{item.qty}x {item.name}</p>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">📍 {order.address}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">{formatCurrency(order.total)}</span>
                        <span className="text-xs text-muted-foreground">{order.timeElapsed}</span>
                      </div>
                      <div className="flex gap-1.5">
                        {order.status === "Novo" && (
                          <>
                            <Button size="sm" className="flex-1 h-7 text-xs" onClick={() => advanceOrder(order.id)}>
                              <Check size={14} /> Aceitar
                            </Button>
                            <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => rejectOrder(order.id)}>
                              <X size={14} />
                            </Button>
                          </>
                        )}
                        {order.status !== "Novo" && order.status !== "Saiu" && (
                          <Button size="sm" variant="outline" className="flex-1 h-7 text-xs" onClick={() => advanceOrder(order.id)}>
                            Avançar <ChevronRight size={14} />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {columnOrders.length === 0 && (
                  <div className="rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">
                    Nenhum pedido
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
