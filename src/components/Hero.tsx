import { ArrowRight, ArrowUpRight, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, Suspense } from 'react';
import Spline from '@splinetool/react-spline';
import WordRotate from './magicui/WordRotate';
import { LightRays } from './magicui/LightRays';
import FrameModal from './FrameModal';
import arImage from '../assets/images/regenerated_image_1778029817416.jpg';
import { cn } from '../lib/utils';

interface HeroProps {
  onHistoryClick?: () => void;
  onExploreClick?: () => void;
}

export default function Hero({ onHistoryClick, onExploreClick }: HeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="max-w-7xl sm:px-8 mx-auto px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LightRays 
          count={10} 
          color="rgba(37, 99, 235, 0.15)" 
          blur={40} 
          speed={15} 
          length="100%"
        />
      </div>
      <div className="pt-10 pb-10 sm:pt-10 sm:pb-10 lg:pt-10 lg:pb-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-[1.05] text-black tracking-tighter font-geist">
              A bike que nasce do que o mundo descarta
              <div className="min-h-[1.12em] mt-1 sm:mt-2">
                <WordRotate 
                  className="text-brand-blue tracking-tighter font-geist"
                  words={["plástico reciclado.", "100% brasileira.", "Garantia vitalícia."]}
                />
              </div>
            </h1>
            <div className="flex flex-wrap gap-3 mt-8 items-center">
              <button 
                onClick={onExploreClick}
                className="group relative inline-flex items-center gap-2 text-sm font-medium text-white ring-1 ring-white/10 rounded-2xl font-geist cursor-pointer" 
                style={{ 
                  background: 'linear-gradient(135deg, var(--color-brand-blue) 0%, var(--color-brand-blue-dark) 100%)', 
                  boxShadow: '0 0 1.6em -0.6em var(--color-brand-blue) inset', 
                  height: '2.8em', 
                  padding: '0.35em 3.3em 0.35em 1.2em', 
                  letterSpacing: '0.02em',
                  border: 'none'
                }}
              >
                Explorar Bikes
                <span 
                  className="absolute right-[0.3em] flex items-center justify-center h-[2.2em] w-[2.2em] transition-all duration-300 group-hover:w-[calc(100%-0.6em)] active:scale-95 bg-white rounded-[0.7em]" 
                  style={{ boxShadow: '0.1em 0.1em 0.6em 0.2em rgba(37, 99, 235, 0.3)' }}
                >
                  <ArrowRight className="w-4 h-4 text-brand-blue transition-transform duration-300 group-hover:translate-x-[0.1em]" />
                </span>
              </button>
              <button 
                onClick={onHistoryClick}
                className="inline-flex items-center gap-2 text-sm text-black/70 hover:text-brand-blue transition font-geist cursor-pointer"
              >
                Nossa História
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Statistics grid removed per user request */}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl overflow-hidden border border-black/5 bg-white/30 backdrop-blur h-[420px] sm:h-[520px]">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
              }>
                <Spline 
                  scene="https://prod.spline.design/VFBlxkxYx5mKQ3L1/scene.splinecode"
                  className="w-full h-full"
                />
              </Suspense>
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none"></div>
              
              {/* QR Code AR Section */}
              <div className="absolute top-4 right-4 pointer-events-auto">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="bg-white/90 backdrop-blur p-2 rounded-2xl border border-black/5 shadow-lg group/qr transition-all hover:scale-110"
                >
                  <div className="relative group/qr-container flex items-center justify-center">
                    <img 
                      src={arImage} 
                      alt="AR Experience" 
                      className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-xl transition-all duration-300 group-hover:scale-105 border-none"
                      referrerPolicy="no-referrer"
                    />
                    {/* AR Center Overlay from user reference image */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-5 h-5 sm:w-8 sm:h-8 bg-[#60a5fa] rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                        <span className="text-[6px] sm:text-[10px] font-bold text-black tracking-tighter uppercase">AR</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-brand-blue flex items-center justify-center gap-1">
                      <span className="h-1 w-1 rounded-full bg-brand-blue animate-pulse"></span>
                      Scan for AR
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/40 backdrop-blur px-3 py-1.5 border border-black/5 pointer-events-auto">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse"></span>
                  <span className="text-xs text-black/70 font-geist">Interativo: Gire para ver em 3D</span>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 text-xs rounded-lg bg-white/40 backdrop-blur px-3 h-8 border border-black/5 text-black/70 hover:bg-white/60 transition font-geist pointer-events-auto"
                >
                  Ficha Técnica
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
