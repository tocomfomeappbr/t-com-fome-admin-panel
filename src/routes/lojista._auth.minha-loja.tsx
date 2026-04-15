import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { lojistaBusinessHours, type BusinessHours } from "@/lib/lojista-mock-data";

export const Route = createFileRoute("/lojista/_auth/minha-loja")({
  component: LojistaMinhaLoja,
});

function LojistaMinhaLoja() {
  const [storeOpen, setStoreOpen] = useState(true);
  const [name, setName] = useState("Burger House PG");
  const [description, setDescription] = useState("Hambúrgueres artesanais com ingredientes selecionados.");
  const [category, setCategory] = useState("Hamburgueria");
  const [address, setAddress] = useState("Av. Carlos Cavalcanti, 3500 - Uvaranas");
  const [phone, setPhone] = useState("(42) 99902-5678");
  const [deliveryFee, setDeliveryFee] = useState("4.99");
  const [minOrder, setMinOrder] = useState("15.00");
  const [estimatedTime, setEstimatedTime] = useState("25-40");
  const [hours, setHours] = useState<BusinessHours[]>(lojistaBusinessHours);

  const updateHour = (idx: number, field: keyof BusinessHours, value: string | boolean) => {
    setHours((prev) => prev.map((h, i) => (i === idx ? { ...h, [field]: value } : h)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Minha Loja</h1>
        <div className="flex items-center gap-3">
          <Badge variant={storeOpen ? "default" : "secondary"} className={storeOpen ? "bg-success text-success-foreground" : ""}>
            {storeOpen ? "Aberta" : "Fechada"}
          </Badge>
          <Switch checked={storeOpen} onCheckedChange={setStoreOpen} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Informações</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Endereço</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Taxa de Entrega (R$)</Label>
                <Input type="number" step="0.01" value={deliveryFee} onChange={(e) => setDeliveryFee(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Pedido Mínimo (R$)</Label>
                <Input type="number" step="0.01" value={minOrder} onChange={(e) => setMinOrder(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Tempo Estimado (min)</Label>
                <Input value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} />
              </div>
            </div>
            <Button className="w-full">Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Horários de Funcionamento</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {hours.map((h, i) => (
              <div key={h.day} className="flex items-center gap-3">
                <Switch checked={h.enabled} onCheckedChange={(v) => updateHour(i, "enabled", v)} />
                <span className="w-20 text-sm font-medium text-foreground">{h.day}</span>
                {h.enabled ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input type="time" className="h-8 text-sm" value={h.open} onChange={(e) => updateHour(i, "open", e.target.value)} />
                    <span className="text-xs text-muted-foreground">às</span>
                    <Input type="time" className="h-8 text-sm" value={h.close} onChange={(e) => updateHour(i, "close", e.target.value)} />
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Fechado</span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
