import { Link, useLocation } from '@tanstack/react-router';
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, Store, Star, DollarSign, X } from 'lucide-react';
import { useLojistaAuth } from '@/lib/lojista-auth';

const navItems = [
  { to: '/lojista/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/lojista/pedidos', label: 'Pedidos', icon: ShoppingBag },
  { to: '/lojista/cardapio', label: 'Cardápio', icon: UtensilsCrossed },
  { to: '/lojista/minha-loja', label: 'Minha Loja', icon: Store },
  { to: '/lojista/avaliacoes', label: 'Avaliações', icon: Star },
  { to: '/lojista/financeiro', label: 'Financeiro', icon: DollarSign },
] as const;

interface LojistaSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LojistaSidebar({ isOpen, onClose }: LojistaSidebarProps) {
  const location = useLocation();
  const { user } = useLojistaAuth();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <span className="text-2xl">{user?.logo ?? '🍔'}</span>
          <div className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold tracking-tight">{user?.restaurantName ?? 'Minha Loja'}</span>
            <span className="block text-xs text-sidebar-foreground/50">Painel do Lojista</span>
          </div>
          <button onClick={onClose} className="ml-auto lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <Icon size={20} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <p className="text-xs text-sidebar-foreground/50">Tô Com Fome - Lojista</p>
          <p className="text-xs text-sidebar-foreground/40">v1.0.0</p>
        </div>
      </aside>
    </>
  );
}
