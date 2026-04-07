import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export default function FavoritesDrawer({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onAddToCart,
  onProductClick
}: FavoritesDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <header className="p-6 border-b border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-brand-blue fill-brand-blue" />
                <h2 className="text-xl font-medium font-geist">Seus Favoritos</h2>
              </div>
              <button 
                onClick={onClose}
                className="h-10 w-10 rounded-full hover:bg-black/5 flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-black/20" />
                  </div>
                  <p className="text-black/40 font-geist">Sua lista de desejos está vazia.</p>
                  <button 
                    onClick={onClose}
                    className="mt-4 text-brand-blue font-medium hover:underline font-geist"
                  >
                    Explorar modelos
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div 
                        className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden cursor-pointer"
                        onClick={() => {
                          onProductClick(item);
                          onClose();
                        }}
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 
                            className="font-medium font-geist truncate cursor-pointer hover:text-brand-blue transition"
                            onClick={() => {
                              onProductClick(item);
                              onClose();
                            }}
                          >
                            {item.name}
                          </h3>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="text-black/20 hover:text-red-500 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mb-3"></div>
                        {!item.isAcervo && (
                          <button 
                            onClick={() => onAddToCart(item)}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue hover:text-brand-blue-dark transition font-geist"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            Adicionar ao carrinho
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <footer className="p-6 border-t border-black/5 bg-gray-50">
              <button 
                onClick={onClose}
                className="w-full h-12 rounded-xl border border-black/5 bg-white text-black text-sm font-medium hover:bg-black/5 transition font-geist"
              >
                Continuar Navegando
              </button>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
