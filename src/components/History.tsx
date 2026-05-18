import { motion } from 'motion/react';
import Globe3DDemo from './3d-globe-demo';
import { useTranslation } from 'react-i18next';

export default function History() {
  const { t } = useTranslation();
  const timeline = t('story.timeline', { returnObjects: true }) as any[];

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
        
        <div className="relative h-[500px] lg:h-[600px] rounded-[3rem] bg-gray-50 border border-black/5 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Globe3DDemo />
          </div>
          
          {/* Legend Overlay */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-4 pointer-events-none">
            <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-xl border border-black/5 text-[10px] font-bold text-black/40 uppercase tracking-widest">
              {t('story.global.warranty')}
            </div>
            <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-xl border border-black/5 text-[10px] font-bold text-black/40 uppercase tracking-widest">
              {t('story.global.certification')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
