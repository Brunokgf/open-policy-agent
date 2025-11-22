import { ShoppingCart, Shield, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export const Header = () => {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">
            SEPHORA
          </h1>
        </Link>
        
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
          
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Produtos
          </Link>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
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
  );
};
