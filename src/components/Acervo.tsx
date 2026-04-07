import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { History, Calendar, Award, Info } from 'lucide-react';

interface AcervoProps {
  onProductClick: (product: Product) => void;
}

export default function Acervo({ onProductClick }: AcervoProps) {
  const acervoProducts = PRODUCTS.filter(p => p.isAcervo);

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-widest mb-4 border border-amber-200">
          <History className="w-3 h-3" />
          Memória Muzzicycles
        </div>
        <h2 className="text-4xl sm:text-6xl font-medium tracking-tighter font-geist mb-6">Acervo Muzzi</h2>
        <p className="text-xl text-black/60 font-geist max-w-2xl mx-auto leading-relaxed">
          Uma jornada através de décadas de inovação sustentável. Conheça os modelos que definiram o futuro da mobilidade urbana.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {acervoProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
            onClick={() => onProductClick(product)}
          >
            <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden bg-gray-100 border border-black/5 mb-8">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform">
                <div className="text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 block mb-1">Modelo Histórico</span>
                  <h3 className="text-2xl font-medium font-geist">{product.name}</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Info className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="px-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-medium text-black/40 font-geist">
                  <Calendar className="w-3.5 h-3.5" />
                  {product.id === 'h1' ? '1998' : '2005'}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600 font-geist">
                  <Award className="w-3.5 h-3.5" />
                  {product.tag}
                </div>
              </div>
              <p className="text-lg text-black/70 font-geist leading-relaxed">
                {product.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="mt-32 pt-32 border-t border-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h3 className="text-3xl font-medium tracking-tighter font-geist mb-6">Linha do Tempo</h3>
            <p className="text-black/50 font-geist leading-relaxed">
              Desde o primeiro protótipo em 1998 até a produção em massa global, a Muzzicycles manteve o compromisso com a economia circular.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-12">
            {[
              { year: '1998', title: 'O Nascimento', desc: 'Juan Muzzi inicia os experimentos com injeção de polímeros reciclados para quadros de bicicleta.' },
              { year: '2005', title: 'Reconhecimento', desc: 'A Muzzicycles recebe prêmios internacionais de inovação e design sustentável na Europa.' },
              { year: '2012', title: 'Produção em Escala', desc: 'Inauguração da linha de montagem automatizada capaz de produzir um quadro a cada 3 minutos.' },
              { year: '2024', title: 'Expansão Global', desc: 'Mais de 130.000 bicicletas produzidas e presença em diversos países como símbolo de tecnologia brasileira.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="h-4 w-4 rounded-full bg-brand-blue border-4 border-white shadow-sm ring-1 ring-black/5" />
                  <div className="flex-1 w-px bg-black/5 my-2 group-last:hidden" />
                </div>
                <div className="pb-8">
                  <span className="text-2xl font-black italic text-brand-blue/20 group-hover:text-brand-blue/40 transition-colors font-geist leading-none block mb-2">{item.year}</span>
                  <h4 className="text-xl font-medium font-geist mb-2">{item.title}</h4>
                  <p className="text-black/50 font-geist leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
