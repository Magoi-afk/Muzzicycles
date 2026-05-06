import { motion } from 'motion/react';
import { Layers, ShieldCheck, Leaf, Box, Quote, Cpu } from 'lucide-react';

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
      icon: <Cpu className="w-5 h-5" />,
      title: "Bio-Engenharia",
      desc: "Estrutura inspirada na biomecânica dos ossos ocos para máxima resistência com 30% menos peso."
    },
    {
      icon: <Box className="w-5 h-5" />,
      title: "Processo PDL",
      desc: "Processo de Desenvolvimento Limpo: 90% menos consumo de energia comparado ao alumínio."
    }
  ];

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
          Inovação Disruptiva
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-7xl font-medium tracking-tighter font-geist mb-8 leading-[0.9]"
        >
          Da estrutura óssea ao Processo de Desenvolvimento Limpo (PDL)
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl sm:text-2xl text-black/60 font-geist leading-relaxed max-w-3xl"
        >
          A Muzzicycles redefine a engenharia ciclística através da sustentabilidade radical e do mimetismo da natureza.
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
            <h3 className="text-2xl font-bold mb-6">O Mistério dos Ossos Ocos</h3>
            <p className="mb-6">
              Um dos mistérios da vida determinou que os ossos fossem ocos. E em estudos avançados o homem descobre que, se não fosse assim, o coração teria que fazer mais esforço e trabalharia muito mais. Além disso, o peso do corpo aumentaria em mais 20%, e os membros entortariam com facilidade.
            </p>
            <p className="mb-6">
              São cavidades internas que formam um conjunto mais harmônico em relação à compressão, flexão, e à tração exigidas nesse sistema. Os ossos ocos na formação do esqueleto permitiram ao homem e aos animais vertebrados uma vida mais longa, oferecendo maior agilidade, equilíbrio e leveza até para voar, e uma resistência mecânica muito acima do que se imaginaria para um osso maciço.
            </p>
            
            <div className="bg-gray-50 p-8 rounded-[2rem] border border-black/5 my-12 italic relative">
              <Quote className="absolute top-4 left-4 w-8 h-8 text-brand-blue/20" />
              <p className="relative z-10 text-lg leading-relaxed">
                "A sofisticação do mecanismo estrutural no esqueleto permitiu pensar em uma estrutura óssea utilizada no quadro de uma bicicleta. Algo que pudesse oferecer leveza e agilidade, assim como segurança a todo o corpo do projeto."
              </p>
              <footer className="mt-4 not-italic font-bold text-sm text-brand-blue">— Juan Muzzi</footer>
            </div>

            <p>
              Com esse raciocínio foram criadas as partes internas do quadro, com variações de volume em diversas localizações, o que trouxe mais equilíbrio e harmonia ao comportamento estrutural do quadro. Assim como as asas do avião, que o vento exerce uma flexão amortecendo o impacto na estrutura principal, no quadro da bicicleta, foi utilizado o mesmo princípio.
            </p>
            <p className="mt-6">
              A estrutura se flexiona até um certo ponto ao andar, deixando o quadro macio e amortecendo os impactos no ciclista. Para isso acontecer é necessário um molde para injeção de plástico assistido com gás nitrogênio em até 30% do volume do produto. O quadro esqueleto pesa 30% menos que o quadro maciço, e aumenta consideravelmente a sua resistência.
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
              <h4 className="text-xl font-bold mb-4 font-geist">A Miragem da Inovação</h4>
              <p className="text-sm opacity-80 leading-relaxed font-geist mb-6">
                O economista Joseph Schumpeter afirmava que empreendedor não é quem monta um negócio qualquer, mas quem consegue criar um produto ou processo realmente inovador que provoque ruptura com o padrão existente.
              </p>
              <div className="text-[10px] uppercase tracking-widest font-bold opacity-60">Teoria de Schumpeter</div>
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
              “Até hoje, os grandes problemas da humanidade nunca foram resolvidos por decretos coletivos, mas somente pela renovação da atitude do indivíduo. Em tempo algum, meditar sobre si mesmo foi uma necessidade tão imperiosa.”
            </blockquote>
            <cite className="block mt-8 text-brand-blue font-bold not-italic font-geist">
              — Carl Gustav Jung
            </cite>
          </div>
          
          <div className="prose prose-lg max-w-none text-black/70 font-geist">
            <h3 className="text-3xl font-bold text-black mb-6">A Natureza Supera a Humanidade</h3>
            <p>
              A superação natural é diária, constante e silenciosa. Temos muito para aprender com os 4.000 milhões de anos de atividade contínua da natureza, que nos proporciona modelos superiores para uma sociedade mais sustentável.
            </p>
            <p className="mt-4">
              O descarte de materiais plásticos e a produção de alumínio são processos ambientalmente incorretos em larga escala. Por isso, elaboramos um processo industrial contemporâneo que produz um quadro com garantia vitalícia, baseado no princípio da fotossíntese.
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
            <h3 className="text-4xl font-medium tracking-tighter font-geist mb-8 text-black">Processo de Desenvolvimento Limpo (PDL)</h3>
            <div className="space-y-8 font-geist">
              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 text-brand-blue ring-1 ring-black/5">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-black">Resíduo Plástico Zero</h4>
                  <p className="text-black/60 text-sm">Aproveitamos biomassa e resíduos plásticos descartados para injetar quadros sem extratismo mineral.</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 text-brand-blue ring-1 ring-black/5">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-black">90% Economia de Energia</h4>
                  <p className="text-black/60 text-sm">Reduzimos drasticamente o efeito estufa e o consumo energético comparado aos métodos tradicionais de alumínio.</p>
                </div>
              </div>

              <div className="pt-8 border-t border-brand-blue/10">
                <p className="text-sm italic text-black/50 leading-[1.6]">
                  "Este PDL nos dá as características para um novo conceito de mobilidade, reunindo arte, filosofia, tecnologia e sutilezas, tais como, solidariedade e a ação ecologicamente correta."
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
