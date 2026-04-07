import { X, CheckCircle2, ShieldCheck, Play, Zap, Droplets, Award, Leaf, Settings, Heart as HeartIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FrameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FrameModal({ isOpen, onClose }: FrameModalProps) {
  const categories = [
    {
      title: "Sustentabilidade",
      icon: <Leaf className="w-5 h-5 text-green-500" />,
      features: [
        "100% Reciclada", 
        "Ecologicamente correta", 
        "Projeto autossustentável", 
        "Fontes renováveis", 
        "90% menos energia na produção", 
        "Menos de 1L de água por quadro", 
        "Crédito de CO²", 
        "Combate o efeito estufa"
      ]
    },
    {
      title: "Engenharia",
      icon: <Settings className="w-5 h-5 text-brand-blue" />,
      features: [
        "Garantia vitalícia no quadro", 
        "Não enferruja", 
        "Elimina processos de solda", 
        "Zero ferro ou bauxita", 
        "Resina termoplástica de alta tecnologia", 
        "Proteção UV aditivada"
      ]
    },
    {
      title: "Conforto & Design",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      features: [
        "Design orgânico e fluido", 
        "Andar extremamente macio", 
        "Amortecimento natural", 
        "Sem necessidade de pintura", 
        "Ergonomia PDL", 
        "Proteção para coluna e próstata", 
        "Absorção ativa de impactos"
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto lg:overflow-hidden bg-white rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row custom-scrollbar"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-20 h-10 w-10 rounded-full bg-black/5 flex items-center justify-center text-black/50 hover:bg-black/10 hover:text-black transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Content */}
            <div className="flex-1 lg:overflow-y-auto p-8 sm:p-12 custom-scrollbar min-h-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider mb-6">
                <ShieldCheck className="w-3 h-3" />
                Tecnologia Patenteada
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-medium tracking-tighter font-geist mb-12">
                O Coração da Muzzi
              </h2>

              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {categories.map((cat, idx) => (
                    <div key={idx} className="space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b border-black/5">
                        {cat.icon}
                        <h3 className="text-lg font-bold tracking-tight font-geist">{cat.title}</h3>
                      </div>
                      <div className="space-y-3">
                        {cat.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3 group">
                            <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                            <span className="text-sm text-black/70 font-geist leading-tight">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-8 rounded-[2rem] bg-gray-50 border border-black/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <HeartIcon className="w-32 h-32 text-brand-blue fill-current" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-medium tracking-tight font-geist mb-6 flex items-center gap-3">
                      <span className="text-brand-blue">"ELA"</span>
                    </h3>
                    <div className="grid lg:grid-cols-2 gap-8 text-black/70 font-geist leading-relaxed text-base">
                      <p>
                        Veio das estrelas com refinamento contemporâneo, de andar levíssimo, sem dúvida é a mais suave de todas. 
                        A motivação desde o seu nascimento gira em torno da fotossíntese, da biomassa e da reciclagem. 
                        Ela foi pensada para dar todo conforto ao ecossistema. Para seu nascimento não foi necessário extrair minérios de ferro nem bauxita e muito menos produzir alumina.
                      </p>
                      <p>
                        Ela é feliz, alegre, colorida, elegante, aerodinâmica e o mais importante: é produto da natureza, sem soldas nem pinturas. 
                        Ela é ecológica, por isso vive mais de cem anos. Por todos esses motivos pensamos que, no seu íntimo, toda bicicleta sonha em ser um dia uma "Muzzi".
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Visuals & Highlights */}
            <div className="lg:w-[420px] bg-gray-50 p-8 flex flex-col gap-8 border-l border-black/5 lg:overflow-y-auto custom-scrollbar min-h-0">
              <div className="space-y-8">
                <div className="relative rounded-3xl overflow-hidden bg-black aspect-video group cursor-pointer shadow-2xl ring-1 ring-black/5">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/VwWuyT0lYE8?si=09VYUXCssLDPTo0i" 
                    title="Muzzicycles Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between px-1">
                    <h4 className="text-[10px] font-bold text-black/30 uppercase tracking-[0.3em]">Performance & Impacto</h4>
                    <div className="h-px flex-1 ml-4 bg-black/5" />
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="p-6 rounded-3xl bg-white border border-black/5 flex items-center gap-5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group">
                      <div className="h-14 w-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                        <Award className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-0.5">Garantia</p>
                        <p className="text-lg font-medium text-black leading-tight">Vitalícia Estrutural</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-white border border-black/5 flex items-center gap-5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group">
                      <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                        <Zap className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-0.5">Energia</p>
                        <p className="text-lg font-medium text-black leading-tight">90% de Economia</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-white border border-black/5 flex items-center gap-5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group">
                      <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <Droplets className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-0.5">Água</p>
                        <p className="text-lg font-medium text-black leading-tight">&lt; 1L por Quadro</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto relative group">
                <div className="absolute inset-0 bg-brand-blue/20 blur-2xl rounded-full -z-10 group-hover:scale-110 transition-transform duration-500" />
                <div className="p-8 rounded-[2.5rem] bg-brand-blue text-white shadow-2xl shadow-brand-blue/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-4 -mt-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                    <Sparkles className="w-24 h-24" />
                  </div>
                  <p className="text-lg sm:text-xl font-medium font-geist leading-tight italic relative z-10">
                    "Toda bicicleta sonha em ser um dia uma Muzzi."
                  </p>
                  <div className="mt-4 flex items-center gap-2 opacity-50">
                    <div className="h-px w-8 bg-white" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Muzzicycles</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
