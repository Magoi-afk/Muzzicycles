import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { History, Calendar, Award, Info, FileText, Download } from 'lucide-react';

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
                className="w-full h-full object-cover transition-all duration-700"
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
              { year: '1976', title: 'Fundação Imaplast', desc: 'Juan Muzzi funda a Imaplast Indústria de Moldes, estabelecendo a expertise em ferramentaria industrial.' },
              { year: '1998', title: 'O Nascimento', desc: 'Juan Muzzi inicia os experimentos com injeção de polímeros reciclados e pesquisas com nylon e PET.' },
              { year: '2002', title: 'Injeção de Nylon', desc: 'Primeiros quadros injetados com sucesso em nylon, marcando a viabilidade técnica do monobloco.' },
              { year: '2008', title: 'Molde Industrial', desc: 'Conclusão do molde de 7 toneladas e esculpimento do design final do quadro Muzzi.' },
              { year: '2009', title: 'Certificação', desc: 'Testes de colisão e resistência de 3.5 toneladas aprovados pelos laboratórios Falcão Bauer e selo INMETRO.' },
              { year: '2011', title: 'Inovação em Blendas', desc: 'Desenvolvimento de blendas com embalagens Tetra-Pak e outros polímeros de alta densidade.' },
              { year: '2016', title: 'Escala Global', desc: 'Produção consolidada com materiais diversos e exportação para mais de 50 países.' },
              { year: '2024', title: 'Futuro Orgânico', desc: 'Pesquisa avançada em materiais provenientes da fotossíntese para quadros 100% biodegradáveis.' }
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
      {/* Technical Features Section */}
      <div className="mt-32 pt-32 border-t border-black/5">
        <div className="mb-12">
          <h3 className="text-3xl font-medium tracking-tighter font-geist mb-4">DNA de Engenharia</h3>
          <p className="text-black/50 font-geist">Diferenciais técnicos que tornam a Muzzicycles única no mundo.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Estrutural', val: 'Monobloco', desc: 'Elimina solda e fadiga de materiais.' },
            { label: 'Resistência', val: '3.5 Toneladas', desc: 'Testado por laboratórios Falcão Bauer.' },
            { label: 'Flexibilidade', val: 'Nylon/PET', desc: 'Absorve trepidação do solo naturalmente.' },
            { label: 'Garantia', val: 'Vitalícia', desc: 'Confiança total na durabilidade do quadro.' },
            { label: 'Manutenção', val: 'Zero', desc: 'Não enferruja e é resistente a raios UV.' },
            { label: 'Saúde', val: 'Ergonômica', desc: 'Reduz pressão na coluna e próstata.' },
            { label: 'Cor', val: 'Injetada', desc: 'Acabamento direto no molde, sem pintura.' },
            { label: 'Ecologia', val: '♻️ Circular', desc: 'Feita de plásticos que seriam descartados.' }
          ].map((stat, i) => (
            <div key={i} className="group">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-blue/50 block mb-2">{stat.label}</span>
              <div className="text-2xl font-medium font-geist mb-2 group-hover:text-brand-blue transition-colors">{stat.val}</div>
              <p className="text-xs text-black/40 font-geist leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Documentation Section */}
      <div className="mt-32 pt-32 border-t border-black/5">
        <div className="mb-12">
          <h3 className="text-3xl font-medium tracking-tighter font-geist mb-4">Documentação & Acervo Digital</h3>
          <p className="text-black/50 font-geist">Acesse materiais técnicos, apresentações históricas e certificações da Muzzicycles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Apresentação Institucional",
              desc: "Histórico completo, fases de construção do molde e testes de crash test (1998-2024).",
              icon: FileText,
              link: "/pdfs/apresentacao_institucional.pdf",
              action: "Visualizar PDF"
            },
            {
              title: "Patentes Mundiais",
              desc: "Registros oficiais de patentes nos Estados Unidos, Holanda e outros territórios globais.",
              icon: Award,
              link: "/pdfs/patentes.pdf",
              action: "Detalhes Técnicos"
            },
            {
              title: "Relatório de Sustentabilidade",
              desc: "Impacto ambiental: economia de petróleo e redução drástica de emissões de CO2.",
              icon: History,
              link: "/pdfs/sustentabilidade.pdf",
              action: "Baixar Relatório"
            },
            {
              title: "Catálogo de Componentes",
              desc: "Guia técnico de peças, compatibilidades e especificações do quadro monobloco.",
              icon: FileText,
              link: "/pdfs/catalogo_pecas.pdf",
              action: "Abrir Catálogo"
            },
            {
              title: "Manual do Usuário",
              desc: "Instruções de montagem, cuidados com o polímero e termos da garantia vitalícia.",
              icon: Info,
              link: "/pdfs/manual_usuario.pdf",
              action: "Ler Manual"
            },
            {
              title: "Certificações Técnicas",
              desc: "Laudos laboratoriais Falcão Bauer e selos de conformidade INMETRO.",
              icon: Award,
              link: "/pdfs/certificacoes.pdf",
              action: "Ver Laudos"
            }
          ].map((doc, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-8 rounded-[2rem] bg-gray-50 border border-black/5 group hover:bg-white hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="h-12 w-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <doc.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-medium font-geist mb-2">{doc.title}</h4>
              <p className="text-sm text-black/50 font-geist mb-6 flex-grow">
                {doc.desc}
              </p>
              <a 
                href={doc.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-blue group-hover:gap-3 transition-all"
              >
                <Download className="w-4 h-4" />
                {doc.action}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
