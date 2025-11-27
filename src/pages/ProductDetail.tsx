import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';
import { toast } from 'sonner';
import { ProductImageGallery } from '@/components/ProductImageGallery';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8">
          <p>Produto não encontrado</p>
        </main>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Produto adicionado ao carrinho!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <ProductImageGallery 
            images={product.images || [product.image]} 
            productName={product.name}
          />

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-2xl font-bold text-primary mb-6">
                R$ {product.price.toFixed(2)}
              </p>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="space-y-4">
              <Button onClick={handleAddToCart} size="lg" className="w-full">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Adicionar ao Carrinho
              </Button>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Benefícios</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Fórmula dermatologicamente testada</li>
                  <li>Não testado em animais</li>
                  <li>Ingredientes naturais</li>
                  <li>Adequado para todos os tipos de pele</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
