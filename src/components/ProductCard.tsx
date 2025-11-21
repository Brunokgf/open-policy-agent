import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/contexts/CartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success('Produto adicionado ao carrinho!');
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <div className="w-full">
            <p className="text-xs text-muted-foreground">{product.category}</p>
            <h3 className="font-semibold line-clamp-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-bold text-primary">
              R$ {product.price.toFixed(2)}
            </p>
            <Button
              size="icon"
              onClick={handleAddToCart}
              className="rounded-full"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
