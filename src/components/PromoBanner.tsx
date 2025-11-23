import { Percent, Truck, Sparkles } from 'lucide-react';

export const PromoBanner = () => {
  return (
    <div className="bg-black py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="h-10 w-10 text-white animate-pulse" />
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              MEGA PROMOÇÃO
            </h2>
            <Sparkles className="h-10 w-10 text-white animate-pulse" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-white">
            <div className="flex items-center gap-2">
              <Percent className="h-7 w-7 animate-pulse" />
              <span className="font-bold text-3xl">29% até 70% OFF</span>
            </div>
            <div className="hidden md:block w-px h-10 bg-white/30" />
            <div className="flex items-center gap-2">
              <Truck className="h-7 w-7" />
              <span className="font-semibold text-2xl">FRETE GRÁTIS acima de R$ 199</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
