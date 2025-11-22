import { Percent, Truck } from 'lucide-react';

export const PromoBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-accent to-primary py-4 px-4 animate-gradient">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-primary-foreground">
          <div className="flex items-center gap-2">
            <Percent className="h-5 w-5 animate-pulse" />
            <span className="font-bold text-lg">29% até 70% OFF</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-primary-foreground/30" />
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            <span className="font-semibold">FRETE GRÁTIS em compras acima de R$ 199</span>
          </div>
        </div>
      </div>
    </div>
  );
};
