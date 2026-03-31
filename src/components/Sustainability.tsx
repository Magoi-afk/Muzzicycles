import { motion } from 'motion/react';

export default function Sustainability() {
  const benefits = [
    { title: "Sem Pintura", desc: "A cor é incorporada diretamente ao material, eliminando solventes e descascamento." },
    { title: "Sem Soldas", desc: "A injeção monobloco elimina processos de soldagem e a emissão de gases tóxicos." },
    { title: "Imune à Ferrugem", desc: "O polímero de alta tecnologia não oxida, sendo ideal para regiões litorâneas." },
    { title: "Reciclável", desc: "Ao final de sua longa vida útil, o quadro pode ser novamente reciclado." },
    { title: "Produção Rápida", desc: "Um quadro pronto a cada 3,4 minutos, com eficiência energética máxima." },
    { title: "Durabilidade", desc: "Projetada para durar mais de 100 anos com garantia estrutural vitalícia." }
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
          { val: "90%", label: "Redução de Energia" },
          { val: "100%", label: "Materiais Reciclados" },
          { val: "Zero", label: "Extração de Minério" }
        ].map((stat, i) => (
          <div key={i} className="p-8 rounded-3xl border border-black/5 bg-white text-center">
            <span className="block text-5xl font-medium text-brand-blue tracking-tighter font-geist mb-2">{stat.val}</span>
            <span className="text-black/50 font-geist uppercase tracking-wider text-xs">{stat.label}</span>
          </div>
        ))}
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
