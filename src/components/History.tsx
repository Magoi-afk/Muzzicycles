import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Globe, Award, ShieldCheck } from 'lucide-react';

const LazyGlobe3DDemo = React.lazy(() => import('./3d-globe-demo'));

export default function History() {
  const { t } = useTranslation();
  const timeline = t('story.timeline', { returnObjects: true }) as any[];
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="history" className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-12 xl:col-span-5">
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tighter font-geist mb-8">{t('story.title')}</h2>
          <p className="text-lg text-black/70 font-geist leading-relaxed mb-6">
            {t('story.intro')}
          </p>
          <div className="p-8 rounded-3xl bg-brand-blue/5 border border-brand-blue/10 italic text-brand-blue font-geist text-xl mb-8">
            "{t('story.quote')}"
            <span className="block mt-4 text-sm font-bold not-italic">— Juan Muzzi</span>
          </div>
        </div>
        <div className="lg:col-span-12 xl:col-span-7">
          <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-px before:bg-black/5">
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-1 h-[34px] w-[34px] rounded-full bg-white border-4 border-brand-blue flex items-center justify-center z-10"></div>
                <span className="text-brand-blue font-bold font-geist text-sm">{item.year}</span>
                <h3 className="text-xl font-medium font-geist mt-1">{item.title}</h3>
                <p className="text-black/50 font-geist mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-20 border-t border-black/5">
        <div className="max-w-2xl mb-12">
          <span className="text-brand-blue font-bold uppercase tracking-widest text-[10px] mb-4 block">{t('story.global.badge')}</span>
          <h3 className="text-3xl font-medium font-geist tracking-tighter">{t('story.global.title')}</h3>
          <p className="text-black/50 font-geist mt-4">{t('story.global.desc')}</p>
        </div>
        
        <div className="relative h-[380px] sm:h-[500px] lg:h-[600px] rounded-[2.5rem] sm:rounded-[3rem] bg-slate-900 border border-black/5 overflow-hidden text-white flex items-center justify-center">
          {!isMobile ? (
            <Suspense fallback={
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-slate-950 text-white">
                <Globe className="w-12 h-12 text-brand-blue animate-pulse" />
                <p className="text-xs font-geist uppercase tracking-widest text-slate-400">Carregando Mapa Global 3D...</p>
              </div>
            }>
              <div className="absolute inset-0 flex items-center justify-center">
                <LazyGlobe3DDemo />
              </div>
            </Suspense>
          ) : (
            /* Lightweight Static Fallback for Mobile */
            <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center text-brand-blue">
                <Globe className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-medium font-geist text-white">Presença Global Muzzicycles</h4>
              <p className="text-slate-400 text-sm max-w-sm font-geist">
                Exportando tecnologia brasileira sustentável em polímero reciclado para a América Latina, Europa e Ásia.
              </p>
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-brand-blue">Brasil</span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-slate-300">União Europeia</span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-slate-300">América Latina</span>
              </div>
            </div>
          )}
          
          {/* Legend Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3 pointer-events-none">
            <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/10 text-[10px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
              {t('story.global.warranty')}
            </div>
            <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/10 text-[10px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              {t('story.global.certification')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
