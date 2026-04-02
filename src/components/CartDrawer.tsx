import { ShoppingBag, X, PackageOpen, Package, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }: CartDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40"
          />
          
          {/* Panel */}
          <motion.aside 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl border-l border-black/5 flex flex-col"
          >
            <header className="flex items-center justify-between px-5 h-14 border-b border-black/5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <h3 className="text-sm font-medium tracking-tight font-geist">Seu carrinho</h3>
              </div>
              <button 
                onClick={onClose}
                className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-black/5 bg-white text-black/70 hover:bg-black/5 transition" 
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 py-10 text-center text-black/60">
                  <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-black/60">
                    <PackageOpen className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-geist">Seu carrinho está vazio.</p>
                  <p className="text-xs text-black/50 mt-1 font-geist">Adicione uma bike para começar.</p>
                </div>
              ) : (
                <ul className="divide-y divide-black/5">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 p-4">
                      <div className="h-14 w-14 rounded-xl bg-black/5 border border-black/5 flex items-center justify-center overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-black">{item.name}</p>
                        <p className="text-xs text-black/60">Tamanho — Informe ao vendedor</p>
                        <div className="mt-2 inline-flex items-center gap-2">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-black/5 hover:bg-black/5" 
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="min-w-[1.5rem] text-center text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-black/5 hover:bg-black/5" 
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="ml-2 inline-flex items-center gap-1 h-8 px-2 rounded-lg border border-black/5 hover:bg-black/5 text-xs text-black/70"
                          >
                            <Trash2 className="w-3 h-3" />
                            Remover
                          </button>
                        </div>
                      </div>
                      <div className="text-sm font-medium"></div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <footer className="border-t border-black/5 p-5">
              <div className="flex gap-2">
                <button 
                  onClick={onClose}
                  className="flex-1 h-10 rounded-xl border border-black/5 bg-white text-sm text-black/70 hover:bg-black/5 transition font-geist"
                >
                  Continuar comprando
                </button>
                <button 
                  onClick={onCheckout}
                  disabled={items.length === 0}
                  className="flex-1 h-10 rounded-xl bg-brand-blue text-white text-sm hover:bg-brand-blue-dark transition font-geist disabled:opacity-50"
                >
                  Finalizar Compra
                </button>
              </div>
            </footer>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
