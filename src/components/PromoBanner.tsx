import { Percent, Truck, Sparkles } from 'lucide-react';

export const PromoBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-accent to-primary py-8 px-4 animate-gradient">
      <div className="container mx-auto">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-primary-foreground animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
              MEGA PROMOÇÃO
            </h2>
            <Sparkles className="h-8 w-8 text-primary-foreground animate-pulse" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-primary-foreground">
            <div className="flex items-center gap-2">
              <Percent className="h-6 w-6 animate-pulse" />
              <span className="font-bold text-2xl">29% até 70% OFF</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-primary-foreground/30" />
            <div className="flex items-center gap-2">
              <Truck className="h-6 w-6" />
              <span className="font-semibold text-xl">FRETE GRÁTIS acima de R$ 199</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
