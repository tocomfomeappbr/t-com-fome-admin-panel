import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { mockProducts, mockRestaurants, formatCurrency, type Product } from "@/lib/mock-data";

export const Route = createFileRoute("/_admin/cardapio")({
  component: CardapioPage,
});

function CardapioPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedRestaurant, setSelectedRestaurant] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = selectedRestaurant === "all"
    ? products
    : products.filter((p) => p.restaurantId === Number(selectedRestaurant));

  const toggleAvailable = (id: number) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isAvailable: !p.isAvailable } : p)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground">Cardápio</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus size={16} className="mr-2" /> Novo item</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Novo Item do Cardápio</DialogTitle></DialogHeader>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setDialogOpen(false); }}>
              <div className="space-y-2"><Label>Nome</Label><Input placeholder="Nome do produto" /></div>
              <div className="space-y-2"><Label>Descrição</Label><Input placeholder="Ingredientes / descrição" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Preço</Label><Input type="number" placeholder="29.90" /></div>
                <div className="space-y-2"><Label>Categoria</Label><Input placeholder="Ex: Pizzas" /></div>
              </div>
              <div className="space-y-2"><Label>Imagem (URL)</Label><Input placeholder="https://..." /></div>
              <div className="space-y-2"><Label>Opções / Adicionais</Label><Input placeholder="Ex: Borda recheada +R$5" /></div>
              <Button type="submit" className="w-full">Adicionar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Select value={selectedRestaurant} onValueChange={setSelectedRestaurant}>
        <SelectTrigger className="w-64"><SelectValue placeholder="Selecionar restaurante" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os restaurantes</SelectItem>
          {mockRestaurants.map((r) => <SelectItem key={r.id} value={String(r.id)}>{r.name}</SelectItem>)}
        </SelectContent>
      </Select>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((p) => {
          const restaurant = mockRestaurants.find((r) => r.id === p.restaurantId);
          return (
            <Card key={p.id} className={`transition-opacity ${!p.isAvailable ? 'opacity-50' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-3xl">{p.image}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground truncate">{p.name}</h3>
                      {p.isPopular && <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">Popular</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{p.description}</p>
                    <p className="text-xs text-muted-foreground">{restaurant?.name}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <div>
                    <p className="text-lg font-bold text-primary">{formatCurrency(p.price)}</p>
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={p.isAvailable} onCheckedChange={() => toggleAvailable(p.id)} />
                    <span className="text-xs text-muted-foreground">Disponível</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
