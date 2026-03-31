import { ShoppingBag, X, PackageOpen, Package, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
                <h3 className="text-sm font-medium tracking-tight font-geist">Your cart</h3>
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
                  <p className="text-sm font-geist">Your cart is empty.</p>
                  <p className="text-xs text-black/50 mt-1 font-geist">Add a pair to get started.</p>
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
                        <p className="text-xs text-black/60">${item.price} · Size — Select at checkout</p>
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
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-sm font-medium">${item.price * item.quantity}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <footer className="border-t border-black/5 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-black/60 font-geist">Subtotal</span>
                <span className="font-medium tracking-tight font-geist">${subtotal}</span>
              </div>
              <p className="mt-1 text-xs text-black/50 font-geist">Taxes and shipping calculated at checkout.</p>
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={onClose}
                  className="flex-1 h-10 rounded-xl border border-black/5 bg-white text-sm text-black/70 hover:bg-black/5 transition font-geist"
                >
                  Continue shopping
                </button>
                <button className="flex-1 h-10 rounded-xl bg-black text-white text-sm hover:opacity-90 transition font-geist">
                  Checkout
                </button>
              </div>
            </footer>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
