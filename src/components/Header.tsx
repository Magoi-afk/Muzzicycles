import { Search, Heart, ShoppingCart, Menu, X, ChevronRight, User } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  favoritesCount: number;
  onCartOpen: () => void;
  onFavoritesOpen: () => void;
  onViewChange: (view: any) => void;
  currentView: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ 
  cartCount, 
  favoritesCount,
  onCartOpen, 
  onFavoritesOpen,
  onViewChange, 
  currentView,
  searchQuery,
  onSearchChange
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'models', label: 'Modelo' },
    { id: 'innovation', label: 'Inovação' },
    { id: 'history', label: 'Histórias' },
    { id: 'sustainability', label: 'Sustentabilidade' },
    { id: 'acervo', label: 'Acervo' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contato' },
  ];

  const handleNavClick = (view: string) => {
    onViewChange(view);
    setIsMenuOpen(false);
  };

  const isLinkActive = (view: string) => currentView === view;

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <button onClick={() => handleNavClick('home')} className="transition-opacity hover:opacity-80">
                <img 
                  className="h-10 w-auto" 
                  src="https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/LogoMuzzi.png" 
                  alt="Muzzicycles" 
                  referrerPolicy="no-referrer"
                />
              </button>
            </div>

            {/* Desktop Search (Simplified) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-black/30 group-focus-within:text-brand-blue transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-black/5 rounded-full bg-black/[0.02] text-sm placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                  placeholder="Pesquisar..."
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              <button className="p-2 rounded-full text-black/60 hover:bg-black/5 transition-colors hidden sm:flex">
                <User className="h-5 w-5" />
              </button>
              
              <button 
                onClick={onFavoritesOpen}
                className="p-2 rounded-full text-black/60 hover:bg-black/5 transition-colors relative"
              >
                <Heart className={`h-5 w-5 ${favoritesCount > 0 ? 'fill-brand-blue text-brand-blue' : ''}`} />
                {favoritesCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-blue text-[10px] font-bold text-white">
                    {favoritesCount}
                  </span>
                )}
              </button>

              <button 
                onClick={onCartOpen}
                className="p-2 rounded-full text-black/60 hover:bg-black/5 transition-colors relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-blue text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-full text-black/60 hover:bg-black/5 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            <div className="max-w-7xl mx-auto w-full h-full flex flex-col px-4 sm:px-6 lg:px-8">
              {/* Menu Header */}
              <div className="flex justify-between items-center h-20 shrink-0">
                <img 
                  className="h-10 w-auto" 
                  src="https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/LogoMuzzi.png" 
                  alt="Muzzicycles" 
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full text-black/60 hover:bg-black/5 transition-colors"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 flex flex-col justify-center py-12">
                <nav className="space-y-4 sm:space-y-6">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                      onClick={() => handleNavClick(item.id)}
                      className="group flex items-center w-full text-left"
                    >
                      <span className={`text-4xl sm:text-6xl md:text-8xl font-medium tracking-tighter transition-all duration-300 group-hover:pl-8 ${isLinkActive(item.id) ? 'text-brand-blue' : 'text-black hover:text-brand-blue'}`}>
                        {item.label}
                      </span>
                      <ChevronRight className={`ml-4 h-8 w-8 sm:h-12 sm:w-12 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${isLinkActive(item.id) ? 'opacity-100 translate-x-0 text-brand-blue' : 'text-brand-blue'}`} />
                    </motion.button>
                  ))}
                </nav>
              </div>

              {/* Menu Footer */}
              <div className="py-12 border-t border-black/5 flex flex-col sm:flex-row justify-between items-center gap-8 shrink-0">
                <button className="w-full sm:w-auto px-12 h-16 rounded-full bg-brand-blue text-white font-bold uppercase tracking-widest hover:bg-brand-blue-dark transition-all duration-300 shadow-xl shadow-brand-blue/20">
                  Entrar na Conta
                </button>
                <div className="flex space-x-8 text-xs font-bold uppercase tracking-widest text-black/40">
                  <button onClick={() => handleNavClick('privacy')} className="hover:text-black transition-colors">Privacidade</button>
                  <button onClick={() => handleNavClick('terms')} className="hover:text-black transition-colors">Termos</button>
                  <span className="text-black/20">Muzzicycles &copy; {new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
