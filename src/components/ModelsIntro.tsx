import { motion, AnimatePresence } from 'motion/react';
import { Info, Shield, Zap, Maximize2, X } from 'lucide-react';
import { useState } from 'react';

export default function ModelsIntro() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const techImages = [
    {
      src: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/Geometria%20Quadro%20Muzzicycles.png",
      title: "Geometria do Quadro",
      desc: "Análise de angulação e ergonomia"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/medidas%20muzzi%20aro%2026.png",
      title: "Medidas Técnicas",
      desc: "Especificações de aro 26"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24">
      <div className="flex flex-col lg:flex-row gap-20 items-start">
        <div className="lg:w-[45%] sticky top-32">
          <div className="space-y-2 mb-8">
            <span className="text-brand-blue font-bold uppercase tracking-[0.2em] text-[9px] block">Engenharia Sustentável</span>
            <h2 className="text-5xl sm:text-7xl font-medium tracking-tighter font-geist leading-[0.85] text-black">
              Simplicidade que<br />muda o mundo.
            </h2>
          </div>
          
          <p className="text-xl text-black/50 font-geist leading-relaxed mb-12 max-w-md">
            Cada Muzzicycles é montada com componentes de alta precisão sobre uma geometria otimizada para o conforto e performance urbana.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2.5rem] bg-gray-50 border border-black/5"
            >
              <Shield className="w-6 h-6 text-brand-blue mb-4" />
              <h4 className="font-bold text-xs mb-2 uppercase tracking-widest opacity-40">Estrutura</h4>
              <p className="text-sm text-black font-medium font-geist leading-tight">Garantia Vitalícia no quadro de polímero.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2.5rem] bg-brand-blue text-white shadow-2xl shadow-brand-blue/20"
            >
              <Zap className="w-6 h-6 text-white/50 mb-4" />
              <h4 className="font-bold text-xs mb-2 uppercase tracking-widest opacity-40">Performance</h4>
              <p className="text-sm font-medium font-geist leading-tight">Transmissão Shimano de alta fidelidade.</p>
            </motion.div>
          </div>
        </div>

        <div className="lg:w-[55%] w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techImages.map((image, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative flex flex-col"
              >
                <div 
                  onClick={() => setSelectedImage(image.src)}
                  className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 border border-black/5 p-8 flex items-center justify-center cursor-zoom-in transition-all duration-500 hover:shadow-2xl hover:shadow-black/5"
                >
                  <img 
                    src={image.src} 
                    alt={image.title} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white p-4 rounded-full shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-300">
                      <Maximize2 className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 px-2">
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.2em] mb-1 block">Protótipo 00{idx + 1}</span>
                  <h4 className="text-base font-medium font-geist text-black">{image.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-32 p-10 sm:p-20 rounded-[4rem] bg-neutral-900 text-white overflow-hidden relative shadow-3xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Shield className="w-96 h-96" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
            <div className="max-w-xl">
              <span className="text-brand-blue font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Documentação</span>
              <h3 className="text-4xl sm:text-6xl font-medium font-geist tracking-tighter leading-none mb-6">Ficha Técnica Standard</h3>
              <p className="text-white/40 text-lg leading-relaxed">Configuração optimizada pela engenharia Muzzicycles para o equilíbrio perfeito entre leveza e resistência estrutural.</p>
            </div>
            <div className="flex flex-col items-start gap-4">
               <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-bold text-brand-blue uppercase tracking-[0.2em]">
                 Shimano 7v / Nexus 3
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6">
            {[
              { p: "Câmbio Nexus 3", f: "SHIMANO" },
              { p: "Câmbio Traseiro TZ30", f: "SHIMANO" },
              { p: "Alavanca Grip Shift", f: "SHIMANO" },
              { p: "Câmara de Ar 26", f: "LEVORIN" },
              { p: "Aro 26 Aero", f: "VZAN" },
              { p: "Canote 25,4 Alum", f: "ZOOM" },
              { p: "Corrente 26 ½", f: "TAYA" },
              { p: "Cubo 36 F MTB", f: "SHUNG FEIG" },
              { p: "Garfo Rígido", f: "ECOS / ZOOM" },
              { p: "Mov. Central 122mm", f: "NECO" },
              { p: "Pedivela 170mm", f: "SUGINO" },
              { p: "Pneu 26 Slick", f: "LEVORIN" }
            ].map((item, i) => (
              <div key={i} className="group py-4 border-b border-white/5 hover:border-brand-blue/30 transition-all flex flex-col justify-between">
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{item.p}</span>
                <span className="text-[10px] uppercase font-bold text-brand-blue tracking-widest mt-2">{item.f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Portal / Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 sm:p-20"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-4">
              <X className="w-8 h-8" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Detalhe Técnico" 
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
