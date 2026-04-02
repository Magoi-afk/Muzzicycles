import { motion } from 'motion/react';
import { Star, Shield, Zap, ChevronRight, ArrowLeft, Plus, Minus, Info, Heart } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onCheckout: (product: Product) => void;
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
  const [selectedSize, setSelectedSize] = useState('19"');

  const allImages = [product.image, ...(product.additionalImages || [])];

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
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-black/5"
            >
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {allImages.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition ${selectedImage === img ? 'border-brand-blue' : 'border-transparent opacity-60 hover:opacity-100'}`}
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
                <div className="flex items-center gap-0.5 text-brand-blue">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} />
                  ))}
                </div>
              </div>
              <h1 className="text-5xl font-medium tracking-tighter font-geist mb-4">{product.name}</h1>
              <p className="text-lg text-black/60 font-geist leading-relaxed">
                {product.description}. Desenvolvida com polímeros reciclados de alta performance, a {product.name} oferece leveza estrutural e absorção de impacto superior para o ambiente urbano.
              </p>
            </div>

            {/* Options */}
            <div className="space-y-8 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist block mb-4">Tamanho do Quadro</span>
                <div className="flex items-center gap-2">
                  {['17"', '19"', '21"'].map((size) => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 px-6 rounded-xl border text-sm font-medium font-geist transition ${selectedSize === size ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-black/60 border-black/5 hover:border-black/20'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => onCheckout(product)}
                className="w-full h-14 rounded-2xl bg-brand-blue text-white font-bold font-geist text-lg hover:bg-brand-blue-dark transition shadow-lg shadow-brand-blue/20"
              >
                Comprar Agora
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={() => onAddToCart(product)}
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
              <div className="flex items-center justify-center gap-2 text-xs text-black/40 font-geist mt-2">
                <Shield className="w-3 h-3" />
                Entrega em todo o território nacional
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="mt-24 pt-20 border-t border-black/5">
          <h2 className="text-4xl font-medium tracking-tighter font-geist mb-12">Especificações Técnicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-8 rounded-3xl bg-neutral-900 text-white relative overflow-hidden">
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
              <div className="p-8 rounded-3xl bg-gray-50 border border-black/5">
                <Zap className="w-6 h-6 text-brand-blue mb-4" />
                <h4 className="text-lg font-medium font-geist mb-2">Transmissão</h4>
                <p className="text-sm text-black/50 font-geist leading-relaxed">
                  {product.specs?.transmission || 'Shimano TZ30 com 7 velocidades precisas para qualquer elevação.'}
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-gray-50 border border-black/5">
                <Shield className="w-6 h-6 text-brand-blue mb-4" />
                <h4 className="text-lg font-medium font-geist mb-2">Frenagem</h4>
                <p className="text-sm text-black/50 font-geist leading-relaxed">
                  {product.specs?.brakes || 'Sistema V-Brake em alumínio de alta fricção para segurança total.'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-3 p-8 rounded-3xl bg-brand-blue text-white flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-medium font-geist mb-1">Garantia Vitalícia</h3>
                <p className="text-white/70 font-geist">No quadro de polímero reciclado.</p>
              </div>
              <Shield className="w-10 h-10 text-white/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
