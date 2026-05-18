import { motion } from 'motion/react';
import { Layers, ShieldCheck, Leaf, Box, Quote, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Innovation() {
  const { t } = useTranslation();
  
  const pillarIcons = [
    <Layers className="w-5 h-5" />,
    <ShieldCheck className="w-5 h-5" />,
    <Cpu className="w-5 h-5" />,
    <Box className="w-5 h-5" />
  ];

  const pillars = (t('history_pages.innovation.pillars', { returnObjects: true }) as any[]).map((p, i) => ({
    ...p,
    icon: pillarIcons[i]
  }));

  return (
    <section id="innovation" className="max-w-7xl mx-auto px-6 sm:px-8 py-20 bg-white text-black border border-black/5 rounded-[3rem] my-20 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="max-w-4xl mb-24">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-brand-blue font-bold uppercase tracking-widest text-xs mb-4 block"
        >
          {t('history_pages.innovation.badge')}
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-7xl font-medium tracking-tighter font-geist mb-8 leading-[0.9]"
        >
          {t('history_pages.innovation.title')}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl sm:text-2xl text-black/60 font-geist leading-relaxed max-w-3xl"
        >
          {t('history_pages.innovation.subtitle')}
        </motion.p>
      </div>

      {/* Grid Layout for Storytelling */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
        {/* Bio-Mimicry Content */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none text-black/80 font-geist"
          >
            <h3 className="text-2xl font-bold mb-6">{t('history_pages.innovation.bones.title')}</h3>
            <p className="mb-6">
              {t('history_pages.innovation.bones.p1')}
            </p>
            <p className="mb-6">
              {t('history_pages.innovation.bones.p2')}
            </p>
            
            <div className="bg-gray-50 p-8 rounded-[2rem] border border-black/5 my-12 italic relative">
              <Quote className="absolute top-4 left-4 w-8 h-8 text-brand-blue/20" />
              <p className="relative z-10 text-lg leading-relaxed">
                "{t('history_pages.innovation.bones.quote')}"
              </p>
              <footer className="mt-4 not-italic font-bold text-sm text-brand-blue">— Juan Muzzi</footer>
            </div>

            <p>
              {t('history_pages.innovation.bones.p3')}
            </p>
            <p className="mt-6">
              {t('history_pages.innovation.bones.p4')}
            </p>
          </motion.div>
        </div>

        {/* Sidebar / Feature list */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="sticky top-32 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-6">
              {pillars.map((p, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2rem] bg-black/5 border border-black/10 hover:bg-white hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {p.icon}
                  </div>
                  <h3 className="text-xl font-medium font-geist mb-2">{p.title}</h3>
                  <p className="text-sm text-black/50 font-geist leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Schumpeter Sidebar Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] bg-brand-blue text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Box className="w-32 h-32" />
              </div>
              <h4 className="text-xl font-bold mb-4 font-geist">{t('history_pages.innovation.schumpeter.title')}</h4>
              <p className="text-sm opacity-80 leading-relaxed font-geist mb-6">
                {t('history_pages.innovation.schumpeter.desc')}
              </p>
              <div className="text-[10px] uppercase tracking-widest font-bold opacity-60">{t('history_pages.innovation.schumpeter.badge')}</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* PDL & Nature Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-32 border-t border-black/5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="p-10 rounded-[3rem] bg-gray-900 text-white relative overflow-hidden">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-white/10" />
            <blockquote className="text-2xl font-medium leading-relaxed font-geist relative z-10">
              “{t('history_pages.innovation.nature.jung_quote')}”
            </blockquote>
            <cite className="block mt-8 text-brand-blue font-bold not-italic font-geist">
              — Carl Gustav Jung
            </cite>
          </div>
          
          <div className="prose prose-lg max-w-none text-black/70 font-geist">
            <h3 className="text-3xl font-bold text-black mb-6">{t('history_pages.innovation.nature.title')}</h3>
            <p>
              {t('history_pages.innovation.nature.p1')}
            </p>
            <p className="mt-4">
              {t('history_pages.innovation.nature.p2')}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <div className="p-12 rounded-[3rem] bg-brand-blue/5 border border-brand-blue/20">
            <h3 className="text-4xl font-medium tracking-tighter font-geist mb-8 text-black">{t('history_pages.innovation.pdl.title')}</h3>
            <div className="space-y-8 font-geist">
              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 text-brand-blue ring-1 ring-black/5">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-black">{t('history_pages.innovation.pdl.item1_title')}</h4>
                  <p className="text-black/60 text-sm">{t('history_pages.innovation.pdl.item1_desc')}</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 text-brand-blue ring-1 ring-black/5">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-black">{t('history_pages.innovation.pdl.item2_title')}</h4>
                  <p className="text-black/60 text-sm">{t('history_pages.innovation.pdl.item2_desc')}</p>
                </div>
              </div>

              <div className="pt-8 border-t border-brand-blue/10">
                <p className="text-sm italic text-black/50 leading-[1.6]">
                  "{t('history_pages.innovation.pdl.final_quote')}"
                </p>
                <div className="mt-4 font-bold text-xs uppercase tracking-widest text-brand-blue">— Juan Muzzi</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
