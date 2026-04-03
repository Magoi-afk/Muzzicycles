import { Filter, ChevronDown, Heart, Star, Plus, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { motion } from 'motion/react';
import LogoCloud from './LogoCloud';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  favorites: Product[];
  onToggleFavorite: (product: Product) => void;
  searchQuery?: string;
}

export default function ProductGrid({ 
  onAddToCart, 
  onProductClick,
  favorites,
  onToggleFavorite,
  searchQuery = ''
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [sortBy, setSortBy] = useState<string>('Destaques');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const categories = ['Todos', 'Urbana', 'Aventura', 'Performance', 'Componentes'];
  const sortOptions = ['Destaques', 'Avaliação'];

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'Avaliação') return b.rating - a.rating;
    return 0; // Destaques (default order)
  });

  return (
    <section id="models" className="max-w-7xl mx-auto px-6 sm:px-8">
      <LogoCloud />
      
      {/* Filters / Category Toolbar */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-black/5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl text-black tracking-tighter font-geist">Nossos Modelos</h2>
            <span className="text-sm text-black/50 font-geist">Coleção 2026</span>
          </div>
          <p className="text-sm text-black/40 font-geist">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'modelo encontrado' : 'modelos encontrados'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 h-9 rounded-full text-sm font-geist transition-all duration-300 ${
                  selectedCategory === cat 
                    ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                    : 'bg-black/5 text-black/60 hover:bg-black/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-48">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full h-9 px-4 rounded-full border border-black/5 bg-white text-sm text-black/70 hover:bg-black/5 transition-all flex items-center justify-between font-geist"
            >
              <span>{sortBy}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isSortOpen && (
              <div className="absolute right-0 top-full mt-2 w-full rounded-2xl border border-black/5 bg-white shadow-2xl overflow-hidden z-30 py-1">
                {sortOptions.map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => {
                      setSortBy(opt);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-geist transition-colors ${
                      sortBy === opt ? 'bg-brand-blue/5 text-brand-blue' : 'text-black/60 hover:bg-black/5'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Product Grid */}
      <div id="featured" className="py-8 sm:py-10">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group block rounded-3xl overflow-hidden bg-white/40 backdrop-blur border border-black/5 hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden cursor-pointer" onClick={() => onProductClick(product)}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {product.tag && (
                    <div className={`absolute top-3 left-3 inline-flex items-center px-2.5 h-7 rounded-full text-xs font-geist border ${product.tagColor}`}>
                      {product.tag}
                    </div>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(product);
                    }}
                    className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/40 border border-black/5 text-black/70 hover:text-black hover:bg-white/80 transition z-10"
                  >
                    <Heart className={`w-4 h-4 ${favorites.some(f => f.id === product.id) ? 'fill-brand-blue text-brand-blue' : ''}`} />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 cursor-pointer" onClick={() => onProductClick(product)}>
                      <h3 className="text-base font-medium text-black tracking-tight font-geist">{product.name}</h3>
                      <p className="text-sm text-black/60 font-geist">{product.description}</p>
                      <div className="mt-2 flex items-center gap-1 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                          />
                        ))}
                        <span className="text-xs text-black/50 ml-1 font-geist">({product.reviews})</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-end">
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="inline-flex items-center gap-2 h-9 px-3 rounded-xl bg-brand-blue text-white text-sm hover:bg-brand-blue-dark transition font-geist"
                    >
                      Adicionar ao carrinho
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-black/5 mb-6">
              <Search className="h-10 w-10 text-black/20" />
            </div>
            <h3 className="text-2xl font-medium tracking-tighter font-geist text-black mb-2">Nenhum resultado encontrado</h3>
            <p className="text-black/50 font-geist">Tente pesquisar por outros termos ou limpe os filtros.</p>
          </div>
        )}
      </div>
    </section>
  );
}
