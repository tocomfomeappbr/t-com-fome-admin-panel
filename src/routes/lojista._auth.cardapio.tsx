import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { mockProducts, formatCurrency, type Product } from "@/lib/mock-data";

export const Route = createFileRoute("/lojista/_auth/cardapio")({
  component: LojistaCardapio,
});

interface OptionGroup {
  name: string;
  required: boolean;
  maxSelect: number;
  items: { name: string; price: number }[];
}

function LojistaCardapio() {
  const [products, setProducts] = useState<Product[]>(mockProducts.filter((p) => p.restaurantId === 2));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([]);

  const categories = [...new Set(products.map((p) => p.category))];

  const toggleAvailability = (id: number) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isAvailable: !p.isAvailable } : p)));
  };

  const addOptionGroup = () => {
    setOptionGroups((prev) => [...prev, { name: "", required: false, maxSelect: 1, items: [{ name: "", price: 0 }] }]);
  };

  const removeOptionGroup = (idx: number) => {
    setOptionGroups((prev) => prev.filter((_, i) => i !== idx));
  };

  const addOptionItem = (groupIdx: number) => {
    setOptionGroups((prev) =>
      prev.map((g, i) => (i === groupIdx ? { ...g, items: [...g.items, { name: "", price: 0 }] } : g))
    );
  };

  const handleSave = () => {
    if (!newName || !newPrice) return;
    const newProduct: Product = {
      id: Date.now(),
      restaurantId: 2,
      name: newName,
      description: newDesc,
      price: parseFloat(newPrice),
      category: newCategory || "Outros",
      image: "🍔",
      isPopular: false,
      isAvailable: true,
    };
    setProducts((prev) => [newProduct, ...prev]);
    setNewName(""); setNewDesc(""); setNewPrice(""); setNewCategory("");
    setOptionGroups([]);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Cardápio</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus size={16} /> Novo Item</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader><DialogTitle>Novo Item do Cardápio</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Ex: X-Tudo" />
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Descrição do item..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preço (R$)</Label>
                  <Input type="number" step="0.01" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="0,00" />
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">Opções / Adicionais</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addOptionGroup}><Plus size={14} /> Grupo</Button>
                </div>
                {optionGroups.map((group, gi) => (
                  <Card key={gi}>
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <Input placeholder="Nome do grupo (ex: Ponto da carne)" className="flex-1" value={group.name}
                          onChange={(e) => setOptionGroups((prev) => prev.map((g, i) => (i === gi ? { ...g, name: e.target.value } : g)))} />
                        <Button variant="ghost" size="icon" onClick={() => removeOptionGroup(gi)}><Trash2 size={14} /></Button>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <label className="flex items-center gap-1.5">
                          <Switch checked={group.required} onCheckedChange={(v) => setOptionGroups((prev) => prev.map((g, i) => (i === gi ? { ...g, required: v } : g)))} />
                          Obrigatório
                        </label>
                        <label className="flex items-center gap-1.5">
                          Máx:
                          <Input type="number" className="w-14 h-7" value={group.maxSelect}
                            onChange={(e) => setOptionGroups((prev) => prev.map((g, i) => (i === gi ? { ...g, maxSelect: parseInt(e.target.value) || 1 } : g)))} />
                        </label>
                      </div>
                      {group.items.map((item, ii) => (
                        <div key={ii} className="flex gap-2">
                          <Input placeholder="Nome" className="flex-1" value={item.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              setOptionGroups((prev) => prev.map((g, i) => i === gi ? { ...g, items: g.items.map((it, j) => j === ii ? { ...it, name: val } : it) } : g));
                            }} />
                          <Input type="number" step="0.01" placeholder="R$" className="w-20" value={item.price || ""}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setOptionGroups((prev) => prev.map((g, i) => i === gi ? { ...g, items: g.items.map((it, j) => j === ii ? { ...it, price: val } : it) } : g));
                            }} />
                        </div>
                      ))}
                      <Button type="button" variant="ghost" size="sm" className="text-xs" onClick={() => addOptionItem(gi)}>
                        <Plus size={12} /> Adicionar opção
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button className="w-full" onClick={handleSave}>Salvar Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className={!product.isAvailable ? "opacity-60" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{product.image}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                    {product.isPopular && <Badge variant="secondary" className="text-xs">Popular</Badge>}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground truncate">{product.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-primary">{formatCurrency(product.price)}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{product.isAvailable ? "Disponível" : "Indisponível"}</span>
                      <Switch checked={product.isAvailable} onCheckedChange={() => toggleAvailability(product.id)} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
