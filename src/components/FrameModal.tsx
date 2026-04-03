import { X, CheckCircle2, ShieldCheck, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FrameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FrameModal({ isOpen, onClose }: FrameModalProps) {
  const features = [
    "Reciclada", "Quadro com garantia vitalícia", "Ecologicamente correta", 
    "Não enferruja", "Elimina solda", "Não usa amortecedor", 
    "Não é pintada", "Design orgânico", "Andar macio", 
    "Projeto autossustentável", "Não utiliza ferro nem bauxita", 
    "Feita com mescla de resina termoplástica", "Beneficio em CO²", 
    "Diminui o efeito estufa", "PDL", "Aditivada com UV", 
    "Menos pressão na coluna vertebral e próstata", 
    "Absorve as imperfeições do chão", "Feitas com fonte renováveis", 
    "Economia de 90% de energia na produção", 
    "Usa menos de 1L de água na produção"
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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 h-10 w-10 rounded-full bg-black/5 flex items-center justify-center text-black/50 hover:bg-black/10 hover:text-black transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Content */}
            <div className="flex-1 overflow-y-auto p-8 sm:p-12 custom-scrollbar">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider mb-6">
                <ShieldCheck className="w-3 h-3" />
                Tecnologia Patenteada
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-medium tracking-tighter font-geist mb-8">
                O Coração da Muzzi
              </h2>

              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm text-black/70 font-geist leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-black/5">
                  <h3 className="text-2xl font-medium tracking-tight font-geist mb-4">"ELA"</h3>
                  <div className="space-y-4 text-black/70 font-geist leading-relaxed">
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

            {/* Right Side: Visuals */}
            <div className="lg:w-[380px] bg-gray-50 p-8 flex flex-col gap-6 border-l border-black/5">
              <div className="rounded-3xl overflow-hidden bg-white border border-black/5 shadow-sm group">
                <img 
                  src="https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/garantia.png" 
                  alt="Garantia Vitalícia" 
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511994298241-608e28f14f66?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                <div className="p-4 text-center">
                  <p className="text-xs font-bold text-brand-blue uppercase tracking-widest font-geist">Garantia Vitalícia</p>
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden bg-black aspect-video group cursor-pointer">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/VwWuyT0lYE8?si=09VYUXCssLDPTo0i" 
                  title="Muzzicycles Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>
              </div>

              <div className="mt-auto p-6 rounded-3xl bg-brand-blue text-white">
                <p className="text-sm font-medium font-geist leading-tight">
                  "A produção de cada quadro economiza 90% de energia e usa menos de 1L de água."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
