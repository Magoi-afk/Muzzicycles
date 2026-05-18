import { motion } from 'motion/react';
import { FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NumberTicker from './magicui/NumberTicker';

export default function Sustainability() {
  const { t } = useTranslation();
  const categories = t('sustainability.categories', { returnObjects: true }) as any[];
  const materials = t('sustainability.materials.list', { returnObjects: true }) as string[];

  return (
    <section id="sustainability" className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
      <div className="mb-16">
        <span className="text-brand-blue font-bold uppercase tracking-widest text-xs font-geist">{t('sustainability.badge')}</span>
        <h2 className="text-4xl sm:text-5xl font-medium tracking-tighter font-geist mt-4 mb-8">{t('sustainability.title')}</h2>
        <p className="text-xl text-black/70 font-geist max-w-4xl leading-relaxed">
          {t('sustainability.desc')}
        </p>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <a 
            href="https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/A%20Natureza%20Supera.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-brand-blue text-white rounded-2xl font-geist font-bold text-sm hover:scale-105 transition-transform shadow-xl shadow-brand-blue/20"
          >
            <FileText className="w-5 h-5" />
            {t('sustainability.doc_button')}
          </a>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
        {[
          { val: 5, label: t('sustainability.stats.energy'), suffix: "" },
          { val: 0, label: t('sustainability.stats.water'), prefix: t('sustainability.stats.water_zero') },
          { val: 100, label: t('sustainability.stats.security'), prefix: t('sustainability.stats.security_cert') }
        ].map((stat, i) => (
          <div key={i} className="p-8 rounded-3xl border border-black/5 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center gap-1 mb-2">
              {stat.prefix && <span className="text-4xl lg:text-5xl font-black text-brand-blue tracking-tighter font-geist">{stat.prefix}</span>}
              {stat.val !== 0 && <NumberTicker value={stat.val} className="text-4xl lg:text-5xl font-black text-brand-blue tracking-tighter font-geist" />}
              {stat.suffix && <span className="text-4xl lg:text-5xl font-black text-brand-blue tracking-tighter font-geist">{stat.suffix}</span>}
            </div>
            <div className="text-center">
              <span className="text-black/40 font-geist uppercase tracking-widest text-[10px] font-bold">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-32 bg-gray-950 rounded-[3rem] p-8 sm:p-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-blue/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-3xl mb-20 relative z-10">
          <h3 className="text-4xl sm:text-5xl font-medium font-geist mb-6 tracking-tighter">{t('sustainability.impact.title')}</h3>
          <p className="text-lg text-white/50 font-geist">{t('sustainability.impact.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5 border-l border-brand-blue/30 pl-10"
          >
            <div className="flex items-baseline gap-2">
              <NumberTicker value={15840600} className="text-5xl lg:text-7xl font-black font-geist text-brand-blue" />
              <span className="text-2xl font-medium text-brand-blue/40 font-geist uppercase tracking-tighter">Kg</span>
            </div>
            <p className="text-xl text-white/70 font-geist leading-snug max-w-sm">
              {t('sustainability.impact.plastic')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-5 border-l border-brand-blue/30 pl-10"
          >
            <div className="flex items-baseline gap-2">
              <NumberTicker value={130000} className="text-5xl lg:text-7xl font-black font-geist text-brand-blue" />
            </div>
            <p className="text-xl text-white/70 font-geist leading-snug max-w-sm">
              {t('sustainability.impact.clean_energy')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-5 border-l border-brand-blue/10 pl-10"
          >
            <div className="flex items-baseline gap-2">
              <NumberTicker value={980732} className="text-5xl lg:text-7xl font-black font-geist text-brand-blue/80" />
              <span className="text-2xl font-medium text-brand-blue/30 font-geist uppercase tracking-tighter">Kg</span>
            </div>
            <p className="text-xl text-white/50 font-geist leading-snug max-w-sm">
              {t('sustainability.impact.oil')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-5 border-l border-brand-blue/10 pl-10"
          >
            <div className="flex items-baseline gap-2">
              <NumberTicker value={5738267} className="text-5xl lg:text-7xl font-black font-geist text-brand-blue/80" />
              <span className="text-2xl font-medium text-brand-blue/30 font-geist uppercase tracking-tighter">Kg</span>
            </div>
            <p className="text-xl text-white/50 font-geist leading-snug max-w-sm">
              {t('sustainability.impact.co2')}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mb-32">
        <span className="text-brand-blue font-bold uppercase tracking-widest text-[10px] mb-6 block">{t('sustainability.materials.badge')}</span>
        <h3 className="text-3xl font-medium font-geist mb-8 tracking-tighter">{t('sustainability.materials.title')}</h3>
        <div className="flex flex-wrap gap-2">
          {materials.map((m, i) => (
            <span key={i} className="px-5 py-3 rounded-2xl border border-black/5 bg-white text-sm font-geist text-black/60 hover:bg-gray-50 transition-colors shadow-sm">{m}</span>
          ))}
        </div>
      </div>

      <div className="space-y-24">
        {categories.map((cat, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="flex items-center gap-6 mb-12">
              <h3 className="text-2xl font-medium font-geist tracking-tight">{cat.name}</h3>
              <div className="h-px bg-black/5 flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {cat.items.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-8 w-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center text-[10px] font-black italic">
                      {categoryIndex + 1}.{i + 1}
                    </span>
                    <h4 className="text-lg font-bold font-geist tracking-tight">{item.title}</h4>
                  </div>
                  <p className="text-black/50 font-geist leading-relaxed text-sm pl-11">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
