import { useState } from 'react';
import { BadgeCheck, Send, Instagram, Youtube, Check, Music2, MessageCircle, Phone, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WHATSAPP_NUMBER, PHYSICAL_PHONE } from '../constants';
import { db, setDoc, doc, serverTimestamp } from '../firebase';

interface FooterProps {
  onViewChange?: (view: any, tab?: string) => void;
}

export default function Footer({ onViewChange }: FooterProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleViewChange = (view: string, tab?: string) => {
    if (onViewChange) {
      onViewChange(view, tab);
      window.scrollTo(0, 0);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus('idle');

    try {
      // Newsletter collection uses email as document ID
      const cleanedEmail = email.toLowerCase().trim();
      await setDoc(doc(db, "newsletter", cleanedEmail), {
        email: cleanedEmail,
        status: 'active',
        createdAt: serverTimestamp(),
      });
      
      // Enviar notificação para o admin
      try {
        await fetch('/api/newsletter-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanedEmail }),
        });
      } catch (notifyError) {
        console.warn("Falha ao notificar admin:", notifyError);
      }

      setStatus('success');
      setEmail('');
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Erro ao assinar newsletter:", error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-10">
      <div className="relative overflow-hidden bg-white border border-black/5 rounded-3xl">
        <div className="relative z-10 p-4 sm:p-12 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12 border-b border-black/5">
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-2 mb-4 justify-center sm:justify-start">
                <BadgeCheck className="w-5 h-5 text-black/80" />
                <img 
                  src="https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/LogoMuzzi.png" 
                  alt="Muzzicycles" 
                  className="h-10 w-auto object-contain cursor-pointer"
                  referrerPolicy="no-referrer"
                  onClick={() => handleViewChange('home')}
                />
              </div>
              <p className="text-black/70 max-w-3xl font-geist mx-auto sm:mx-0">{t('footer.brand_desc')}</p>

              <div className="mt-6 w-full rounded-2xl border border-black/5 bg-white shadow-sm p-4 sm:p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20 px-2.5 py-1 text-xs font-geist">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse"></span>
                      {t('footer.newsletter.badge')}
                    </div>
                    <h4 className="text-black font-semibold tracking-tight font-geist">{t('footer.newsletter.title')}</h4>
                    <ul className="space-y-2 text-sm text-black/70 flex flex-col items-center sm:items-start">
                      <li className="flex items-center gap-2 font-geist justify-center sm:justify-start">
                        <Check className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                        <span>{t('footer.newsletter.item1')}</span>
                      </li>
                      <li className="flex items-center gap-2 font-geist justify-center sm:justify-start">
                        <Check className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                        <span>{t('footer.newsletter.item2')}</span>
                      </li>
                      <li className="flex items-center gap-2 font-geist justify-center sm:justify-start">
                        <Check className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                        <span>{t('footer.newsletter.item3')}</span>
                      </li>
                    </ul>
                    <div className="pt-2 w-full max-w-sm sm:max-w-none">
                      <form className="flex flex-col gap-2" onSubmit={handleNewsletterSubmit}>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <input 
                            type="email" 
                            required 
                            id="newsletter-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('footer.newsletter.placeholder')} 
                            className="w-full h-10 px-3 rounded-xl border border-black/10 bg-black/5 text-sm placeholder-black/40 text-black outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue disabled:opacity-50 min-w-0"
                            disabled={loading || status === 'success'}
                          />
                          <button 
                            id="newsletter-submit"
                            type="submit"
                            disabled={loading || status === 'success'}
                            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-brand-blue text-sm text-white hover:bg-brand-blue/80 transition font-geist disabled:opacity-50 disabled:cursor-not-allowed sm:min-w-[100px] justify-center"
                          >
                            {loading ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <>
                                {t('footer.newsletter.send')}
                                <Send className="w-3 h-3" />
                              </>
                            )}
                          </button>
                        </div>
                        {status === 'success' && (
                          <p className="text-xs text-green-600 font-medium font-geist animate-in fade-in slide-in-from-top-1 text-center sm:text-left">
                            {t('footer.newsletter.success') || 'Inscrito com sucesso!'}
                          </p>
                        )}
                        {status === 'error' && (
                          <p className="text-xs text-red-600 font-medium font-geist animate-in fade-in slide-in-from-top-1 text-center sm:text-left">
                            {t('footer.newsletter.error') || 'Erro ao assinar. Tente novamente.'}
                          </p>
                        )}
                      </form>
                    </div>
                  </div>
                  <div className="lg:col-span-2 grid grid-cols-1 xs:grid-cols-3 gap-6 sm:gap-8 text-center xs:text-left">
                    <div className="flex flex-col items-center xs:items-start">
                      <h5 className="text-black/80 text-xs uppercase tracking-[0.2em] font-medium font-geist">{t('nav.bikes')}</h5>
                      <ul className="mt-3 space-y-2 text-sm text-black/70 flex flex-col items-center xs:items-start">
                        <li><button className="hover:text-black transition font-geist text-center xs:text-left" onClick={() => handleViewChange('bikes')}>{t('products.found_many')}</button></li>
                        <li><button className="hover:text-black transition font-geist text-center xs:text-left" onClick={() => handleViewChange('bikes')}>{t('products.categories.componentes')}</button></li>
                      </ul>
                    </div>
                    <div className="flex flex-col items-center xs:items-start">
                      <h5 className="text-black/80 text-xs uppercase tracking-[0.2em] font-medium font-geist">{t('nav.about')}</h5>
                      <ul className="mt-3 space-y-2 text-sm text-black/70 flex flex-col items-center xs:items-start">
                        <li><button className="hover:text-black transition font-geist text-center xs:text-left" onClick={() => handleViewChange('about', 'innovation')}>{t('footer.history_menu.innovation')}</button></li>
                        <li><button className="hover:text-black transition font-geist text-center xs:text-left" onClick={() => handleViewChange('about', 'history')}>{t('footer.history_menu.stories')}</button></li>
                        <li><button className="hover:text-black transition font-geist text-center xs:text-left" onClick={() => handleViewChange('about', 'sustainability')}>{t('footer.history_menu.sustainability')}</button></li>
                        <li><button className="hover:text-black transition font-geist text-center xs:text-left" onClick={() => handleViewChange('about', 'acervo')}>{t('footer.history_menu.collection')}</button></li>
                        <li><button className="hover:text-black transition font-geist text-center xs:text-left" onClick={() => handleViewChange('about', 'media')}>{t('footer.history_menu.media')}</button></li>
                      </ul>
                    </div>
                    <div className="col-span-1 xs:col-span-1 flex flex-col items-center xs:items-start">
                      <h5 className="text-black/80 text-xs uppercase tracking-[0.2em] font-medium font-geist">{t('nav.support')}</h5>
                      <ul className="mt-3 space-y-2 text-sm text-black/70 flex flex-col items-center xs:items-start">
                        <li><button className="hover:text-black transition font-geist text-center xs:text-left" onClick={() => handleViewChange('support', 'faq')}>FAQ</button></li>
                        <li><button className="hover:text-black transition font-geist text-center xs:text-left" onClick={() => handleViewChange('support', 'contact')}>{t('nav.support')}</button></li>
                        <li className="pt-2">
                          <a className="hover:text-black transition font-geist flex items-center gap-1.5 justify-center xs:justify-start" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                            WhatsApp
                            <MessageCircle className="w-3 h-3 flex-shrink-0" />
                          </a>
                        </li>
                        <li>
                          <span className="text-black/70 font-geist flex items-center gap-1.5 text-xs justify-center xs:justify-start">
                            {PHYSICAL_PHONE}
                            <Phone className="w-3 h-3 text-black/40 flex-shrink-0" />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="mt-8 w-full flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-2 text-xs sm:text-sm text-black/60 text-center">
                  <span className="font-geist whitespace-nowrap">© {new Date().getFullYear()} Muzzicycles</span>
                  <span className="hidden xs:inline text-black/20 font-geist">|</span>
                  <button 
                    onClick={() => handleViewChange('privacy')}
                    className="hover:text-black transition font-geist whitespace-nowrap"
                  >
                    {t('nav.privacy') || 'Privacidade'}
                  </button>
                  <span className="text-black/20 font-geist">/</span>
                  <button 
                    onClick={() => handleViewChange('terms')}
                    className="hover:text-black transition font-geist whitespace-nowrap"
                  >
                    {t('nav.terms') || 'Termos'}
                  </button>
                  <span className="hidden sm:inline text-black/20 font-geist">|</span>
                  <span className="text-[10px] font-geist uppercase tracking-widest block w-full xs:w-auto mt-1 xs:mt-0">{t('footer.rights')}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-right">
                  <div className="flex flex-col items-center sm:items-end gap-1">
                    <a 
                      href="https://www.magoi.online" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-[10px] text-black/40 hover:text-brand-blue transition font-geist uppercase tracking-widest whitespace-nowrap"
                    >
                      {t('footer.digital_consultancy')}
                    </a>
                    <span className="text-[8px] text-black/20 font-geist uppercase tracking-wider block">
                      {t('footer.dev_strategy')}
                    </span>
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
