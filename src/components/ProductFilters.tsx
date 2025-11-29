import { SlidersHorizontal } from 'lucide-react';
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
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">FILTROS</h3>
        <Button 
          variant="link" 
          className="text-primary text-sm p-0 h-auto"
          onClick={() => onCategoryChange('all')}
        >
          LIMPAR TUDO
        </Button>
      </div>
      
      <div>
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          SKINCARE
        </h4>
        
        <div className="space-y-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'ghost'}
            className="w-full justify-start text-sm font-normal"
            onClick={() => onCategoryChange('all')}
          >
            Todos os produtos
          </Button>
          
          <Button
            variant={selectedCategory === 'FENTY SKIN' ? 'default' : 'ghost'}
            className="w-full justify-start text-sm font-normal"
            onClick={() => onCategoryChange('FENTY SKIN')}
          >
            FENTY SKIN
          </Button>
          
          <Button
            variant={selectedCategory === 'SISLEY' ? 'default' : 'ghost'}
            className="w-full justify-start text-sm font-normal"
            onClick={() => onCategoryChange('SISLEY')}
          >
            SISLEY
          </Button>
          
          <Button
            variant={selectedCategory === 'SOL DE JANEIRO' ? 'default' : 'ghost'}
            className="w-full justify-start text-sm font-normal"
            onClick={() => onCategoryChange('SOL DE JANEIRO')}
          >
            SOL DE JANEIRO
          </Button>
          
          <Button
            variant={selectedCategory === 'CAUDALIE' ? 'default' : 'ghost'}
            className="w-full justify-start text-sm font-normal"
            onClick={() => onCategoryChange('CAUDALIE')}
          >
            CAUDALIE
          </Button>
          
          <Button
            variant={selectedCategory === 'THE ORDINARY' ? 'default' : 'ghost'}
            className="w-full justify-start text-sm font-normal"
            onClick={() => onCategoryChange('THE ORDINARY')}
          >
            THE ORDINARY
          </Button>
          
          <Button
            variant={selectedCategory === 'GLOW RECIPE' ? 'default' : 'ghost'}
            className="w-full justify-start text-sm font-normal"
            onClick={() => onCategoryChange('GLOW RECIPE')}
          >
            GLOW RECIPE
          </Button>
          
          <Button
            variant={selectedCategory === 'DIOR' ? 'default' : 'ghost'}
            className="w-full justify-start text-sm font-normal"
            onClick={() => onCategoryChange('DIOR')}
          >
            DIOR
          </Button>
          
          <Button
            variant={selectedCategory === 'ESTÉE LAUDER' ? 'default' : 'ghost'}
            className="w-full justify-start text-sm font-normal"
            onClick={() => onCategoryChange('ESTÉE LAUDER')}
          >
            ESTÉE LAUDER
          </Button>
          
          <Button
            variant={selectedCategory === 'LA MER' ? 'default' : 'ghost'}
            className="w-full justify-start text-sm font-normal"
            onClick={() => onCategoryChange('LA MER')}
          >
            LA MER
          </Button>
          
          <Button
            variant={selectedCategory === 'SEPHORA COLLECTION' ? 'default' : 'ghost'}
            className="w-full justify-start text-sm font-normal"
            onClick={() => onCategoryChange('SEPHORA COLLECTION')}
          >
            SEPHORA COLLECTION
          </Button>
          
          <Button
            variant={selectedCategory === 'LANCÔME' ? 'default' : 'ghost'}
            className="w-full justify-start text-sm font-normal"
            onClick={() => onCategoryChange('LANCÔME')}
          >
            LANCÔME
          </Button>
        </div>
      </div>
    </div>
  );
};
