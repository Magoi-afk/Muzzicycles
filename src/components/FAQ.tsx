import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const faqs = [
    { q: "O que é o quadro Muzzicycles?", a: "É o primeiro quadro de bicicleta do mundo fabricado por injeção de polímeros reciclados (plástico pós-consumo), sem soldas e com garantia vitalícia." },
    { q: "Qual a durabilidade do quadro?", a: "O quadro é projetado para durar muito tempo. O material não sofre fadiga como o metal e é imune à oxidação." },
    { q: "Os quadros possuem certificação?", a: "Sim, todos os nossos modelos possuem certificação da Comunidade Europeia (CE), garantindo os mais altos padrões de segurança e qualidade internacional." },
    { q: "Quais aros estão disponíveis?", a: "Trabalhamos com modelos para aros 24, 26 e 29, atendendo desde o público juvenil até adultos em trilhas ou cidade." },
    { q: "Como funciona a garantia vitalícia?", a: "A garantia cobre qualquer defeito estrutural no quadro para o primeiro proprietário. É a nossa promessa de um produto eterno." },
    { q: "A bike aguenta impactos e trilhas?", a: "Sim. O polímero possui uma flexibilidade natural que absorve impactos melhor que o alumínio, tornando-a excelente para uso urbano e trilhas leves." },
    { q: "Como faço meu pedido?", a: "Você pode escolher seu modelo em nosso catálogo online e finalizar a compra via WhatsApp ou diretamente pelo site." },
    { q: "Vocês fazem entrega em todo o Brasil?", a: "Sim, enviamos nossas bicicletas e quadros para todos os estados brasileiros com embalagens reforçadas." },
    { q: "Posso comprar só o quadro?", a: "Sim, vendemos o Quadro Muzzi avulso para quem deseja montar sua própria configuração de componentes." },
    { q: "A Muzzicycles exporta?", a: "Sim, já exportamos para diversos países e possuímos patentes em mais de 140 nações." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-medium tracking-tighter font-geist mb-12 text-center">Perguntas Frequentes</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-black/5">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full py-6 flex items-center justify-between text-left group"
            >
              <span className="text-lg font-medium font-geist group-hover:text-brand-blue transition-colors">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-brand-blue' : 'text-black/30'}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-black/60 font-geist leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
