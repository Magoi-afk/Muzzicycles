import { motion } from 'motion/react';
import { ShoppingCart, Shield, Recycle, Truck, ChevronRight, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { CartItem } from '../types';
import React, { useState, useEffect } from 'react';
import MercadoPagoButton from './MercadoPagoButton';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

export default function Checkout({ items, onBack, onComplete }: CheckoutProps) {
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);

  // Scroll to top on mount and when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const calculateShipping = async (cep: string) => {
    if (cep.replace(/\D/g, '').length < 8) return;
    
    setIsCalculatingShipping(true);
    try {
      console.log('Calculating shipping for CEP:', cep);
      // Basic estimates for shipping calculation
      const totalWeight = Array.isArray(items) ? items.reduce((acc, item) => acc + (item.quantity * 16), 0) : 16;
      const totalValue = Array.isArray(items) ? items.reduce((acc, item) => acc + (item.quantity * item.price), 0) : 1000;

      const response = await fetch('/api/shipping/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destZipCode: cep,
          weight: totalWeight,
          value: totalValue,
          width: 80,
          height: 120,
          length: 20
        })
      });
      
      console.log('Shipping API status:', response.status);
      const data = await response.json();
      console.log('Shipping API response data:', data);

      if (response.ok && Array.isArray(data) && data.length > 0) {
        setShippingOptions(data);
        setShippingMethod(data[0].type);
      } else {
        console.warn('Backend returned error or empty list, falling back:', data);
        applyLocalFallback();
      }
    } catch (error) {
      console.error('Shipping connection error, falling back:', error);
      applyLocalFallback();
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  const applyLocalFallback = () => {
    const totalWeight = Array.isArray(items) ? items.reduce((acc, item) => acc + (item.quantity * 16), 0) : 16;
    const basePrice = 35.00;
    const estimatedPrice = basePrice + (totalWeight * 6.50);
    
    const fallbackOptions = [
      { 
        type: "express", 
        vlrFrete: estimatedPrice + 15, 
        prazo: "3 a 5 dias úteis", 
        simulated: true 
      },
      { 
        type: "standard", 
        vlrFrete: estimatedPrice, 
        prazo: "8 a 12 dias úteis", 
        simulated: true 
      }
    ];
    setShippingOptions(fallbackOptions);
    setShippingMethod(fallbackOptions[0].type);
  };

  const lookupAddress = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          address: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  useEffect(() => {
    const cep = formData.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      calculateShipping(cep);
      lookupAddress(cep);
    }
  }, [formData.cep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.name && formData.email && formData.cpf && formData.phone && formData.address && formData.city && formData.state && formData.cep.replace(/\D/g, '').length === 8;

  const getShippingPrice = () => {
    const option = shippingOptions.find(opt => opt.type === shippingMethod);
    return option ? Number(option.vlrFrete) : 0;
  };

  const getSubtotal = () => items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const getTotal = () => getSubtotal() + getShippingPrice();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-geist ${step >= 1 ? 'bg-brand-blue text-white' : 'bg-gray-100 text-black/30'}`}>1</div>
            <span className={`text-sm font-medium font-geist ${step >= 1 ? 'text-brand-blue' : 'text-black/30'}`}>Envio</span>
          </div>
          <div className="h-px w-12 bg-gray-100"></div>
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-geist ${step >= 2 ? 'bg-brand-blue text-white' : 'bg-gray-100 text-black/30'}`}>2</div>
            <span className={`text-sm font-medium font-geist ${step >= 2 ? 'text-brand-blue' : 'text-black/30'}`}>Pagamento</span>
          </div>
          <div className="h-px w-12 bg-gray-100"></div>
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-geist ${step >= 3 ? 'bg-brand-blue text-white' : 'bg-gray-100 text-black/30'}`}>3</div>
            <span className={`text-sm font-medium font-geist ${step >= 3 ? 'text-brand-blue' : 'text-black/30'}`}>Revisão</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Form Section */}
          <div className="lg:col-span-7">
            <div className="mb-12">
              <h2 className="text-3xl font-medium tracking-tighter font-geist mb-8">
                {step === 1 ? 'Informações de Envio' : 'Finalizar Pagamento'}
              </h2>
              
              {step === 1 ? (
                <>
                  <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Nome Completo</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome" 
                      className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">CPF / CNPJ</label>
                    <input 
                      type="text" 
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      placeholder="000.000.000-00" 
                      className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@exemplo.com" 
                      className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Telefone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(00) 00000-0000" 
                      className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">CEP</label>
                    <input 
                      type="text" 
                      name="cep"
                      value={formData.cep}
                      onChange={handleInputChange}
                      placeholder="00000-000" 
                      className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Endereço</label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Rua, Avenida..." 
                      className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Número</label>
                    <input 
                      type="text" 
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      placeholder="123" 
                      className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Bairro</label>
                    <input 
                      type="text" 
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      placeholder="Nome do bairro" 
                      className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Cidade</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Cidade" 
                      className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Estado</label>
                    <select 
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist appearance-none"
                    >
                      <option value="">Selecione</option>
                      <option value="SP">São Paulo</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="MG">Minas Gerais</option>
                    </select>
                  </div>
                </div>
              </form>

              <div>
                <h3 className="text-xl font-medium font-geist mb-6">Método de Entrega</h3>
                <div className="space-y-4">
                  {isCalculatingShipping ? (
                    <div className="p-12 flex flex-col items-center justify-center gap-4 bg-gray-50 rounded-2xl border border-dashed border-black/10">
                      <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
                      <p className="text-sm text-black/40 font-geist">Calculando frete com Jadlog...</p>
                    </div>
                  ) : shippingOptions.length > 0 ? (
                    shippingOptions.map((option) => (
                      <button 
                        key={option.type}
                        type="button"
                        onClick={() => setShippingMethod(option.type)}
                        className={`w-full p-6 rounded-2xl border transition-all flex items-center justify-between ${shippingMethod === option.type ? 'border-brand-blue bg-brand-blue/5' : 'border-black/5 bg-gray-50 hover:bg-gray-100'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${shippingMethod === option.type ? 'border-brand-blue' : 'border-black/20'}`}>
                            {shippingMethod === option.type && <div className="h-2.5 w-2.5 rounded-full bg-brand-blue"></div>}
                          </div>
                          <div className="text-left">
                            <span className="block font-medium font-geist">{option.type === 'express' ? 'Jadlog .Package' : 'Jadlog .Com'}</span>
                            <span className="text-xs text-black/40 font-geist">
                              Estimativa: {typeof option.prazo === 'number' ? `${option.prazo} ${option.prazo === 1 ? 'dia útil' : 'dias úteis'}` : option.prazo}
                              {option.simulated && <span className="ml-2 text-[10px] text-brand-blue font-bold">(Estimativa Segura)</span>}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-black font-geist">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(option.vlrFrete))}
                        </span>
                      </button>
                    ))
                  ) : formData.cep.replace(/\D/g, '').length === 8 ? (
                    <div className="p-8 text-center bg-red-50 rounded-2xl border border-red-100">
                      <p className="text-sm text-red-600 font-geist">Houve um erro ao calcular o frete com a Jadlog.</p>
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-gray-50 rounded-2xl border border-black/5">
                      <p className="text-sm text-black/40 font-geist">Informe seu CEP para ver as opções de entrega.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-brand-blue/5 border border-brand-blue/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold font-geist flex items-center gap-2">
                    <Check className="w-5 h-5 text-brand-blue" />
                    Informações de Entrega
                  </h3>
                  <button 
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-brand-blue uppercase tracking-widest hover:underline"
                  >
                    Editar
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-geist">
                  <div className="space-y-4">
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-black/40 font-bold mb-1">Destinatário</span>
                      <p className="text-black font-medium">{formData.name}</p>
                      <p className="text-black/60">{formData.email}</p>
                      <p className="text-black/60">{formData.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-black/40 font-bold mb-1">Endereço</span>
                      <p className="text-black font-medium">{formData.address}, {formData.number}</p>
                      <p className="text-black/60">{formData.neighborhood}</p>
                      <p className="text-black/60">{formData.city} - {formData.state}</p>
                      <p className="text-black/60">{formData.cep}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-12 rounded-3xl bg-gray-50 border border-black/5 flex flex-col items-center justify-center text-center gap-6">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <Shield className="w-8 h-8 text-brand-blue" />
                </div>
                <div>
                  <h4 className="text-xl font-medium font-geist mb-2">Processamento Seguro</h4>
                  <p className="text-sm text-black/40 font-geist max-w-sm">
                    Estamos preparando seu ambiente de pagamento seguro. Você será redirecionado para concluir a transação.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Section */}
      <div className="lg:col-span-5">
            <div className="sticky top-28 p-8 rounded-3xl bg-gray-50 border border-black/5">
              <h3 className="text-xl font-medium font-geist mb-8">Resumo do Pedido</h3>
              
              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex gap-4">
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-white border border-black/5 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-brand-blue text-white text-[10px] font-bold flex items-center justify-center border-2 border-gray-50">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium font-geist mb-1 truncate">Muzzicycle {item.name}</h4>
                      {item.selectedAro && (
                        <p className="text-[10px] text-black/40 font-geist uppercase tracking-widest mb-1">Aro: {item.selectedAro}</p>
                      )}
                      <p className="text-sm font-bold text-brand-blue font-geist">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm text-black/60 font-geist">
                  <span>Subtotal</span>
                  <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-sm text-black/60 font-geist">
                  <span>Frete</span>
                  <span>{shippingMethod && shippingOptions.length > 0 ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(getShippingPrice()) : 'Calculando...'}</span>
                </div>
                <div className="pt-4 border-t border-black/10 flex justify-between text-lg font-bold text-black font-geist">
                  <span>Total</span>
                  <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(getTotal())}</span>
                </div>
              </div>

              <div className="pt-8 border-t border-black/10 mb-8">
                {step === 1 ? (
                  <button 
                    type="button"
                    onClick={() => {
                      if (isFormValid) setStep(2);
                      else alert('Por favor, preencha todos os campos obrigatórios corretamente.');
                    }}
                    disabled={isCalculatingShipping || shippingOptions.length === 0}
                    className="w-full h-14 rounded-2xl bg-brand-blue text-white font-bold font-geist text-lg hover:bg-brand-blue-dark transition shadow-lg shadow-brand-blue/20 mb-8 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
                  >
                    Ir para Pagamento
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <div className="space-y-4">
                    <MercadoPagoButton 
                      items={[
                        ...items,
                        {
                          id: `shipping-${shippingMethod}`,
                          name: `Entrega via Jadlog (${shippingMethod === 'express' ? 'Express' : 'Econômico'})`,
                          price: getShippingPrice(),
                          quantity: 1,
                          image: 'https://cdn.jsdelivr.net/gh/Magoi-afk/Muzzicycles@main/amazonas.png'
                        }
                      ]}
                      payer={{ name: formData.name, email: formData.email }}
                    />
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full h-12 rounded-2xl border border-black/10 text-black/60 font-medium font-geist hover:bg-black/5 transition"
                    >
                      Voltar para Envio
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-[10px] text-black/40 font-geist">
                  <Check className="w-3 h-3 text-brand-blue" />
                  Pagamento Seguro
                </div>
                <div className="flex items-center gap-2 text-[10px] text-black/40 font-geist">
                  <Recycle className="w-3 h-3 text-brand-blue" />
                  100% Sustentável
                </div>
                <div className="flex items-center gap-2 text-[10px] text-black/40 font-geist">
                  <Truck className="w-3 h-3 text-brand-blue" />
                  Rastreio em Tempo Real
                </div>
                <div className="flex items-center gap-2 text-[10px] text-black/40 font-geist">
                  <Shield className="w-3 h-3 text-brand-blue" />
                  Garantia de 10 Anos
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
