import { motion, AnimatePresence } from 'motion/react';
import { X, Download, MessageCircle, Info } from 'lucide-react';
import { CartItem } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

export default function PurchaseModal({ isOpen, onClose, items }: PurchaseModalProps) {
  const handleDownload = () => {
    const date = new Date().toLocaleDateString('pt-BR');
    const content = `PEDIDO MUZZICYCLES - ${date}\n\n` + 
      items.map(item => `- ${item.name} (Quantidade: ${item.quantity})\n  Tamanho: [Informe o tamanho desejado ao vendedor]`).join('\n') +
      `\n\nInstruções: Envie este arquivo para o vendedor no WhatsApp para finalizar seu pedido.`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pedido-muzzicycles-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Olá! Acabei de gerar o arquivo do meu pedido Muzzicycles e gostaria de finalizar a compra.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
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
                <h2 className="text-2xl font-medium font-geist tracking-tight mb-2">Finalizar Pedido</h2>
                <p className="text-black/60 font-geist text-sm">
                  Siga os passos abaixo para completar sua solicitação com nossa equipe.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex gap-3">
                  <Info className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <p className="text-xs text-brand-blue/80 font-geist leading-relaxed">
                    Primeiro, baixe o arquivo com os detalhes do seu pedido. Depois, envie-o para o vendedor via WhatsApp.
                  </p>
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full h-14 rounded-2xl bg-black text-white font-medium font-geist flex items-center justify-center gap-3 hover:bg-black/90 transition shadow-lg shadow-black/10"
                >
                  <Download className="w-5 h-5" />
                  Iniciar Download
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="w-full h-14 rounded-2xl bg-[#25D366] text-white font-medium font-geist flex items-center justify-center gap-3 hover:bg-[#20ba5a] transition shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  Instruções para o Vendedor
                </button>
              </div>

              <p className="mt-8 text-center text-[10px] text-black/40 font-geist uppercase tracking-widest">
                Muzzicycles — Tecnologia Sustentável
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
