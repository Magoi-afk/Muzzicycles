import { motion } from 'motion/react';
import { Layers, ShieldCheck, Leaf, Box } from 'lucide-react';

export default function Innovation() {
  const pillars = [
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Plástico Reciclado",
      desc: "Transformamos resíduos plásticos em quadros de alta performance, retirando toneladas de poluentes do meio ambiente."
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Garantia Vitalícia",
      desc: "Nossa confiança no material é absoluta. O quadro Muzzi é feito para durar gerações, sem corrosão ou fadiga."
    },
    {
      icon: <Leaf className="w-5 h-5" />,
      title: "Zero Emissão",
      desc: "Processo de fabricação limpo, sem emissão de gases tóxicos e com 90% menos energia que o alumínio."
    },
    {
      icon: <Box className="w-5 h-5" />,
      title: "Monobloco",
      desc: "Injeção única que elimina soldas e pontos de fragilidade, resultando em um design orgânico e ultra-resistente."
    }
  ];

  return (
    <section id="innovation" className="max-w-7xl mx-auto px-6 sm:px-8 py-20 bg-black text-white rounded-[3rem] my-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tighter font-geist mb-6">Construída para o Futuro</h2>
        <p className="text-white/60 font-geist">
          A Muzzicycles redefine a engenharia ciclística através da sustentabilidade radical. Nossa tecnologia de injeção de polímeros é a resposta para um mundo que precisa de soluções, não de mais resíduos.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pillars.map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="h-10 w-10 rounded-xl bg-brand-blue flex items-center justify-center mb-4">
              {p.icon}
            </div>
            <h3 className="text-lg font-medium font-geist mb-2">{p.title}</h3>
            <p className="text-sm text-white/50 font-geist leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
