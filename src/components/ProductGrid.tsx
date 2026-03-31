import { Filter, ChevronDown, Heart, Star, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { motion } from 'motion/react';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <section id="models" className="max-w-7xl mx-auto px-6 sm:px-8">
      {/* Filters / Category Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-black/5">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl sm:text-3xl text-black tracking-tighter font-geist">Nossos Modelos</h2>
          <span className="text-sm text-black/50 font-geist">Coleção 2026</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Custom Filter Button */}
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-xl border border-black/5 bg-white text-sm text-black/70 hover:bg-black/5 transition font-geist"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            {/* Popover */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-[320px] rounded-2xl border border-black/5 bg-white shadow-xl p-4 z-20">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-black/70 font-geist">Refine</h3>
                  <button className="text-xs text-black/60 hover:text-black underline decoration-dotted font-geist">Clear all</button>
                </div>
                <div className="mt-4 space-y-4">
                  {/* Sizes */}
                  <div>
                    <p className="text-xs text-black/60 mb-2 font-geist">Size</p>
                    <div className="flex flex-wrap gap-2">
                      {[7, 8, 9, 10, 11].map(size => (
                        <label key={size} className="inline-flex items-center gap-2 px-3 h-8 rounded-lg border border-black/5 bg-black/5 text-xs text-black/70 cursor-pointer select-none">
                          <input type="checkbox" className="peer appearance-none h-0 w-0" />
                          <span className="peer-checked:text-black peer-checked:bg-white peer-checked:border-black/10 px-0 font-geist">{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Color */}
                  <div>
                    <p className="text-xs text-black/60 mb-2 font-geist">Color</p>
                    <div className="flex items-center gap-2">
                      {['bg-black', 'bg-white border border-black/5', 'bg-red-500', 'bg-blue-500', 'bg-emerald-500'].map((color, i) => (
                        <button key={i} className={`h-6 w-6 rounded-full ring-2 ring-black/5 ${color}`}></button>
                      ))}
                    </div>
                  </div>
                  {/* Sort */}
                  <div>
                    <p className="text-xs text-black/60 mb-2 font-geist">Sort</p>
                    <div className="relative">
                      <button 
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="w-full h-9 px-3 rounded-lg border border-black/5 bg-white text-sm text-black/70 hover:bg-black/5 transition inline-flex items-center justify-between"
                      >
                        <span className="font-geist">Featured</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {isSortOpen && (
                        <div className="absolute z-10 mt-2 w-full rounded-xl border border-black/5 bg-white shadow-lg overflow-hidden">
                          {['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Best Rated'].map(opt => (
                            <button key={opt} className="w-full text-left px-3 py-2 text-sm hover:bg-black/5 font-geist">{opt}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pt-2">
                    <button className="w-full h-9 rounded-xl bg-black text-white text-sm hover:opacity-90 transition font-geist">Apply filters</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Compact "chip" filters */}
          <div className="hidden sm:flex items-center gap-2">
            {['Running', 'Lifestyle', 'Skate'].map(cat => (
              <span key={cat} className="inline-flex items-center gap-2 px-3 h-9 rounded-xl border border-black/5 bg-white text-sm text-black/70 font-geist">{cat}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div id="featured" className="py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group block rounded-3xl overflow-hidden bg-white/40 backdrop-blur border border-black/5 hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-300"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
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
                <button className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/60 border border-black/5 text-black/70 hover:text-black hover:bg-white/80 transition">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
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
                  <div className="shrink-0 text-right">
                    {product.originalPrice && (
                      <p className="text-sm text-black/50 line-through font-geist">${product.originalPrice}</p>
                    )}
                    <p className="text-sm text-black/80 font-geist">${product.price}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex -space-x-1">
                    {product.colors.map((color, i) => (
                      <span key={i} className={`h-5 w-5 rounded-full ring-2 ring-white border border-black/5 ${color}`}></span>
                    ))}
                  </div>
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="inline-flex items-center gap-2 h-9 px-3 rounded-xl border border-black/5 bg-white text-sm text-black/70 hover:bg-black/5 transition font-geist"
                  >
                    Add to cart
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <button className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-black/5 bg-white text-black/70 hover:bg-black/5 transition" aria-label="Prev">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-black/5 bg-black text-white transition font-geist">1</button>
          <button className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-black/5 bg-white text-black/70 hover:bg-black/5 transition font-geist">2</button>
          <button className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-black/5 bg-white text-black/70 hover:bg-black/5 transition font-geist">3</button>
          <button className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-black/5 bg-white text-black/70 hover:bg-black/5 transition" aria-label="Next">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
