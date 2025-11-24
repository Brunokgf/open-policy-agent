import { ShoppingCart, Shield, MessageCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Input } from './ui/input';

interface HeaderProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export const Header = ({ searchTerm = '', onSearchChange }: HeaderProps) => {
  const { totalItems } = useCart();

  return (
    <>
      <div className="w-full bg-gradient-to-r from-red-600 to-pink-600 py-2 px-4">
        <div className="container flex items-center justify-center">
          <p className="text-white text-sm md:text-lg font-bold tracking-wide">
            SEPHORA <span className="text-xl md:text-2xl">FRIDAY</span> <span className="bg-black text-white px-2 py-1 rounded">ATÉ</span> <span className="text-2xl md:text-4xl font-extrabold">70% OFF</span>
          </p>
        </div>
      </div>
      <header className="sticky top-0 z-50 w-full border-b bg-black">
      <div className="container flex h-16 items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-6 flex-1">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-white tracking-tight whitespace-nowrap">
              SEPHORA
            </h1>
          </Link>
          
          {onSearchChange && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
          )}
        </div>
        
        <nav className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>WhatsApp: (11) 99999-9999</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700">
                  <Shield className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Site 100% Seguro</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Link to="/" className="text-sm font-medium text-white transition-colors hover:text-white/80">
            Produtos
          </Link>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative text-white hover:text-white/80">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
    </>
  );
};
