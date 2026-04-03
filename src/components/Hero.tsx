import { ArrowRight, ArrowUpRight, Truck, RotateCcw, Headphones, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import WordRotate from './magicui/WordRotate';
import NumberTicker from './magicui/NumberTicker';
import FrameModal from './FrameModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="max-w-7xl sm:px-8 mx-auto px-6">
      <div className="pt-10 pb-12 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-[1.05] text-black tracking-tighter font-geist">
              A bike que nasce do que o mundo descarta
              <WordRotate 
                className="text-brand-blue tracking-tighter font-geist"
                words={["100% plástico reciclado.", "100% brasileira.", "Garantia vitalícia."]}
              />
            </h1>
            <div className="flex flex-wrap gap-3 mt-8 items-center">
              <a 
                href="#models" 
                className="group relative inline-flex items-center gap-2 text-sm font-medium text-white ring-1 ring-white/10 rounded-2xl font-geist" 
                style={{ 
                  background: 'linear-gradient(135deg, var(--color-brand-blue) 0%, var(--color-brand-blue-dark) 100%)', 
                  boxShadow: '0 0 1.6em -0.6em var(--color-brand-blue) inset', 
                  height: '2.8em', 
                  padding: '0.35em 3.3em 0.35em 1.2em', 
                  letterSpacing: '0.02em' 
                }}
              >
                Explorar Bikes
                <span 
                  className="absolute right-[0.3em] flex items-center justify-center h-[2.2em] w-[2.2em] transition-all duration-300 group-hover:w-[calc(100%-0.6em)] active:scale-95 bg-white rounded-[0.7em]" 
                  style={{ boxShadow: '0.1em 0.1em 0.6em 0.2em rgba(37, 99, 235, 0.3)' }}
                >
                  <ArrowRight className="w-4 h-4 text-brand-blue transition-transform duration-300 group-hover:translate-x-[0.1em]" />
                </span>
              </a>
              <a href="#history" className="inline-flex items-center gap-2 text-sm text-black/70 hover:text-brand-blue transition font-geist">
                Nossa História
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-8 border-l-2 border-brand-blue/20 pl-8 py-1">
              <div className="flex flex-col gap-1.5 group">
                <NumberTicker value={15840600} className="text-2xl sm:text-3xl font-medium italic text-black group-hover:text-brand-blue transition-colors" />
                <p className="text-[9px] sm:text-[10px] text-brand-blue font-medium uppercase tracking-[0.15em] leading-tight opacity-70">
                  Kg de plástico<br />reciclados
                </p>
              </div>
              <div className="flex flex-col gap-1.5 group">
                <NumberTicker value={130000} className="text-2xl sm:text-3xl font-medium italic text-black group-hover:text-brand-blue transition-colors" />
                <p className="text-[9px] sm:text-[10px] text-brand-blue font-medium uppercase tracking-[0.15em] leading-tight opacity-70">
                  Muzzicycles<br />produzidas
                </p>
              </div>
              <div className="flex flex-col gap-1.5 group">
                <NumberTicker value={980732} className="text-2xl sm:text-3xl font-medium italic text-black group-hover:text-brand-blue transition-colors" />
                <p className="text-[9px] sm:text-[10px] text-brand-blue font-medium uppercase tracking-[0.15em] leading-tight opacity-70">
                  Kg de petróleo<br />economizados
                </p>
              </div>
              <div className="flex flex-col gap-1.5 group">
                <NumberTicker value={5738267} className="text-2xl sm:text-3xl font-medium italic text-black group-hover:text-brand-blue transition-colors" />
                <p className="text-[9px] sm:text-[10px] text-brand-blue font-medium uppercase tracking-[0.15em] leading-tight opacity-70">
                  Kg de CO2<br />evitados
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl overflow-hidden border border-black/5 bg-white/30 backdrop-blur">
              <img 
                src="https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/hero-frame.png" 
                alt="Quadro Muzzicycles Azul" 
                className="w-full h-[420px] sm:h-[520px] object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/40 backdrop-blur px-3 py-1.5 border border-black/5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse"></span>
                  <span className="text-xs text-black/70 font-geist">Destaque: Quadro Muzzi Azul</span>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 text-xs rounded-lg bg-white/40 backdrop-blur px-3 h-8 border border-black/5 text-black/70 hover:bg-white/60 transition font-geist"
                >
                  Ver Detalhes
                  <Eye className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <FrameModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
