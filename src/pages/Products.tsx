import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Nossos Produtos</h2>
          <p className="text-muted-foreground">
            Descubra nossa linha completa de cuidados com a pele
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;
