import { Search, Heart, ShoppingCart, Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

export default function Header({ cartCount, onCartOpen }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <a href="#" className="h-12 flex items-center">
            <img 
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/86d6d84d-619f-4f81-996a-049884848484_1600w.png" 
              alt="Muzzicycles" 
              className="h-full w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-sm text-black/60 hover:text-brand-blue transition font-geist" href="#models">Modelos</a>
            <a className="text-sm text-black/60 hover:text-brand-blue transition font-geist" href="#history">História</a>
            <a className="text-sm text-black/60 hover:text-brand-blue transition font-geist" href="#sustainability">Sustentabilidade</a>
            <a className="text-sm text-black/60 hover:text-brand-blue transition font-geist" href="#faq">FAQ</a>
            <a className="text-sm text-black/60 hover:text-brand-blue transition font-geist" href="#contact">Contato</a>
          </nav>

          {/* Search */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search sneakers, brands, colors…" 
                className="w-full h-10 pr-10 pl-10 rounded-xl border border-black/5 bg-white/70 backdrop-blur placeholder-black/40 text-sm outline-none focus:ring-2 focus:ring-black/5 focus:border-black/10 transition"
              />
              <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none text-black/50">
                <Search className="w-4 h-4" />
              </div>
              <button className="absolute right-2 inset-y-0 my-auto inline-flex items-center justify-center h-7 px-2 rounded-lg bg-black/5 text-xs text-black/60 hover:text-black hover:bg-black/10 transition font-geist">⌘K</button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:inline-flex items-center justify-center rounded-lg border border-black/5 bg-white text-black/70 hover:bg-black/5 h-9 px-3 text-sm transition">
              <span className="hidden md:inline font-geist">Sign in</span>
              <span className="md:hidden font-geist">Account</span>
            </button>
            <button className="hidden sm:inline-flex items-center justify-center rounded-lg border border-black/5 bg-white text-black/70 hover:bg-black/5 h-9 w-9 transition" aria-label="Wishlist">
              <Heart className="w-4 h-4" />
            </button>
            <button 
              onClick={onCartOpen}
              className="relative inline-flex items-center justify-center rounded-lg border border-black/5 bg-white text-black/70 hover:bg-black/5 h-9 w-9 transition" 
              aria-label="Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-4 min-w-[16px] px-1 rounded-full bg-black text-white text-[10px] leading-none font-geist">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-black/5 bg-white text-black/70 hover:bg-black/5 h-9 w-9 transition" 
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search sneakers, brands, colors…" 
              className="w-full h-10 pr-10 pl-10 rounded-xl border border-black/5 bg-white/70 backdrop-blur placeholder-black/40 text-sm outline-none focus:ring-2 focus:ring-black/5 focus:border-black/10 transition"
            />
            <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none text-black/50">
              <Search className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-black/5 bg-white/80 backdrop-blur">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3">
            <nav className="grid grid-cols-2 gap-2">
              <a className="text-sm px-3 py-2 rounded-lg border border-black/5 hover:bg-black/5 text-black/70 hover:text-black transition font-geist" href="#new">New</a>
              <a className="text-sm px-3 py-2 rounded-lg border border-black/5 hover:bg-black/5 text-black/70 hover:text-black transition font-geist" href="#men">Men</a>
              <a className="text-sm px-3 py-2 rounded-lg border border-black/5 hover:bg-black/5 text-black/70 hover:text-black transition font-geist" href="#women">Women</a>
              <a className="text-sm px-3 py-2 rounded-lg border border-black/5 hover:bg-black/5 text-black/70 hover:text-black transition font-geist" href="#kids">Kids</a>
              <a className="text-sm px-3 py-2 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition font-geist" href="#sale">Sale</a>
              <a className="text-sm px-3 py-2 rounded-lg border border-black/5 hover:bg-black/5 text-black/70 hover:text-black transition font-geist" href="#support">Support</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
