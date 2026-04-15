import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import { lojistaReviews } from "@/lib/lojista-mock-data";

export const Route = createFileRoute("/lojista/_auth/avaliacoes")({
  component: LojistaAvaliacoes,
});

function LojistaAvaliacoes() {
  const [filterStars, setFilterStars] = useState<number | null>(null);

  const filtered = filterStars ? lojistaReviews.filter((r) => r.rating === filterStars) : lojistaReviews;
  const avg = (lojistaReviews.reduce((s, r) => s + r.rating, 0) / lojistaReviews.length).toFixed(1);
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: lojistaReviews.filter((r) => r.rating === stars).length,
    pct: (lojistaReviews.filter((r) => r.rating === stars).length / lojistaReviews.length) * 100,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Avaliações</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <span className="text-5xl font-bold text-foreground">{avg}</span>
            <div className="mt-2 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={20} className={s <= Math.round(Number(avg)) ? "fill-chart-4 text-chart-4" : "text-muted-foreground/30"} />
              ))}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{lojistaReviews.length} avaliações</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Distribuição</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {distribution.map((d) => (
              <button key={d.stars} onClick={() => setFilterStars(filterStars === d.stars ? null : d.stars)}
                className={`flex w-full items-center gap-3 rounded-md px-2 py-1 transition-colors ${filterStars === d.stars ? "bg-accent" : "hover:bg-accent/50"}`}>
                <span className="flex items-center gap-1 text-sm font-medium w-8">{d.stars} <Star size={12} className="fill-chart-4 text-chart-4" /></span>
                <Progress value={d.pct} className="flex-1 h-2" />
                <span className="text-xs text-muted-foreground w-6 text-right">{d.count}</span>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button variant={filterStars === null ? "default" : "outline"} size="sm" onClick={() => setFilterStars(null)}>Todas</Button>
        {[5, 4, 3, 2, 1].map((s) => (
          <Button key={s} variant={filterStars === s ? "default" : "outline"} size="sm" onClick={() => setFilterStars(filterStars === s ? null : s)}>
            {s} ⭐
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{review.customer}</span>
                    <Badge variant="outline" className="text-xs">Pedido #{review.orderId}</Badge>
                  </div>
                  <div className="mt-1 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} className={s <= review.rating ? "fill-chart-4 text-chart-4" : "text-muted-foreground/30"} />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
