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
      <div className="w-full bg-gradient-to-r from-red-600 to-pink-600 py-1.5 sm:py-2 px-2 sm:px-4">
        <div className="container flex items-center justify-center">
          <p className="text-white text-[10px] sm:text-sm md:text-lg font-bold tracking-wide text-center">
            SEPHORA <span className="text-sm sm:text-xl md:text-2xl">FRIDAY</span> <span className="bg-black text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-sm">ATÉ</span> <span className="text-lg sm:text-2xl md:text-4xl font-extrabold">70% OFF</span>
          </p>
        </div>
      </div>
      <header className="sticky top-0 z-50 w-full border-b bg-black">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-2 sm:px-4 gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-6 flex-1">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight whitespace-nowrap">
              SEPHORA
            </h1>
          </Link>
          
          {onSearchChange && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-7 sm:pl-10 h-8 sm:h-10 text-sm bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
          )}
        </div>
        
        <nav className="flex items-center space-x-1 sm:space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700 h-8 w-8 sm:h-10 sm:w-10">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
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
                <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700 h-8 w-8 sm:h-10 sm:w-10">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Site 100% Seguro</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Link to="/" className="text-xs sm:text-sm font-medium text-white transition-colors hover:text-white/80 hidden sm:block">
            Produtos
          </Link>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative text-white hover:text-white/80 h-8 w-8 sm:h-10 sm:w-10">
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary text-[10px] sm:text-xs text-primary-foreground flex items-center justify-center">
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
