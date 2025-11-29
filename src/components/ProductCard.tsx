import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/contexts/CartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success('Produto adicionado ao carrinho!');
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
  };

  // Calcular desconto fictício de 20% para exibição
  const originalPrice = product.price * 1.25;
  const discountPercent = 20;

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg relative">
        {/* Badge de desconto */}
        <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold z-10">
          -{discountPercent}%
        </div>
        
        {/* Botão de favorito */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
          />
        </button>

        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden bg-gray-50">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <div className="w-full">
            <p className="text-xs font-semibold text-foreground uppercase">{product.category}</p>
            <h3 className="font-normal text-sm line-clamp-2 mt-1">{product.name}</h3>
          </div>
          <div className="w-full space-y-1">
            <div className="flex w-full items-start justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground line-through">
                  R$ {originalPrice.toFixed(2)}
                </p>
                <p className="text-lg font-bold text-foreground">
                  R$ {product.price.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  OU 9X DE R$ {(product.price / 9).toFixed(2)}
                </p>
              </div>
              <Button
                size="icon"
                onClick={handleAddToCart}
                className="rounded-full flex-shrink-0"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
