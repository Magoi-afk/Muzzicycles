import { useState } from 'react';
import { ShoppingCart, Shield, Truck, Phone, MessageCircle, ArrowLeft, Check, Copy, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CartItem } from '../types';
import { PHYSICAL_PHONE, WHATSAPP_NUMBER } from '../constants';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onComplete?: () => void;
}

export default function Checkout({ items, onBack }: CheckoutProps) {
  const { i18n } = useTranslation();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    state: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getSubtotal = () => items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(i18n.language.startsWith('pt') ? 'pt-BR' : i18n.language.startsWith('es') ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: i18n.language.startsWith('pt') ? 'BRL' : i18n.language.startsWith('es') ? 'EUR' : 'USD'
    }).format(amount);
  };

  const getWhatsAppUrl = () => {
    const itemsText = items.map(i => `- Muzzicycle ${i.name} (${i.quantity}x) ${i.selectedAro ? `[Aro ${i.selectedAro}]` : ''} - ${formatCurrency(i.price * i.quantity)}`).join('\n');
    let message = `Olá! Gostaria de encomendar e finalizar a compra da minha Muzzicycles:\n\n*Itens do Pedido:*\n${itemsText}\n\n*Total Estimado:* ${formatCurrency(getSubtotal())}`;
    
    if (formData.name || formData.phone || formData.city) {
      message += `\n\n*Meus Dados:*\nNome: ${formData.name || 'Não informado'}\nTelefone: ${formData.phone || 'Não informado'}\nCidade/UF: ${formData.city || ''} ${formData.state || ''}`;
    }

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleCopy = (text: string, type: 'phone' | 'whatsapp') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedWhatsapp(true);
      setTimeout(() => setCopiedWhatsapp(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium font-geist text-black/60 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para os produtos
        </button>

        {/* Main Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-black/5 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-black/5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider mb-3">
                <Shield className="w-3.5 h-3.5" />
                Atendimento Direto & Encomendas
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold font-geist text-black tracking-tight">
                Encomende & Pague por Atendimento Direto
              </h1>
              <p className="text-black/70 font-geist text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                Devido à produção sustentável em polímero reciclado e personalização do seu pedido, as vendas e pagamentos são efetuados diretamente com nossa equipe técnica através do Telefone ou WhatsApp abaixo:
              </p>
            </div>

            <div className="hidden sm:flex h-16 w-16 rounded-2xl bg-brand-blue/10 text-brand-blue items-center justify-center shrink-0">
              <Phone className="w-8 h-8 animate-pulse" />
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            {/* Phone Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden group">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-1 font-geist">
                  Telefone Fixo da Central
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-geist tracking-tight text-white mb-2">
                  (11) 3966-6533
                </h3>
                <p className="text-xs text-slate-300 font-geist leading-relaxed">
                  Ligue diretamente para tirar dúvidas, calcular frete e finalizar o pagamento do seu pedido.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a 
                  href="tel:1139666533"
                  className="flex-1 h-12 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold font-geist text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/30"
                >
                  <Phone className="w-4 h-4" />
                  Ligar para (11) 3966-6533
                </a>
                <button
                  onClick={() => handleCopy('(11) 3966-6533', 'phone')}
                  title="Copiar número"
                  className="h-12 w-12 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                >
                  {copiedPhone ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0b4e28] text-white flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden group">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-green-200/80 block mb-1 font-geist">
                  WhatsApp Oficial
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-geist tracking-tight text-white mb-2">
                  (11) 97386-8371
                </h3>
                <p className="text-xs text-green-100/90 font-geist leading-relaxed">
                  Envie o resumo do seu pedido instantaneamente no WhatsApp para receber chaves PIX ou link de pagamento.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a 
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-12 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold font-geist text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enviar Pedido via WhatsApp
                </a>
                <button
                  onClick={() => handleCopy('(11) 97386-8371', 'whatsapp')}
                  title="Copiar número"
                  className="h-12 w-12 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                >
                  {copiedWhatsapp ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Order Summary */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-sm space-y-6">
            <h2 className="text-lg font-bold font-geist text-black flex items-center gap-2 pb-4 border-b border-black/5">
              <ShoppingCart className="w-5 h-5 text-brand-blue" />
              Itens no seu pedido ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>

            {items.length === 0 ? (
              <p className="text-sm text-black/40 font-geist py-8 text-center">Nenhum item selecionado no carrinho.</p>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 py-3 border-b border-black/5 last:border-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-contain bg-gray-50 rounded-xl p-2 border border-black/5 shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-black font-geist truncate">{item.name}</h4>
                      <p className="text-xs text-black/50 font-geist">
                        Qtd: {item.quantity} {item.selectedAro ? `| Aro: ${item.selectedAro}` : ''}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-sm text-black font-geist">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-black/5 space-y-2 font-geist">
                  <div className="flex justify-between text-sm text-black/60">
                    <span>Subtotal dos produtos</span>
                    <span>{formatCurrency(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm text-black/60">
                    <span>Frete / Envio</span>
                    <span className="text-brand-blue font-bold">A definir no atendimento</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-black pt-2 border-t border-black/5">
                    <span>Total Estimado</span>
                    <span className="text-brand-blue">{formatCurrency(getSubtotal())}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Optional Info Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold font-geist text-black mb-1">
                Identificação do Cliente (Opcional)
              </h3>
              <p className="text-xs text-black/50 font-geist">
                Preencha seus dados se quiser incluí-los na mensagem de WhatsApp.
              </p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 font-geist block mb-1 ml-1">
                  Seu Nome
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nome completo" 
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-gray-50 focus:bg-white focus:border-brand-blue outline-none text-sm font-geist transition"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 font-geist block mb-1 ml-1">
                  Seu Telefone / WhatsApp
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000" 
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-gray-50 focus:bg-white focus:border-brand-blue outline-none text-sm font-geist transition"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 font-geist block mb-1 ml-1">
                    Cidade
                  </label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Sua cidade" 
                    className="w-full px-4 py-3 rounded-xl border border-black/10 bg-gray-50 focus:bg-white focus:border-brand-blue outline-none text-sm font-geist transition"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 font-geist block mb-1 ml-1">
                    UF
                  </label>
                  <input 
                    type="text" 
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="UF" 
                    maxLength={2}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 bg-gray-50 focus:bg-white focus:border-brand-blue outline-none text-sm font-geist transition uppercase"
                  />
                </div>
              </div>
            </form>

            <div className="p-4 rounded-2xl bg-gray-50 border border-black/5 space-y-2 text-xs font-geist text-black/70">
              <div className="flex items-center gap-2 font-bold text-black">
                <AlertCircle className="w-4 h-4 text-brand-blue" />
                <span>Horários de Atendimento</span>
              </div>
              <p>
                • Segunda a Sexta: 08:00 às 18:00<br />
                • Envio de quadros e bicicletas completas para todo o Brasil e exterior.<br />
                • 10 anos de garantia de fábrica no quadro de polímero reciclado.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
