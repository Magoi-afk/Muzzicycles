import { motion } from 'motion/react';

export default function History() {
  const timeline = [
    { year: "1998", title: "O Início", desc: "Juan Muzzi inicia pesquisas revolucionárias com PET e Nylon." },
    { year: "2008", title: "A Conquista", desc: "Conclusão do processo de produção por injeção monobloco." },
    { year: "2009", title: "Certificação", desc: "Testes rigorosos e aprovação total pelo INMETRO." },
    { year: "2012", title: "Lançamento", desc: "Início comercial e patente registrada em 140 países." },
    { year: "Hoje", title: "Expansão", desc: "Presença nos EUA, Alemanha e toda a Europa." }
  ];

  return (
    <section id="history" className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <h2 className="text-4xl font-medium tracking-tighter font-geist mb-8">Nossa História</h2>
          <p className="text-lg text-black/70 font-geist leading-relaxed mb-6">
            Juan Muzzi, artista plástico uruguaio radicado no Brasil há mais de 40 anos, dedicou 12 anos de sua vida para provar que o plástico pós-consumo poderia ser a base de uma mobilidade urbana indestrutível.
          </p>
          <div className="p-8 rounded-3xl bg-brand-blue/5 border border-brand-blue/10 italic text-brand-blue font-geist text-xl">
            "Não estamos apenas fazendo bicicletas, estamos limpando o planeta e oferecendo liberdade eterna."
            <span className="block mt-4 text-sm font-bold not-italic">— Juan Muzzi</span>
          </div>
        </div>
        <div className="lg:col-span-7">
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
    </section>
  );
}
