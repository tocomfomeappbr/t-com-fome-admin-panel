import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Plus, Phone, MapPin } from "lucide-react";
import { mockRestaurants, type Restaurant } from "@/lib/mock-data";

export const Route = createFileRoute("/_admin/restaurantes")({
  component: RestaurantesPage,
});

function RestaurantesPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleOpen = (id: number) => {
    setRestaurants((prev) => prev.map((r) => (r.id === id ? { ...r, isOpen: !r.isOpen } : r)));
  };
  const toggleActive = (id: number) => {
    setRestaurants((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Restaurantes</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus size={16} className="mr-2" /> Novo restaurante</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Novo Restaurante</DialogTitle></DialogHeader>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setDialogOpen(false); }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Nome</Label><Input placeholder="Nome do restaurante" /></div>
                <div className="space-y-2"><Label>Categoria</Label><Input placeholder="Ex: Pizzaria" /></div>
              </div>
              <div className="space-y-2"><Label>Descrição</Label><Input placeholder="Descrição breve" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Taxa de entrega</Label><Input type="number" placeholder="5.99" /></div>
                <div className="space-y-2"><Label>Tempo estimado</Label><Input placeholder="30-45 min" /></div>
              </div>
              <div className="space-y-2"><Label>Endereço</Label><Input placeholder="Rua, número - Bairro" /></div>
              <div className="space-y-2"><Label>Telefone</Label><Input placeholder="(42) 99999-9999" /></div>
              <Button type="submit" className="w-full">Cadastrar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {restaurants.map((r) => (
          <Card key={r.id} className={`transition-opacity ${!r.isActive ? 'opacity-50' : ''}`}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-3xl">{r.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">{r.name}</h3>
                    <Badge variant="outline" className={`text-xs ${r.isOpen ? 'bg-success/20 text-success border-success/30' : 'bg-destructive/20 text-destructive border-destructive/30'}`}>
                      {r.isOpen ? 'Aberto' : 'Fechado'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.category}</p>
                  <div className="mt-1 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < Math.round(r.rating) ? 'fill-warning text-warning' : 'text-muted'} />
                    ))}
                    <span className="ml-1 text-sm font-medium text-foreground">{r.rating}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin size={12} />{r.address}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Phone size={12} />{r.phone}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-2">
                  <Switch checked={r.isOpen} onCheckedChange={() => toggleOpen(r.id)} />
                  <span className="text-xs text-muted-foreground">Aberto</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={r.isActive} onCheckedChange={() => toggleActive(r.id)} />
                  <span className="text-xs text-muted-foreground">Ativo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
