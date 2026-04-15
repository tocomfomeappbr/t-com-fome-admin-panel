import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Clock } from "lucide-react";
import { mockDeliveries, statusColors } from "@/lib/mock-data";

export const Route = createFileRoute("/_admin/entregas")({
  component: EntregasPage,
});

function EntregasPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Entregas Ativas</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {mockDeliveries.map((d) => (
          <Card key={d.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Truck size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Pedido #{d.orderId}</p>
                    <p className="text-sm text-muted-foreground">{d.restaurant}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${statusColors[d.status] || ''} ${d.status === 'Saiu para entrega' ? 'animate-delivery-pulse' : ''}`}
                >
                  {d.status}
                </Badge>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={14} className="shrink-0" />
                  <span>{d.customerAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={14} />
                  <span>Previsão: {d.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Entregador:</span>
                  <span className="font-medium text-foreground">{d.driver}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-sm text-muted-foreground">
            🚀 Integração com Shipday em breve — rastreamento em tempo real para entregadores e clientes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
