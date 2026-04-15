import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Calendar, Download } from "lucide-react";
import { revenueByRestaurant, formatCurrency } from "@/lib/mock-data";

export const Route = createFileRoute("/_admin/financeiro")({
  component: FinanceiroPage,
});

const financialStats = {
  today: 3847.50,
  week: 18200.00,
  month: 72450.80,
  totalOrders: 490,
  serviceFeePerOrder: 0.99,
};

function FinanceiroPage() {
  const totalServiceFees = financialStats.totalOrders * financialStats.serviceFeePerOrder;

  const exportCSV = () => {
    const header = "Restaurante,Faturamento,Pedidos\n";
    const rows = revenueByRestaurant.map((r) => `${r.restaurant},${r.revenue},${r.orders}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "faturamento-restaurantes.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = [
    { label: "Faturamento hoje", value: formatCurrency(financialStats.today), icon: DollarSign },
    { label: "Faturamento semana", value: formatCurrency(financialStats.week), icon: TrendingUp },
    { label: "Faturamento mês", value: formatCurrency(financialStats.month), icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Financeiro</h1>
        <Button variant="outline" onClick={exportCSV}>
          <Download size={16} className="mr-2" /> Exportar CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Faturamento por restaurante</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="p-4 font-medium">Restaurante</th>
                  <th className="p-4 font-medium">Faturamento</th>
                  <th className="p-4 font-medium">Pedidos</th>
                  <th className="p-4 font-medium">Ticket médio</th>
                </tr>
              </thead>
              <tbody>
                {revenueByRestaurant.map((r) => (
                  <tr key={r.restaurant} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-medium text-foreground">{r.restaurant}</td>
                    <td className="p-4 font-medium text-primary">{formatCurrency(r.revenue)}</td>
                    <td className="p-4 text-foreground">{r.orders}</td>
                    <td className="p-4 text-muted-foreground">{formatCurrency(r.revenue / r.orders)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Taxa de serviço arrecadada</p>
              <p className="text-xs text-muted-foreground">R$ {financialStats.serviceFeePerOrder.toFixed(2)} por pedido × {financialStats.totalOrders} pedidos</p>
            </div>
            <p className="text-2xl font-bold text-primary">{formatCurrency(totalServiceFees)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
