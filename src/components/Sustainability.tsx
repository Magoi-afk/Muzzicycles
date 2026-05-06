import { motion } from 'motion/react';
import { FileText } from 'lucide-react';
import NumberTicker from './magicui/NumberTicker';

export default function Sustainability() {
  const categories = [
    {
      name: "Produção de Baixo Impacto",
      items: [
        { title: "Consumo de Água: ZERO", desc: "Processo de injeção a seco que não utiliza água em nenhuma etapa da produção do quadro." },
        { title: "Energia: 5,0 KWh", desc: "Eficiência energética extrema com consumo de apenas 5,0 KWh por quadro produzido." },
        { title: "Sem Soldas", desc: "A injeção monobloco elimina processos de soldagem e a emissão de gases tóxicos." },
      ]
    },
    {
      name: "Engenharia de Materiais",
      items: [
        { title: "Sem Pintura", desc: "A cor é incorporada diretamente ao material, eliminando solventes e o descascamento." },
        { title: "Imune à Ferrugem", desc: "O polímero de alta tecnologia não oxida, sendo ideal para regiões litorâneas e úmidas." },
        { title: "Resistência UV", desc: "Aditivos especiais que protegem o quadro contra o ressecamento solar e desbotamento." },
      ]
    },
    {
      name: "Segurança e Qualidade",
      items: [
        { title: "Certificação CE", desc: "Conformidade total com os padrões de segurança europeus para veículos leves." },
        { title: "Crash Test Aprovado", desc: "Estrutura testada sob rigorosos padrões de impacto, superando quadros metálicos." },
        { title: "Garantia Vitalícia", desc: "Confiança total na integridade estrutural do quadro monobloco reciclado." },
      ]
    }
  ];

  return (
    <section id="sustainability" className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
      <div className="mb-16">
        <span className="text-brand-blue font-bold uppercase tracking-widest text-xs font-geist">PDL — Processo de Desenvolvimento Limpo</span>
        <h2 className="text-4xl sm:text-5xl font-medium tracking-tighter font-geist mt-4 mb-8">Ecoeficiência em Cada Detalhe</h2>
        <p className="text-xl text-black/70 font-geist max-w-4xl leading-relaxed">
          Nosso processo PDL transforma o que seria lixo em estrutura. Reduzimos em 90% o consumo de energia em comparação aos quadros de alumínio ou aço, criando um novo padrão para a indústria.
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
            Ver Documento: A Natureza Supera
          </a>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
        {[
          { val: 5, label: "Energia (KWh/Quadro)", suffix: "" },
          { val: 0, label: "Consumo de Água", prefix: "Zero" },
          { val: 100, label: "Certificação de Segurança", prefix: "Cert" }
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
          <h3 className="text-4xl sm:text-5xl font-medium font-geist mb-6 tracking-tighter">Impacto Ambiental Real</h3>
          <p className="text-lg text-white/50 font-geist">Números que comprovam a viabilidade da economia circular aplicada à mobilidade urbana.</p>
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
              De plástico podem ser <span className="text-white font-bold">reciclados atualmente</span>, retirando toneladas de resíduos dos oceanos e aterros.
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
              Produzidas com <span className="text-white font-bold">energia limpa</span>, as Muzzicycles provam que o futuro é sustentável e escalável.
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
              Volume total de <span className="text-white/80 font-bold">petróleo economizado</span>, preservando recursos naturais finitos.
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
              Poupando a atmosfera de <span className="text-white/80 font-bold">CO2 em material incinerado</span>, gerando créditos de carbono reais.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mb-32">
        <span className="text-brand-blue font-bold uppercase tracking-widest text-[10px] mb-6 block">Matéria-Prima</span>
        <h3 className="text-3xl font-medium font-geist mb-8 tracking-tighter">Materiais que Transformamos</h3>
        <div className="flex flex-wrap gap-2">
          {["Polipropileno", "Poliestireno", "Nylon", "PET", "Polietileno", "Polialumínio Tetrapack", "Biomassa"].map((m, i) => (
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
