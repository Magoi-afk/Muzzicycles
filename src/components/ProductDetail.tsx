import { motion } from 'motion/react';
import { Shield, Zap, ChevronRight, ArrowLeft, Plus, Minus, Info, Heart, History, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';
import SplineScene from './SplineScene';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, selectedAro?: string) => void;
  onCheckout: (product: Product, selectedAro?: string) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function ProductDetail({ 
  product, 
  onBack, 
  onAddToCart, 
  onCheckout,
  isFavorite,
  onToggleFavorite
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedAro, setSelectedAro] = useState('29');
  const [is3DActive, setIs3DActive] = useState(product.id === '10');

  const allImages = [product.image, ...(product.additionalImages || [])];
  const isBike = product.category !== 'Componentes';
  const has3DModel = product.id === '10'; // QUADRO MONTAIN BIKE

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        {/* Breadcrumbs & Back */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition font-geist"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o catálogo
          </button>
          <div className="flex items-center gap-2 text-xs text-black/30 font-geist uppercase tracking-widest">
            <span className="hover:text-black cursor-pointer">Bikes</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-black/60">{product.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery / 3D Model */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-black/5 relative group"
            >
              {has3DModel && is3DActive ? (
                <div className="w-full h-full relative bg-neutral-900">
                  <SplineScene 
                    scene="https://prod.spline.design/G0n2U7VfS6BbmEx2/scene.splinecode" 
                  />
                  <div className="absolute bottom-6 right-6 z-10 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] text-white/60 font-bold uppercase tracking-widest pointer-events-none">
                    Interativo 3D
                  </div>
                </div>
              ) : (
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {has3DModel && (
                <button 
                  onClick={() => setIs3DActive(true)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition flex flex-col items-center justify-center bg-neutral-900 text-white/40 hover:text-white ${is3DActive ? 'border-brand-blue text-white' : 'border-transparent'}`}
                >
                  <Zap className="w-6 h-6 mb-1" />
                  <span className="text-[8px] font-bold uppercase tracking-tighter">3D</span>
                </button>
              )}
              {allImages.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    setSelectedImage(img);
                    setIs3DActive(false);
                  }}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition ${selectedImage === img && !is3DActive ? 'border-brand-blue' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-[10px] font-bold uppercase tracking-widest text-black/50 font-geist">Eco-Inovação</span>
              </div>
              <h1 className="text-5xl font-medium tracking-tighter font-geist mb-2">{product.name}</h1>
              <div className="mb-6">
                {product.isAcervo ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-widest border border-amber-200">
                    <History className="w-3 h-3" />
                    Item de Exposição
                  </div>
                ) : (
                  <p className="text-3xl font-bold text-brand-blue font-geist">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </p>
                )}
              </div>
              <p className="text-lg text-black/60 font-geist leading-relaxed">
                {product.description}. Desenvolvida com polímeros reciclados de alta performance, a {product.name} oferece leveza estrutural e absorção de impacto superior para o ambiente urbano.
              </p>
            </div>

            {/* Options */}
            <div className="space-y-8 mb-10">
              {isBike && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist block mb-4">Tamanho do Aro</span>
                  <div className="flex items-center gap-2">
                    {['24', '26', '29', '32'].map((aro) => (
                      <button 
                        key={aro}
                        onClick={() => setSelectedAro(aro)}
                        className={`h-10 px-6 rounded-xl border text-sm font-medium font-geist transition ${selectedAro === aro ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-black/60 border-black/5 hover:border-black/20'}`}
                      >
                        {aro}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              {product.isAcervo ? (
                <div className="p-6 rounded-2xl bg-gray-50 border border-black/5 text-center">
                  <p className="text-sm text-black/50 font-geist">
                    Este modelo faz parte do acervo histórico da Muzzicycles e não está disponível para venda.
                  </p>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => onCheckout(product, isBike ? selectedAro : undefined)}
                    className="w-full h-14 rounded-2xl bg-brand-blue text-white font-bold font-geist text-lg hover:bg-brand-blue-dark transition shadow-lg shadow-brand-blue/20"
                  >
                    Comprar Agora
                  </button>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => onAddToCart(product, isBike ? selectedAro : undefined)}
                      className="flex-1 h-14 rounded-2xl border border-black/5 bg-white text-black/70 font-bold font-geist text-lg hover:bg-black/5 transition"
                    >
                      Adicionar ao Carrinho
                    </button>
                    <button 
                      onClick={onToggleFavorite}
                      className="h-14 w-14 rounded-2xl border border-black/5 bg-white flex items-center justify-center text-black/40 hover:text-brand-blue transition group"
                    >
                      <Heart className={`w-6 h-6 group-hover:scale-110 transition ${isFavorite ? 'fill-brand-blue text-brand-blue' : ''}`} />
                    </button>
                  </div>
                </>
              )}
              <div className="flex items-center justify-center gap-2 text-xs text-black/40 font-geist mt-2">
                <Shield className="w-3 h-3" />
                {product.isAcervo ? 'Preservando a história da sustentabilidade' : 'Entrega em todo o território nacional'}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="mt-24 pt-20 border-t border-black/5">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-brand-blue font-bold uppercase tracking-widest text-[10px] mb-4 block">Engenharia Avançada</span>
              <h2 className="text-4xl sm:text-5xl font-medium tracking-tighter font-geist">Especificações & Geometria</h2>
            </div>
            <p className="text-black/50 font-geist max-w-sm text-sm">
              Cada componente foi selecionado para garantir a máxima durabilidade e compatibilidade com o quadro de polímero reciclado.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Geometry Section */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-8">
              <div className="p-8 rounded-[3rem] bg-gray-50 border border-black/5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-8 w-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                    <Info className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-medium font-geist">Geometria do Quadro</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-black/5 p-4 group cursor-zoom-in">
                    <img 
                      src="https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Geometria%20Quadro%20Muzzicycles.png" 
                      alt="Geometria Quadro Muzzicycles" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-black/5 p-4 group cursor-zoom-in">
                    <img 
                      src="https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/medidas%20muzzi%20aro%2026.png" 
                      alt="Medidas Aro 26" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                
                <div className="mt-8 p-6 rounded-2xl bg-brand-blue text-white">
                  <p className="text-sm font-geist leading-relaxed">
                    A geometria Muzzicycles foi otimizada para o conforto urbano, reduzindo a fadiga postural e maximizando a transferência de torque. Ideal para usuários de 1.60m a 1.90m.
                  </p>
                </div>
              </div>
            </div>

            {/* Components List */}
            <div className="lg:col-span-12 xl:col-span-7">
              <div className="p-8 sm:p-12 rounded-[3.5rem] bg-neutral-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Shield className="w-64 h-64" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-medium font-geist mb-8 flex items-center gap-3">
                    Configuração Standard
                    <span className="px-2 py-1 rounded-md bg-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60">Shimano 7v / Nexus 3</span>
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-geist">
                      <thead>
                        <tr className="text-[10px] font-bold uppercase tracking-widest text-white/30 border-b border-white/10">
                          <th className="pb-4">Produto</th>
                          <th className="pb-4 px-4">Fabricante</th>
                          <th className="pb-4 text-right">Qtd</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-white/5">
                        {[
                          { p: "CAMBIO NEXUS 3 MARCHAS", f: "SHIMANO", q: "1 PÇ" },
                          { p: "CAMBIO TRASEIRO SHIMANO TZ30 7 MARCHAS", f: "SHIMANO", q: "1 PÇ" },
                          { p: "ALAVANCA CAMBIO GRIP SHIFT 7VEL", f: "SHIMANO", q: "1 PAR" },
                          { p: "CÂMARA DE AR 26 MAXI POWER", f: "LEVORIN", q: "2 PÇS" },
                          { p: "ARO 26 X 36F AERO PRETO", f: "VZAN", q: "2 PÇS" },
                          { p: "CANOTE DE SELIM 25,4 ALUMÍNIO", f: "ZOOM", q: "1 PÇ" },
                          { p: "CORRENTE 26 ½ X 1/8 TAYA", f: "TAYA", q: "1 PÇ" },
                          { p: "CUBO 36 F MTB ALUMINIO", f: "SHUNG FEIG", q: "1 PR" },
                          { p: "GARFO SIMPLES SEM SUSPENSÃO", f: "ECOS / ZOOM", q: "1 PÇ" },
                          { p: "GUIDÃO DE PASSEIO ALTO CROMADO", f: "ROYCICLO", q: "1 PÇ" },
                          { p: "MOVIMENTO CENTRAL SELADO 122MM", f: "NECO", q: "1 JG" },
                          { p: "PEDAL MTB 9/13” ALUMÍNIO", f: "NIGBO", q: "1 PR" },
                          { p: "PEDIVELA DIR/ESQ 170MM AÇO", f: "SUGINO", q: "1 CJ" },
                          { p: "PNEU 26 X 2.0 SLICK", f: "LEVORIN", q: "2 PÇS" },
                          { p: "RODA LIVRE 7 VELOCIDADES", f: "KANGUEE", q: "2 PÇS" },
                          { p: "SELIN 26 THUNDER PVC", f: "ROYACICLO", q: "1 PÇ" },
                          { p: "SUPORTE GUIDÃO ALUMÍNIO", f: "ZOOM", q: "1 PÇ" },
                          { p: "ABRAÇADEIRA SELIM BLOCAGEM", f: "ZOOM", q: "1 PÇ" }
                        ].map((item, i) => (
                          <tr key={i} className="group hover:bg-white/5 transition-colors">
                            <td className="py-4 pr-4 font-medium text-white/90">{item.p}</td>
                            <td className="py-4 px-4 text-white/50">{item.f}</td>
                            <td className="py-4 text-right font-mono text-[10px] text-brand-blue">{item.q}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-8 text-[10px] text-white/30 font-geist italic">
                    * A Muzzicycles reserva-se o direito de alterar componentes por equivalentes de mesma qualidade conforme disponibilidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Features Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-neutral-900 text-white relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-geist mb-2 block">Inovação</span>
              <h3 className="text-2xl font-medium font-geist mb-4">Quadro Polymer Core</h3>
              <p className="text-white/60 font-geist leading-relaxed max-w-md mb-8">
                Nosso processo patenteado transforma resíduos plásticos em uma estrutura molecular inquebrável com garantia vitalícia.
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-6xl font-medium font-geist tracking-tighter">{product.specs?.weight || '4.8'}</span>
                <span className="text-xl font-medium font-geist text-white/40">kg</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/40 font-geist ml-2">Peso</span>
              </div>
            </div>
            <div className="absolute right-[-10%] bottom-[-10%] opacity-10">
              <Shield className="w-64 h-64" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-black/5">
              <Zap className="w-6 h-6 text-brand-blue mb-4" />
              <h4 className="text-lg font-medium font-geist mb-2">Transmissão</h4>
              <p className="text-sm text-black/50 font-geist leading-relaxed">
                {product.specs?.transmission || 'Shimano TZ30 com 7 velocidades precisas para qualquer elevação.'}
              </p>
            </div>
            <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-black/5">
              <Shield className="w-6 h-6 text-brand-blue mb-4" />
              <h4 className="text-lg font-medium font-geist mb-2">Frenagem</h4>
              <p className="text-sm text-black/50 font-geist leading-relaxed">
                {product.specs?.brakes || 'Sistema V-Brake em alumínio de alta fricção para segurança total.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 p-10 rounded-[2.5rem] bg-brand-blue text-white flex items-center justify-between shadow-xl shadow-brand-blue/20">
            <div>
              <h3 className="text-2xl font-medium font-geist mb-1">Garantia Vitalícia</h3>
              <p className="text-white/70 font-geist">No quadro de polímero reciclado.</p>
            </div>
            <Shield className="w-10 h-10 text-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
