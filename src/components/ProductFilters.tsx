import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export const ProductFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: ProductFiltersProps) => {
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border space-y-4">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold">Filtros e Busca</h3>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Categoria</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              <SelectItem value="FENTY SKIN">FENTY SKIN</SelectItem>
              <SelectItem value="SISLEY">SISLEY</SelectItem>
              <SelectItem value="SOL DE JANEIRO">SOL DE JANEIRO</SelectItem>
              <SelectItem value="CAUDALIE">CAUDALIE</SelectItem>
              <SelectItem value="THE ORDINARY">THE ORDINARY</SelectItem>
              <SelectItem value="GLOW RECIPE">GLOW RECIPE</SelectItem>
              <SelectItem value="DIOR">DIOR</SelectItem>
              <SelectItem value="ESTÉE LAUDER">ESTÉE LAUDER</SelectItem>
              <SelectItem value="LA MER">LA MER</SelectItem>
              <SelectItem value="SEPHORA COLLECTION">SEPHORA COLLECTION</SelectItem>
              <SelectItem value="LANCÔME">LANCÔME</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Ordenar por</label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Padrão</SelectItem>
              <SelectItem value="price-asc">Menor preço</SelectItem>
              <SelectItem value="price-desc">Maior preço</SelectItem>
              <SelectItem value="name-asc">A-Z</SelectItem>
              <SelectItem value="name-desc">Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
