import { ArrowRight, ArrowUpRight, Truck, RotateCcw, Headphones, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
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
              <span className="block text-brand-blue tracking-tighter font-geist">
                100% plástico reciclado. 100% brasileira.
              </span>
            </h1>
            <div className="flex flex-wrap gap-3 mt-8 items-center">
              <a 
                href="#models" 
                className="group relative inline-flex items-center gap-2 text-sm font-medium text-white ring-1 ring-white/10 rounded-2xl font-geist" 
                style={{ 
                  background: 'linear-gradient(135deg, #3c7fdd 0%, #1e40af 100%)', 
                  boxShadow: '0 0 1.6em -0.6em #3c7fdd inset', 
                  height: '2.8em', 
                  padding: '0.35em 3.3em 0.35em 1.2em', 
                  letterSpacing: '0.02em' 
                }}
              >
                Explorar Bikes
                <span 
                  className="absolute right-[0.3em] flex items-center justify-center h-[2.2em] w-[2.2em] transition-all duration-300 group-hover:w-[calc(100%-0.6em)] active:scale-95 bg-white rounded-[0.7em]" 
                  style={{ boxShadow: '0.1em 0.1em 0.6em 0.2em rgba(60, 127, 221, 0.3)' }}
                >
                  <ArrowRight className="w-4 h-4 text-brand-blue transition-transform duration-300 group-hover:translate-x-[0.1em]" />
                </span>
              </a>
              <a href="#history" className="inline-flex items-center gap-2 text-sm text-black/70 hover:text-brand-blue transition font-geist">
                Nossa História
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-black/5 bg-white/40 backdrop-blur px-3 py-2">
                <span className="text-brand-blue font-bold">200kg+</span>
                <span className="text-xs text-black/70 font-geist">Plástico reciclado por quadro</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-black/5 bg-white/40 backdrop-blur px-3 py-2">
                <span className="text-brand-blue font-bold">100 anos</span>
                <span className="text-xs text-black/70 font-geist">De garantia estrutural</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-black/5 bg-white/40 backdrop-blur px-3 py-2">
                <span className="text-brand-blue font-bold">0 soldas</span>
                <span className="text-xs text-black/70 font-geist">Injeção monobloco</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-black/5 bg-white/40 backdrop-blur px-3 py-2">
                <span className="text-brand-blue font-bold">85%</span>
                <span className="text-xs text-black/70 font-geist">Material pós-consumo</span>
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
                src="/hero-frame.png" 
                alt="Quadro Muzzicycles Azul" 
                className="w-full h-[420px] sm:h-[520px] object-contain p-8"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/40 backdrop-blur px-3 py-1.5 border border-black/5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse"></span>
                  <span className="text-xs text-black/70 font-geist">Destaque: Quadro Muzzi Azul</span>
                </div>
                <button className="inline-flex items-center gap-2 text-xs rounded-lg bg-white/40 backdrop-blur px-3 h-8 border border-black/5 text-black/70 hover:bg-white/60 transition font-geist">
                  Ver Detalhes
                  <Eye className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
