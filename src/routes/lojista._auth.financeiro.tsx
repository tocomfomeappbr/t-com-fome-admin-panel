import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { lojistaFinance, lojistaStats, formatCurrency } from "@/lib/lojista-mock-data";

export const Route = createFileRoute("/lojista/_auth/financeiro")({
  component: LojistaFinanceiro,
});

function LojistaFinanceiro() {
  const totalGross = lojistaFinance.reduce((s, e) => s + e.grossAmount, 0);
  const totalFees = lojistaFinance.reduce((s, e) => s + e.serviceFee, 0);
  const totalNet = lojistaFinance.reduce((s, e) => s + e.netAmount, 0);

  const exportCSV = () => {
    const header = "Data,Pedido,Bruto,Taxa,Líquido\n";
    const rows = lojistaFinance.map((e) => `${e.date},#${e.orderId},${e.grossAmount.toFixed(2)},${e.serviceFee.toFixed(2)},${e.netAmount.toFixed(2)}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "extrato-lojista.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const cards = [
    { label: "A receber hoje", value: formatCurrency(lojistaStats.receiveToday), icon: DollarSign },
    { label: "A receber semana", value: formatCurrency(lojistaStats.receiveWeek), icon: TrendingUp },
    { label: "A receber mês", value: formatCurrency(lojistaStats.receiveMonth), icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Financeiro</h1>
        <Button variant="outline" onClick={exportCSV}><Download size={16} /> Exportar CSV</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <c.icon size={22} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{c.label}</p>
                <p className="text-lg font-bold text-foreground">{c.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Extrato de Repasses</CardTitle>
          <div className="flex gap-4 text-sm">
            <span className="text-muted-foreground">Bruto: <strong className="text-foreground">{formatCurrency(totalGross)}</strong></span>
            <span className="text-muted-foreground">Taxas: <strong className="text-destructive">{formatCurrency(totalFees)}</strong></span>
            <span className="text-muted-foreground">Líquido: <strong className="text-primary">{formatCurrency(totalNet)}</strong></span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Pedido</TableHead>
                  <TableHead className="text-right">Bruto</TableHead>
                  <TableHead className="text-right">Taxa (10%)</TableHead>
                  <TableHead className="text-right">Líquido</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lojistaFinance.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-muted-foreground">{entry.date}</TableCell>
                    <TableCell className="font-medium">#{entry.orderId}</TableCell>
                    <TableCell className="text-right">{formatCurrency(entry.grossAmount)}</TableCell>
                    <TableCell className="text-right text-destructive">{formatCurrency(entry.serviceFee)}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">{formatCurrency(entry.netAmount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
