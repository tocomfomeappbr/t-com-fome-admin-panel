import { useNavigate } from '@tanstack/react-router';
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLojistaAuth } from '@/lib/lojista-auth';
import { useTheme } from '@/lib/theme';
import { Moon, Sun } from 'lucide-react';

interface LojistaHeaderProps {
  onMenuClick: () => void;
}

export function LojistaHeader({ onMenuClick }: LojistaHeaderProps) {
  const { user, logout } = useLojistaAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate({ to: '/lojista/login' });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-4 lg:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
        <Menu size={20} />
      </Button>

      <div className="flex-1" />

      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </Button>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-foreground">{user?.restaurantName}</p>
          <p className="text-xs text-muted-foreground">{user?.name}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-lg">
          {user?.logo}
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair">
          <LogOut size={18} />
        </Button>
      </div>
    </header>
  );
}
