import { BadgeCheck, Send, Instagram, Youtube, Check, Music2, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

interface FooterProps {
  onViewChange?: (view: any) => void;
}

export default function Footer({ onViewChange }: FooterProps) {
  const handleViewChange = (view: string) => {
    if (onViewChange) {
      onViewChange(view);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="w-full max-w-7xl mx-auto px-6 sm:px-8 pt-12 pb-10">
      <div className="relative overflow-hidden bg-white border border-black/5 rounded-3xl">
        <div className="relative z-10 p-8 sm:p-12 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12 border-b border-black/5">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-4">
                <BadgeCheck className="w-5 h-5 text-black/80" />
                <img 
                  src="https://raw.githubusercontent.com/Magoi-afk/Muzzicycles/main/LogoMuzzi.png" 
                  alt="Muzzicycles" 
                  className="h-10 w-auto object-contain cursor-pointer"
                  referrerPolicy="no-referrer"
                  onClick={() => handleViewChange('home')}
                />
              </div>
              <p className="text-black/70 max-w-3xl font-geist">A primeira bicicleta do mundo com quadro feito de plástico reciclado. Inovação brasileira para um futuro sustentável.</p>

              <div className="mt-6 rounded-2xl border border-black/5 bg-gradient-to-b from-neutral-800 to-black shadow-2xl p-5 sm:p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20 px-2.5 py-1 text-xs font-geist">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse"></span>
                      Garantia Vitalícia no Quadro
                    </div>
                    <h4 className="text-white font-semibold tracking-tight font-geist">Faça parte da mudança</h4>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start gap-2 font-geist">
                        <Check className="w-3 h-3 text-brand-blue mt-0.5 flex-shrink-0" />
                        Novidades sobre novos modelos.
                      </li>
                      <li className="flex items-start gap-2 font-geist">
                        <Check className="w-3 h-3 text-brand-blue mt-0.5 flex-shrink-0" />
                        Conteúdo exclusivo sobre sustentabilidade.
                      </li>
                      <li className="flex items-start gap-2 font-geist">
                        <Check className="w-3 h-3 text-brand-blue mt-0.5 flex-shrink-0" />
                        Eventos e encontros da comunidade.
                      </li>
                    </ul>
                    <div className="pt-2">
                      <form className="flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
                        <input 
                          type="email" 
                          required 
                          placeholder="seu@email.com" 
                          className="w-full h-10 px-3 rounded-xl border border-white/20 bg-white/5 text-sm placeholder-white/40 text-white outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue backdrop-blur"
                        />
                        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-brand-blue text-sm text-white hover:bg-brand-blue/80 transition font-geist">
                          Enviar
                          <Send className="w-3 h-3" />
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
                    <div>
                      <h5 className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium font-geist">Bikes</h5>
                      <ul className="mt-3 space-y-2 text-sm text-white/70">
                        <li><button className="hover:text-white transition font-geist" onClick={() => handleViewChange('models')}>Catálogo</button></li>
                        <li><button className="hover:text-white transition font-geist" onClick={() => handleViewChange('models')}>Comparador</button></li>
                        <li><button className="hover:text-white transition font-geist" onClick={() => handleViewChange('models')}>Especificações</button></li>
                        <li><button className="hover:text-white transition font-geist" onClick={() => handleViewChange('models')}>Guia de Tamanhos</button></li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium font-geist">Ajuda</h5>
                      <ul className="mt-3 space-y-2 text-sm text-white/70">
                        <li><button className="hover:text-white transition font-geist" onClick={() => handleViewChange('faq')}>FAQ</button></li>
                        <li><a className="hover:text-white transition font-geist flex items-center gap-1.5" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                          Atendimento
                          <MessageCircle className="w-3 h-3" />
                        </a></li>
                        <li><a className="hover:text-white transition font-geist flex items-center gap-1.5" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                          Fale Conosco
                          <MessageCircle className="w-3 h-3" />
                        </a></li>
                        <li><a className="hover:text-white transition font-geist" href="tel:+5511995997454">(11) 99599-7454</a></li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium font-geist">Sobre</h5>
                      <ul className="mt-3 space-y-2 text-sm text-white/70">
                        <li><button className="hover:text-white transition font-geist" onClick={() => handleViewChange('history')}>Nossa História</button></li>
                        <li><button className="hover:text-white transition font-geist" onClick={() => handleViewChange('sustainability')}>Sustentabilidade</button></li>
                        <li><button className="hover:text-white transition font-geist" onClick={() => handleViewChange('innovation')}>Inovação e Patentes</button></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-sm text-black/60">
                  <span className="font-geist">© {new Date().getFullYear()} Muzzicycles</span>
                  <span className="hidden sm:inline text-black/20 font-geist">|</span>
                  <button 
                    onClick={() => handleViewChange('privacy')}
                    className="hover:text-black transition font-geist"
                  >
                    Privacidade
                  </button>
                  <span className="text-black/20 font-geist">/</span>
                  <button 
                    onClick={() => handleViewChange('terms')}
                    className="hover:text-black transition font-geist"
                  >
                    Termos
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <a aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-black/5 text-black/70 hover:text-black hover:bg-black/10 transition" href="https://www.instagram.com/muzzicycles/" target="_blank" rel="noreferrer">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a aria-label="TikTok" className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-black/5 text-black/70 hover:text-black hover:bg-black/10 transition" href="https://www.tiktok.com/@muzzicycles?lang=en" target="_blank" rel="noreferrer">
                    <Music2 className="w-4 h-4" />
                  </a>
                  <a aria-label="YouTube" className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-black/5 text-black/70 hover:text-black hover:bg-black/10 transition" href="https://www.youtube.com/@muzzicycles" target="_blank" rel="noreferrer">
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Ambient footer accents */}
            <div className="pointer-events-none absolute -z-0 inset-0">
              <div className="absolute -top-24 -left-16 h-56 w-56 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(110px 110px at 60% 60%, var(--color-brand-blue), transparent)' }}></div>
              <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(120px 120px at 40% 40%, var(--color-brand-blue-dark), transparent)' }}></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
