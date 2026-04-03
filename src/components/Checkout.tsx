import { motion } from 'motion/react';
import { ShoppingCart, Shield, Recycle, Truck, ChevronRight, ArrowLeft, Check } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';

interface CheckoutProps {
  product: Product;
  onBack: () => void;
  onComplete: () => void;
}

export default function Checkout({ product, onBack, onComplete }: CheckoutProps) {
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('standard');

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
              <h2 className="text-3xl font-medium tracking-tighter font-geist mb-8">Informações de Envio</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Nome Completo</label>
                    <input type="text" placeholder="Seu nome" className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">CPF / CNPJ</label>
                    <input type="text" placeholder="000.000.000-00" className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Email</label>
                    <input type="email" placeholder="email@exemplo.com" className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Telefone</label>
                    <input type="tel" placeholder="(00) 00000-0000" className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">CEP</label>
                    <input type="text" placeholder="00000-000" className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Endereço</label>
                    <input type="text" placeholder="Rua, Avenida..." className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Número</label>
                    <input type="text" placeholder="123" className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Bairro</label>
                    <input type="text" placeholder="Nome do bairro" className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Cidade</label>
                    <input type="text" placeholder="Cidade" className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">Estado</label>
                    <select className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist appearance-none">
                      <option value="">Selecione</option>
                      <option value="SP">São Paulo</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="MG">Minas Gerais</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            <div>
              <h3 className="text-xl font-medium font-geist mb-6">Método de Entrega</h3>
              <div className="space-y-4">
                <button 
                  onClick={() => setShippingMethod('standard')}
                  className={`w-full p-6 rounded-2xl border transition-all flex items-center justify-between ${shippingMethod === 'standard' ? 'border-brand-blue bg-brand-blue/5' : 'border-black/5 bg-gray-50 hover:bg-gray-100'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${shippingMethod === 'standard' ? 'border-brand-blue' : 'border-black/20'}`}>
                      {shippingMethod === 'standard' && <div className="h-2.5 w-2.5 rounded-full bg-brand-blue"></div>}
                    </div>
                    <div className="text-left">
                      <span className="block font-medium font-geist">Entrega Padrão</span>
                      <span className="text-xs text-black/40 font-geist">5-10 dias úteis</span>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => setShippingMethod('express')}
                  className={`w-full p-6 rounded-2xl border transition-all flex items-center justify-between ${shippingMethod === 'express' ? 'border-brand-blue bg-brand-blue/5' : 'border-black/5 bg-gray-50 hover:bg-gray-100'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${shippingMethod === 'express' ? 'border-brand-blue' : 'border-black/20'}`}>
                      {shippingMethod === 'express' && <div className="h-2.5 w-2.5 rounded-full bg-brand-blue"></div>}
                    </div>
                    <div className="text-left">
                      <span className="block font-medium font-geist">Entrega Expressa</span>
                      <span className="text-xs text-black/40 font-geist">2-3 dias úteis</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 p-8 rounded-3xl bg-gray-50 border border-black/5">
              <h3 className="text-xl font-medium font-geist mb-8">Resumo do Pedido</h3>
              
              <div className="flex gap-4 mb-8">
                <div className="relative h-24 w-24 rounded-2xl overflow-hidden bg-white border border-black/5 flex-shrink-0">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-brand-blue text-white text-[10px] font-bold flex items-center justify-center border-2 border-gray-50">1</span>
                </div>
                <div>
                  <h4 className="font-medium font-geist mb-1">Muzzicycle Polymer {product.name}</h4>
                  <p className="text-xs text-black/40 font-geist uppercase tracking-widest mb-2">Azul Industrial / Grande</p>
                </div>
              </div>

              <div className="pt-8 border-t border-black/10 mb-8">
                <button 
                  onClick={onComplete}
                  className="w-full h-14 rounded-2xl bg-brand-blue text-white font-bold font-geist text-lg hover:bg-brand-blue-dark transition shadow-lg shadow-brand-blue/20 mb-8"
                >
                  Continuar para Pagamento
                </button>
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
