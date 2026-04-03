/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LogoCloud from './components/LogoCloud';
import ProductGrid from './components/ProductGrid';
import Doctrine from './components/Doctrine';
import Innovation from './components/Innovation';
import History from './components/History';
import Sustainability from './components/Sustainability';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FavoritesDrawer from './components/FavoritesDrawer';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import PurchaseModal from './components/PurchaseModal';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import { Product, CartItem } from './types';

type View = 'home' | 'detail' | 'checkout' | 'privacy' | 'terms' | 'models' | 'history' | 'sustainability' | 'faq' | 'contact' | 'innovation' | 'acervo';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((item) => item.id === product.id);
      if (isFavorite) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const handleCheckout = (product: Product) => {
    setSelectedProduct(product);
    setIsPurchaseModalOpen(true);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setView('home');
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const desktopSearch = document.querySelector('header input[type="text"]') as HTMLInputElement;
        desktopSearch?.focus();
      }
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Ambient BG */}
      <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 h-[900px] w-[1200px] rounded-full blur-3xl opacity-20" 
          style={{ background: 'radial-gradient(1200px 600px at 50% 30%, #2563eb 10%, #60a5fa 40%, transparent 70%)' }}
        ></div>
      </div>

      <Header 
        cartCount={totalItems} 
        favoritesCount={favorites.length}
        onCartOpen={() => setIsCartOpen(true)} 
        onFavoritesOpen={() => setIsFavoritesOpen(true)}
        onViewChange={handleViewChange}
        currentView={view}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="pb-20">
        {view === 'home' && (
          <div className="space-y-20">
            <Hero />
            <LogoCloud />
            <ProductGrid 
              onAddToCart={addToCart} 
              onProductClick={handleProductClick} 
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              searchQuery={searchQuery}
            />
            <Doctrine />
            <Innovation />
            <History />
            <Sustainability />
            <FAQ />
            <Contact />
          </div>
        )}

        {view === 'models' && (
          <div className="pt-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12">
              <h1 className="text-4xl sm:text-6xl font-medium tracking-tighter font-geist mb-4">Nossos Modelos</h1>
              <p className="text-xl text-black/60 font-geist max-w-2xl">Explore nossa linha completa de bicicletas sustentáveis, projetadas para cada tipo de ciclista.</p>
            </div>
            <ProductGrid 
              onAddToCart={addToCart} 
              onProductClick={handleProductClick} 
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              searchQuery={searchQuery}
            />
          </div>
        )}

        {view === 'history' && (
          <div className="pt-12">
            <History />
          </div>
        )}

        {view === 'innovation' && (
          <div className="pt-12">
            <Innovation />
          </div>
        )}

        {view === 'sustainability' && (
          <div className="pt-12">
            <Sustainability />
          </div>
        )}

        {view === 'faq' && (
          <div className="pt-12">
            <FAQ />
          </div>
        )}

        {view === 'contact' && (
          <div className="pt-12">
            <Contact />
          </div>
        )}

        {view === 'acervo' && (
          <div className="pt-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12">
              <h1 className="text-4xl sm:text-6xl font-medium tracking-tighter font-geist mb-4">Acervo Muzzi</h1>
              <p className="text-xl text-black/60 font-geist max-w-2xl">Conheça nossa coleção histórica e modelos exclusivos que marcaram a trajetória da Muzzicycles.</p>
            </div>
            <ProductGrid 
              onAddToCart={addToCart} 
              onProductClick={handleProductClick} 
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              searchQuery={searchQuery}
            />
          </div>
        )}

        {view === 'detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={handleBackToHome} 
            onAddToCart={addToCart}
            onCheckout={handleCheckout}
            isFavorite={favorites.some(f => f.id === selectedProduct.id)}
            onToggleFavorite={() => toggleFavorite(selectedProduct)}
          />
        )}

        {view === 'checkout' && selectedProduct && (
          <Checkout 
            product={selectedProduct} 
            onBack={() => setView('detail')} 
            onComplete={() => {
              alert('Pedido realizado com sucesso!');
              handleBackToHome();
            }}
          />
        )}

        {view === 'privacy' && (
          <PrivacyPolicy onBack={handleBackToHome} />
        )}

        {view === 'terms' && (
          <TermsOfService onBack={handleBackToHome} />
        )}
      </main>

      <Footer onViewChange={handleViewChange} />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          if (cartItems.length > 0) {
            handleCheckout(cartItems[0]);
            setIsCartOpen(false);
          }
        }}
      />

      <FavoritesDrawer 
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        items={favorites}
        onRemove={removeFromFavorites}
        onAddToCart={addToCart}
        onProductClick={handleProductClick}
      />

      <PurchaseModal 
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        items={cartItems.length > 0 ? cartItems : (selectedProduct ? [{ ...selectedProduct, quantity: 1 }] : [])}
      />
    </div>
  );
}
