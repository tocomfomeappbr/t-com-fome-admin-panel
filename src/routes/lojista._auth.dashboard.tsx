import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, DollarSign, Star, Clock, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { lojistaStats, lojistaOrders, lojistaOrdersByHour, formatCurrency } from "@/lib/lojista-mock-data";

export const Route = createFileRoute("/lojista/_auth/dashboard")({
  component: LojistaDashboard,
});

const statusColors: Record<string, string> = {
  Novo: "bg-destructive/20 text-destructive border border-destructive/30",
  Confirmado: "bg-info/20 text-info border border-info/30",
  Preparando: "bg-chart-4/20 text-chart-4 border border-chart-4/30",
  Pronto: "bg-primary/20 text-primary border border-primary/30",
  Saiu: "bg-success/20 text-success border border-success/30",
};

function LojistaDashboard() {
  const stats = [
    { label: "Pedidos hoje", value: lojistaStats.ordersToday, icon: ShoppingBag },
    { label: "Faturamento hoje", value: formatCurrency(lojistaStats.revenueToday), icon: DollarSign },
    { label: "Avaliação média", value: `⭐ ${lojistaStats.avgRating}`, icon: Star },
    { label: "Tempo médio preparo", value: lojistaStats.avgPrepTime, icon: Clock },
  ];

  const activeOrders = lojistaOrders.filter((o) => o.status !== "Saiu");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon size={22} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-lg font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Pedidos por Hora</CardTitle></CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lojistaOrdersByHour}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
              <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Line type="monotone" dataKey="pedidos" stroke="var(--color-primary)" strokeWidth={2} dot={{ fill: "var(--color-primary)" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Pedidos Ativos</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            Ver todos <ChevronRight size={16} />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">#{order.id}</span>
                    <Badge variant="outline" className={statusColors[order.status]}>{order.status}</Badge>
                  </div>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {order.items.map((i) => `${i.qty}x ${i.name}`).join(", ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{formatCurrency(order.total)}</p>
                  <p className="text-xs text-muted-foreground">{order.timeElapsed}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
