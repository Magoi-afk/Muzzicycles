import React, { useState, useEffect } from 'react';
import { db, collection, query, where, getDocs, orderBy, User, handleFirestoreError, OperationType } from '../firebase';
import { Package, Heart, History, Truck, Search, ChevronRight, Clock, CheckCircle2, AlertCircle, ShoppingBag, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { cn } from '../lib/utils';

interface Order {
  id: string;
  items: any[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  createdAt: string;
}

interface CustomerDashboardProps {
  user: User;
  userProfile?: any;
  onProductClick: (product: Product) => void;
  favorites: Product[];
  onToggleFavorite: (product: Product) => void;
}

const statusConfig = {
  pending: { label: 'Aguardando Pagamento', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  processing: { label: 'Em Processamento', icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50' },
  shipped: { label: 'Enviado', icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50' },
  delivered: { label: 'Entregue', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
  cancelled: { label: 'Cancelado', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
};

export default function CustomerDashboard({ user, userProfile, onProductClick, favorites, onToggleFavorite }: CustomerDashboardProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'tracking'>('orders');
  const [trackingSearch, setTrackingSearch] = useState('');
  const [trackingResult, setTrackingResult] = useState<Order | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      const path = 'orders';
      try {
        const q = query(
          collection(db, path), 
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders: Order[] = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() } as Order);
        });
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        handleFirestoreError(error, OperationType.LIST, path);
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(o => o.trackingNumber?.toLowerCase() === trackingSearch.toLowerCase() || o.id.toLowerCase().includes(trackingSearch.toLowerCase()));
    setTrackingResult(found || null);
    if (!found) {
        alert('Código de rastreio ou pedido não encontrado.');
    }
  };

  const formatDate = (date: any) => {
    if (!date) return '-';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <div className="p-6 bg-white rounded-2xl border border-black/5 mb-6">
            <div className="relative inline-block mb-4">
              <div className="h-16 w-16 rounded-full bg-brand-blue/10 flex items-center justify-center overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xl font-bold text-brand-blue uppercase">
                    {user.displayName?.[0] || user.email?.[0]}
                  </span>
                )}
              </div>
              {userProfile?.role === 'admin' && (
                <div className="absolute -bottom-1 -right-1 bg-brand-blue text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full uppercase tracking-tighter border border-white">
                  Admin
                </div>
              )}
            </div>
            <h2 className="font-bold text-lg text-black truncate">{user.displayName || 'Olá!'}</h2>
            <p className="text-xs text-black/40 truncate">{user.email}</p>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTab === 'orders' ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" : "text-black/60 hover:bg-black/5"
              )}
            >
              <Package className="w-4 h-4" />
              Histórico de Pedidos
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTab === 'tracking' ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" : "text-black/60 hover:bg-black/5"
              )}
            >
              <Truck className="w-4 h-4" />
              Rastreio de Entrega
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTab === 'favorites' ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" : "text-black/60 hover:bg-black/5"
              )}
            >
              <Heart className="w-4 h-4" />
              Favoritos
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-black font-geist">Meus Pedidos</h3>
                  <div className="text-sm text-black/40">{orders.length} pedidos realizados</div>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <History className="w-8 h-8 text-brand-blue animate-spin" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-black/5 p-12 text-center">
                    <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShoppingBag className="w-10 h-10 text-black/20" />
                    </div>
                    <h4 className="text-lg font-bold text-black mb-2">Nenhum pedido encontrado</h4>
                    <p className="text-sm text-black/40 mb-8 max-w-xs mx-auto">
                      Você ainda não realizou nenhuma compra. Explore nossos modelos e encontre a Muzzicycles perfeita para você!
                    </p>
                    <button 
                         onClick={() => window.dispatchEvent(new CustomEvent('changeView', { detail: { view: 'bikes' } }))}
                         className="px-8 py-3 bg-brand-blue text-white rounded-full font-bold hover:bg-brand-blue-dark transition-all"
                    >
                      Ver Catálogo
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {orders.map((order) => {
                      const StatusIcon = statusConfig[order.status]?.icon || Clock;
                      return (
                        <div key={order.id} className="bg-white rounded-2xl border border-black/5 p-6 hover:shadow-xl hover:shadow-black/[0.02] transition-all group">
                          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                              <div className={cn("p-3 rounded-xl", statusConfig[order.status]?.bg)}>
                                <StatusIcon className={cn("w-6 h-6", statusConfig[order.status]?.color)} />
                              </div>
                              <div>
                                <div className="text-xs text-black/40 font-medium mb-1 uppercase tracking-wider">PEDIDO #{order.id.slice(-6).toUpperCase()}</div>
                                <div className={cn("text-sm font-bold", statusConfig[order.status]?.color)}>
                                  {statusConfig[order.status]?.label}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <div className="text-xs text-black/40 mb-1">Data</div>
                                <div className="text-sm font-bold text-black">{formatDate(order.createdAt)}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-black/40 mb-1">Total</div>
                                <div className="text-sm font-bold text-brand-blue">{formatPrice(order.total)}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 pt-6 border-t border-black/[0.03]">
                            {order.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center gap-3">
                                <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover bg-gray-50" />
                                <div className="text-xs">
                                  <div className="font-bold text-black">{item.name}</div>
                                  <div className="text-black/40">Qtd: {item.quantity} • Aro: {item.selectedAro || 'Unico'}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'tracking' && (
              <motion.div
                key="tracking"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-black font-geist">Rastreio de Entrega</h3>
                  <p className="text-sm text-black/40">Fique por dentro de onde está sua Muzzicycles.</p>
                </div>

                <div className="bg-white rounded-3xl border border-black/5 p-8">
                  <form onSubmit={handleTrack} className="flex gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                      <input
                        type="text"
                        placeholder="Código de rastreamento ou ID do pedido"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none text-sm focus:ring-2 focus:ring-brand-blue/20 transition-all"
                        value={trackingSearch}
                        onChange={(e) => setTrackingSearch(e.target.value)}
                      />
                    </div>
                    <button 
                      type="submit"
                      className="px-8 py-4 bg-black text-white rounded-2xl font-bold hover:bg-black/80 transition-all flex items-center gap-2"
                    >
                      Rastrear
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>

                  {trackingResult && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-12 pt-12 border-t border-black/5"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="p-4 bg-green-50 rounded-2xl">
                          <Truck className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                          <div className="text-xs text-black/40 font-bold uppercase tracking-widest mb-1">Status Atual</div>
                          <div className="text-xl font-bold text-black">{statusConfig[trackingResult.status]?.label}</div>
                        </div>
                      </div>

                      <div className="relative pl-8 space-y-12 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-black/5">
                        <div className="relative">
                          <div className="absolute -left-[27px] top-1.5 h-[14px] w-[14px] rounded-full border-[3px] border-white bg-green-600 ring-4 ring-green-100" />
                          <div className="text-sm font-bold text-black mb-1">Pedido Enviado</div>
                          <p className="text-xs text-black/40 flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {formatDate(trackingResult.createdAt)}
                          </p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-[27px] top-1.5 h-[14px] w-[14px] rounded-full border-[3px] border-white bg-green-600" />
                          <div className="text-sm font-bold text-black mb-1">Em Trânsito</div>
                          <p className="text-xs text-black/40 flex items-center gap-2">
                             Unidade de Tratamento - São Paulo/SP
                          </p>
                        </div>
                        <div className="relative opacity-40">
                          <div className="absolute -left-[27px] top-1.5 h-[14px] w-[14px] rounded-full border-[3px] border-white bg-gray-300" />
                          <div className="text-sm font-bold text-black mb-1">Saiu para Entrega</div>
                          <p className="text-xs text-black/40">Aguardando atualização</p>
                        </div>
                      </div>

                      <div className="mt-12 p-6 bg-brand-blue/5 rounded-2xl border border-brand-blue/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <MapPin className="w-5 h-5 text-brand-blue" />
                          <div className="text-sm">
                            <div className="font-bold text-black">Entrega Estimada</div>
                            <div className="text-black/60">São Paulo, Brasil</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-brand-blue">Próximos 3 dias</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'favorites' && (
              <motion.div
                key="favorites"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-black font-geist">Favoritos</h3>
                  <div className="text-sm text-black/40">{favorites.length} itens salvos</div>
                </div>

                {favorites.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-black/5 p-12 text-center">
                    <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-10 h-10 text-black/20" />
                    </div>
                    <h4 className="text-lg font-bold text-black mb-2">Sua lista está vazia</h4>
                    <p className="text-sm text-black/40 mb-8 max-w-xs mx-auto">
                      Salve seus modelos favoritos aqui para ter acesso rápido quando decidir comprá-los.
                    </p>
                    <button 
                         onClick={() => window.dispatchEvent(new CustomEvent('changeView', { detail: { view: 'bikes' } }))}
                         className="px-8 py-3 bg-brand-blue text-white rounded-full font-bold hover:bg-brand-blue-dark transition-all"
                    >
                      Explorar Modelos
                    </button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((product) => (
                      <div 
                        key={product.id}
                        className="bg-white rounded-2xl border border-black/5 overflow-hidden hover:shadow-xl hover:shadow-black/[0.05] transition-all group"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden lg:cursor-pointer" onClick={() => onProductClick(product)}>
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavorite(product);
                            }}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm text-red-500 shadow-lg"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-black truncate mb-1">{product.name}</h4>
                          <p className="text-brand-blue font-bold text-sm">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                          </p>
                          <button 
                            onClick={() => onProductClick(product)}
                            className="w-full mt-4 py-2 text-xs font-bold uppercase tracking-wider text-black border border-black/10 rounded-lg hover:bg-black hover:text-white transition-all"
                          >
                            Ver Detalhes
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
