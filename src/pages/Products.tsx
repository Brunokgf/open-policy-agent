import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { PromoBanner } from '@/components/PromoBanner';
import { HeroBanners } from '@/components/HeroBanners';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { products } from '@/data/products';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return sorted;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PromoBanner />
      <div className="container px-4 py-6">
        <HeroBanners />
      </div>
      <main className="container px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Início</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Skincare</span>
        </div>

        {/* Título */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">SKINCARE</h1>

        {/* Layout com sidebar de filtros à esquerda */}
        <div className="flex gap-8">
          {/* Sidebar de Filtros */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </aside>

          {/* Área de produtos */}
          <div className="flex-1">
            {/* Barra de informações e ordenação */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Total de {filteredAndSortedProducts.length} produtos
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Ordenar por</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Novidades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Novidades</SelectItem>
                    <SelectItem value="price-asc">Menor preço</SelectItem>
                    <SelectItem value="price-desc">Maior preço</SelectItem>
                    <SelectItem value="name-asc">A-Z</SelectItem>
                    <SelectItem value="name-desc">Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grid de produtos */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

export default Products;
