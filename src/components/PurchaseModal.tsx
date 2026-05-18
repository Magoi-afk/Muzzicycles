import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { X, Download, MessageCircle, Info, Phone } from 'lucide-react';
import { CartItem } from '../types';
import { WHATSAPP_NUMBER, PHYSICAL_PHONE } from '../constants';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

export default function PurchaseModal({ isOpen, onClose, items }: PurchaseModalProps) {
  const { t, i18n } = useTranslation();

  const handleDownload = () => {
    const locale = i18n.language === 'pt' ? 'pt-BR' : i18n.language === 'en' ? 'en-US' : 'es-ES';
    const date = new Date().toLocaleDateString(locale);
    const content = `${t('purchase_modal.file_header')} - ${date}\n\n` + 
      items.map(item => `- ${t(`products_data.${item.id}.name`, { defaultValue: item.name })} (${t('purchase_modal.file_qty')}: ${item.quantity})${item.selectedAro ? `\n  ${t('purchase_modal.file_rim')}: ${item.selectedAro}` : ''}`).join('\n') +
      `\n\n${t('purchase_modal.file_instructions')}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `order-muzzicycles-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(t('purchase_modal.whatsapp_message'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
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
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 h-10 w-10 rounded-full hover:bg-black/5 flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-medium font-geist tracking-tight mb-2">{t('purchase_modal.title')}</h2>
                <p className="text-black/60 font-geist text-sm">
                  {t('purchase_modal.subtitle')}
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex gap-3">
                  <Info className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <p className="text-xs text-brand-blue/80 font-geist leading-relaxed">
                    {t('purchase_modal.info')}
                  </p>
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full h-14 rounded-2xl bg-black text-white font-medium font-geist flex items-center justify-center gap-3 hover:bg-black/90 transition shadow-lg shadow-black/10"
                >
                  <Download className="w-5 h-5" />
                  {t('purchase_modal.download_button')}
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="w-full h-14 rounded-2xl bg-[#25D366] text-white font-medium font-geist flex items-center justify-center gap-3 hover:bg-[#20ba5a] transition shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('purchase_modal.whatsapp_button')}
                </button>

                <div className="mt-6 pt-6 border-t border-black/5">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-blue/5 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-[11px] text-black/60 font-geist leading-tight mb-1">
                        {t('purchase_modal.international_delivery')}
                      </p>
                      <p className="text-xs font-bold text-brand-blue font-geist">
                        {t('purchase_modal.international_contact', { phone: PHYSICAL_PHONE, whatsapp: `+${WHATSAPP_NUMBER}` })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-center text-[10px] text-black/40 font-geist uppercase tracking-widest">
                {t('purchase_modal.brand_tag')}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
