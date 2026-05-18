import { Search, Heart, ShoppingCart, Menu, X, ChevronRight, User, LogOut, Loader2 } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User as FirebaseUser } from '../firebase';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface HeaderProps {
  cartCount: number;
  favoritesCount: number;
  onCartOpen: () => void;
  onFavoritesOpen: () => void;
  onLoginOpen: () => void;
  onLogout: () => void;
  user: FirebaseUser | null;
  onViewChange: (view: any) => void;
  currentView: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onProductSelect: (product: Product) => void;
}

export default function Header({ 
  cartCount, 
  favoritesCount,
  onCartOpen, 
  onFavoritesOpen,
  onLoginOpen,
  onLogout,
  user,
  onViewChange, 
  currentView,
  searchQuery,
  onSearchChange,
  onProductSelect
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredProducts = searchQuery.length >= 2
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchFocused || filteredProducts.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredProducts.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleProductSelect(filteredProducts[selectedIndex]);
    }
  };

  const handleProductSelect = (product: Product) => {
    onProductSelect(product);
    setIsSearchFocused(false);
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <strong key={i} className="text-brand-blue">{part}</strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const menuItems = [
    { id: 'bikes', label: 'Bikes' },
    { id: 'about', label: 'Nossa História' },
    { id: 'support', label: 'Contato' },
  ];

  const handleNavClick = (view: string) => {
    onViewChange(view);
    setIsMenuOpen(false);
  };

  const isLinkActive = (view: string) => currentView === view;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] w-full bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <button onClick={() => handleNavClick('home')} className="transition-opacity hover:opacity-80">
                <img 
                  className="h-10 w-auto" 
                  src="https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/LogoMuzzi.png" 
                  alt="Muzzicycles" 
                  referrerPolicy="no-referrer"
                />
              </button>
            </div>

            {/* Desktop Search (Simplified) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8 relative" ref={searchRef}>
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 text-brand-blue animate-spin" />
                  ) : (
                    <Search className="h-4 w-4 text-black/30 group-focus-within:text-brand-blue transition-colors" />
                  )}
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    setIsSearchFocused(true);
                    setSelectedIndex(-1);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={handleKeyDown}
                  className="block w-full pl-10 pr-3 py-2 border border-black/5 rounded-full bg-black/[0.02] text-sm placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                  placeholder="Pesquisar..."
                />
              </div>

              {/* Search Dropdown */}
              <AnimatePresence>
                {isSearchFocused && searchQuery.length >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-black/5 shadow-2xl overflow-hidden z-[60]"
                  >
                    {filteredProducts.length > 0 ? (
                      <div className="py-2">
                        {filteredProducts.map((product, index) => (
                          <button
                            key={product.id}
                            onClick={() => handleProductSelect(product)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${selectedIndex === index ? 'bg-black/[0.03]' : 'hover:bg-black/[0.02]'}`}
                          >
                            <div className="h-12 w-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-black/5">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <p className="text-sm font-bold text-black truncate">
                                  {highlightText(product.name, searchQuery)}
                                </p>
                                <p className="text-xs font-bold text-brand-blue shrink-0 ml-2">
                                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                                </p>
                              </div>
                              <p className="text-[10px] font-medium text-black/40 uppercase tracking-widest">
                                {product.category} {product.tag && `• ${product.tag}`}
                              </p>
                            </div>
                          </button>
                        ))}
                        <button 
                          onClick={() => {
                            onViewChange('models');
                            setIsSearchFocused(false);
                          }}
                          className="w-full py-3 text-center text-xs font-bold text-brand-blue hover:bg-brand-blue/5 transition-colors border-t border-black/5 uppercase tracking-widest"
                        >
                          Ver todos os resultados
                        </button>
                      </div>
                    ) : !isLoading && (
                      <div className="p-8 text-center">
                        <p className="text-sm font-medium text-black/60">Nenhum produto encontrado para "{searchQuery}"</p>
                        <p className="text-xs text-black/40 mt-1">Tente pesquisar por outro termo ou categoria.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              <div className="relative">
                <button 
                  onClick={user ? () => setIsUserMenuOpen(!isUserMenuOpen) : onLoginOpen}
                  className="p-2 rounded-full text-black/60 hover:bg-black/5 transition-colors hidden sm:flex items-center gap-2"
                >
                  {user ? (
                    user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'User'} className="h-6 w-6 rounded-full border border-black/10" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-brand-blue flex items-center justify-center text-[10px] text-white font-bold">
                        {user.displayName?.charAt(0) || user.email?.charAt(0)}
                      </div>
                    )
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && user && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-black/5 shadow-xl z-50 py-2"
                      >
                        <div className="px-4 py-2 border-b border-black/5 mb-2">
                          <p className="text-xs font-bold text-black/40 uppercase tracking-widest">Olá,</p>
                          <p className="text-sm font-medium text-black truncate">{user.displayName || 'Ciclista'}</p>
                        </div>
                        <button 
                          onClick={() => {
                            onViewChange('dashboard');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-black/70 hover:bg-black/5 transition-colors"
                        >
                          <User className="h-4 w-4" />
                          Meu Painel
                        </button>
                        <button 
                          onClick={() => {
                            onLogout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Sair da Conta
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              
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
            className="fixed inset-0 z-[9999] bg-white flex flex-col"
          >
            <div className="max-w-7xl mx-auto w-full h-full flex flex-col px-4 sm:px-6 lg:px-8">
              {/* Menu Header */}
              <div className="flex justify-between items-center h-20 shrink-0">
                <img 
                  className="h-10 w-auto" 
                  src="https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/LogoMuzzi.png" 
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
              <div className="flex-1 flex flex-col justify-center py-6">
                <nav className="space-y-2 sm:space-y-4">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                      onClick={() => handleNavClick(item.id)}
                      className="group flex items-center w-full text-left"
                    >
                      <span className={`text-2xl sm:text-4xl md:text-6xl font-medium tracking-tighter transition-all duration-300 group-hover:pl-8 ${isLinkActive(item.id) ? 'text-brand-blue' : 'text-black hover:text-brand-blue'}`}>
                        {item.label}
                      </span>
                      <ChevronRight className={`ml-4 h-6 w-6 sm:h-10 sm:w-10 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${isLinkActive(item.id) ? 'opacity-100 translate-x-0 text-brand-blue' : 'text-brand-blue'}`} />
                    </motion.button>
                  ))}
                </nav>
              </div>

              {/* Menu Footer */}
              <div className="py-12 border-t border-black/5 flex flex-col sm:flex-row justify-between items-center gap-8 shrink-0">
                {user ? (
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'User'} className="h-12 w-12 rounded-full border border-black/10" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-brand-blue flex items-center justify-center text-lg text-white font-bold">
                        {user.displayName?.charAt(0) || user.email?.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-bold text-black/40 uppercase tracking-widest">Logado como</p>
                      <p className="text-lg font-medium text-black">{user.displayName || user.email}</p>
                      <button 
                        onClick={() => {
                          onViewChange('dashboard');
                          setIsMenuOpen(false);
                        }}
                        className="text-xs font-bold text-brand-blue uppercase tracking-widest mt-1 hover:underline"
                      >
                        Ver Meu Painel
                      </button>
                    </div>
                    <button 
                      onClick={() => {
                        onLogout();
                        setIsMenuOpen(false);
                      }}
                      className="p-3 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <LogOut className="h-6 w-6" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLoginOpen();
                    }}
                    className="w-full sm:w-auto px-12 h-16 rounded-full bg-brand-blue text-white font-bold uppercase tracking-widest hover:bg-brand-blue-dark transition-all duration-300 shadow-xl shadow-brand-blue/20"
                  >
                    Entrar na Conta
                  </button>
                )}
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
