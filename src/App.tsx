/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
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
import NossaHistoria from './components/NossaHistoria';
import Support from './components/Support';
import Checkout from './components/Checkout';
import ModelsIntro from './components/ModelsIntro';
import PurchaseModal from './components/PurchaseModal';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CustomerDashboard from './components/CustomerDashboard';
import { LoginForm } from './components/LoginForm';
import { auth, onAuthStateChanged, User, signOut, db, getDoc, doc, setDoc, serverTimestamp, handleFirestoreError, OperationType } from './firebase';
import { Product, CartItem } from './types';

type View = 'home' | 'detail' | 'checkout' | 'privacy' | 'terms' | 'bikes' | 'about' | 'support' | 'dashboard';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [view, setView] = useState<View>('home');
  const [aboutTab, setAboutTab] = useState('history');
  const [supportTab, setSupportTab] = useState<'faq' | 'contact'>('faq');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewChange = (newView: View, tab?: string) => {
    setView(newView);
    if (newView === 'about' && tab) setAboutTab(tab);
    if (newView === 'support' && tab) setSupportTab(tab as 'faq' | 'contact');
    window.scrollTo(0, 0);
  };

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

  const addToCart = (product: Product, selectedAro?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedAro === selectedAro);
      if (existing) {
        return prev.map((item) =>
          (item.id === product.id && item.selectedAro === selectedAro) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedAro }];
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

  const handleCheckout = (product: Product, selectedAro?: string) => {
    // Add to cart if not already there, then go to checkout
    const existing = cartItems.find(item => item.id === product.id && item.selectedAro === selectedAro);
    if (!existing) {
      setCartItems(prev => [...prev, { ...product, quantity: 1, selectedAro }]);
    }
    setView('checkout');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setView('home');
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  // Keyboard shortcut for search and MP status
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    if (status === 'success') {
      const saveOrder = async () => {
        if (user && cartItems.length > 0) {
          try {
            const orderId = `MUZ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            await setDoc(doc(db, 'orders', orderId), {
              userId: user.uid,
              items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                selectedAro: item.selectedAro
              })),
              total: cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
              status: 'processing',
              trackingNumber: `BR${Math.floor(100000000 + Math.random() * 900000000)}JB`,
              createdAt: serverTimestamp()
            });
            console.log("Pedido salvo com sucesso!");
          } catch (error) {
            console.error("Erro ao salvar pedido:", error);
            handleFirestoreError(error, OperationType.WRITE, 'orders');
          }
        }
      };
      
      saveOrder().then(() => {
        alert('Pagamento aprovado! Obrigado por escolher a Muzzicycles.');
        setCartItems([]);
        window.history.replaceState({}, '', '/');
      });
      return; // Prevent duplication
    } else if (status === 'failure') {
      alert('Ocorreu um erro no pagamento. Por favor, tente novamente.');
      window.history.replaceState({}, '', '/');
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          }
        } catch (error) {
          console.error("Erro ao buscar perfil do usuário:", error);
        }
      } else {
        setUserProfile(null);
      }
      setIsAuthLoading(false);
    });

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

    const handleChangeView = (e: any) => {
      if (e.detail?.view) {
        handleViewChange(e.detail.view);
      }
    };

    window.addEventListener('changeView', handleChangeView);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('changeView', handleChangeView);
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-brand-blue/20 animate-pulse"></div>
            <Loader2 className="absolute inset-0 h-16 w-16 text-brand-blue animate-spin" />
          </div>
          <p className="text-sm font-medium text-black/60 font-geist animate-pulse">Carregando Muzzicycles...</p>
        </div>
      </div>
    );
  }

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
        onLoginOpen={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        user={user}
        onViewChange={handleViewChange}
        currentView={view}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onProductSelect={handleProductClick}
      />
      
      <main className="pt-20 pb-20">
        {view === 'home' && (
          <div className="space-y-20">
            <Hero 
              onHistoryClick={() => handleViewChange('about')} 
              onExploreClick={() => handleViewChange('bikes')}
            />
            <LogoCloud />
            <ProductGrid 
              onAddToCart={addToCart} 
              onProductClick={handleProductClick} 
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
            <Doctrine />
            <FAQ />
            <Contact />
          </div>
        )}

        {view === 'bikes' && (
          <div>
            <ModelsIntro />
            <div className="pt-20 border-t border-black/5">
              <ProductGrid 
                onAddToCart={addToCart} 
                onProductClick={handleProductClick} 
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          </div>
        )}

        {view === 'about' && (
          <NossaHistoria 
            key={aboutTab}
            onProductClick={handleProductClick} 
            initialTab={aboutTab} 
          />
        )}

        {view === 'support' && (
          <Support 
            key={supportTab}
            initialTab={supportTab} 
          />
        )}
        
        {view === 'dashboard' && user && (
          <CustomerDashboard 
            user={user} 
            userProfile={userProfile}
            onProductClick={handleProductClick}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
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

        {view === 'checkout' && (
          <Checkout 
            items={cartItems} 
            onBack={() => setView('home')} 
            onComplete={() => {
              setCartItems([]);
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
            setView('checkout');
            setIsCartOpen(false);
            window.scrollTo(0, 0);
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

      <LoginForm 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
}
