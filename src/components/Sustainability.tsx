import { motion } from 'motion/react';
import NumberTicker from './magicui/NumberTicker';

export default function Sustainability() {
  const benefits = [
    { title: "Sem Pintura", desc: "A cor é incorporada diretamente ao material, eliminando solventes e descascamento." },
    { title: "Sem Soldas", desc: "A injeção monobloco elimina processos de soldagem e a emissão de gases tóxicos." },
    { title: "Imune à Ferrugem", desc: "O polímero de alta tecnologia não oxida, sendo ideal para regiões litorâneas." },
    { title: "Reciclável", desc: "Ao final de sua longa vida útil, o quadro pode ser novamente reciclado." },
    { title: "Produção Rápida", desc: "Um quadro pronto a cada 3,4 minutos, com eficiência energética máxima." },
    { title: "Durabilidade", desc: "Projetada para durar muito tempo com garantia estrutural vitalícia." }
  ];

  return (
    <section id="sustainability" className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
      <div className="mb-16">
        <span className="text-brand-blue font-bold uppercase tracking-widest text-xs font-geist">PDL — Processo de Desenvolvimento Limpo</span>
        <h2 className="text-4xl sm:text-5xl font-medium tracking-tighter font-geist mt-4 mb-8">A Natureza Supera a Humanidade</h2>
        <p className="text-xl text-black/70 font-geist max-w-4xl leading-relaxed">
          Nosso processo PDL transforma o que seria lixo em estrutura. Reduzimos em 90% o consumo de energia em comparação aos quadros de alumínio ou aço, criando um ciclo fechado de sustentabilidade radical.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { val: 90, label: "Redução de Energia", suffix: "%" },
          { val: 100, label: "Materiais Reciclados", suffix: "%" },
          { val: 0, label: "Extração de Minério", prefix: "Zero" }
        ].map((stat, i) => (
          <div key={i} className="p-8 rounded-3xl border border-black/5 bg-white text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {stat.prefix && <span className="text-5xl font-medium text-brand-blue tracking-tighter font-geist">{stat.prefix}</span>}
              {stat.val !== 0 && <NumberTicker value={stat.val} className="text-5xl font-medium text-brand-blue tracking-tighter font-geist" />}
              {stat.suffix && <span className="text-5xl font-medium text-brand-blue tracking-tighter font-geist">{stat.suffix}</span>}
            </div>
            <span className="text-black/50 font-geist uppercase tracking-wider text-xs">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="mb-20 bg-brand-blue/5 rounded-[3rem] p-8 sm:p-16 border border-brand-blue/10">
        <h3 className="text-3xl font-medium font-geist mb-12 tracking-tight">Impacto Global Acumulado</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-2">
            <NumberTicker value={15840600} className="text-4xl font-black italic text-black" />
            <p className="text-xs text-brand-blue font-bold uppercase tracking-widest leading-tight">Kg de plástico reciclados</p>
          </div>
          <div className="space-y-2">
            <NumberTicker value={130000} className="text-4xl font-black italic text-black" />
            <p className="text-xs text-brand-blue font-bold uppercase tracking-widest leading-tight">Muzzicycles criadas</p>
          </div>
          <div className="space-y-2">
            <NumberTicker value={980732} className="text-4xl font-black italic text-black" />
            <p className="text-xs text-brand-blue font-bold uppercase tracking-widest leading-tight">Kg de petróleo economizados</p>
          </div>
          <div className="space-y-2">
            <NumberTicker value={5738267} className="text-4xl font-black italic text-black" />
            <p className="text-xs text-brand-blue font-bold uppercase tracking-widest leading-tight">Kg de CO2 evitados</p>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h3 className="text-2xl font-medium font-geist mb-6">Materiais que Transformamos</h3>
        <div className="flex flex-wrap gap-3">
          {["Polipropileno", "Poliestireno", "Nylon", "PET", "Polietileno", "Polialumínio Tetrapack", "Biomassa"].map((m, i) => (
            <span key={i} className="px-4 py-2 rounded-full border border-black/5 bg-gray-50 text-sm font-geist text-black/70">{m}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((b, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group"
          >
            <span className="text-brand-blue font-bold font-geist text-lg mb-2 block">0{i + 1}</span>
            <h4 className="text-xl font-medium font-geist mb-2">{b.title}</h4>
            <p className="text-black/50 font-geist leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
