import { motion } from 'motion/react';
import { ShoppingCart, Shield, Recycle, Truck, ChevronRight, ArrowLeft, Check, Loader2, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CartItem } from '../types';
import React, { useState, useEffect } from 'react';
import MercadoPagoButton from './MercadoPagoButton';
import { PHYSICAL_PHONE, WHATSAPP_NUMBER } from '../constants';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

export default function Checkout({ items, onBack, onComplete }: CheckoutProps) {
  const { t, i18n } = useTranslation();
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

  const [debouncedCep, setDebouncedCep] = useState('');

  // Debounce CEP input
  useEffect(() => {
    const timer = setTimeout(() => {
      const cleanCep = formData.cep.replace(/\D/g, '');
      if (cleanCep.length === 8) {
        setDebouncedCep(cleanCep);
      } else {
        setDebouncedCep('');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.cep]);

  const calculateShipping = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setShippingOptions([]);
      return;
    }
    
    setIsCalculatingShipping(true);
    try {
      console.log('Calculating shipping for CEP:', cleanCep);
      // Basic estimates for shipping calculation
      const totalWeight = Array.isArray(items) ? items.reduce((acc, item) => acc + (item.quantity * 16), 0) : 16;
      const totalValue = Array.isArray(items) ? items.reduce((acc, item) => acc + (item.quantity * item.price), 0) : 1000;

      const response = await fetch('/api/shipping/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destZipCode: cleanCep,
          weight: totalWeight,
          value: totalValue,
          width: 20,
          height: 80,
          length: 120
        })
      });
      
      const data = await response.json();

      if (response.ok && Array.isArray(data) && data.length > 0) {
        setShippingOptions(data);
        setShippingMethod(data[0].type);
      } else {
        console.warn('Backend returned error or empty list:', data);
        setShippingOptions([]);
      }
    } catch (error) {
      console.error('Shipping connection error:', error);
      setShippingOptions([]);
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  const lookupAddress = async (cep: string) => {
    if (cep.length !== 8) return;
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

  // Memoized cart signature to avoid unnecessary recalculations while capturing all changes
  const cartSignature = JSON.stringify(items.map(i => ({ id: i.id, q: i.quantity })));

  useEffect(() => {
    if (debouncedCep.length === 8) {
      calculateShipping(debouncedCep);
      lookupAddress(debouncedCep);
    }
  }, [debouncedCep, cartSignature]);

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
            <span className={`text-sm font-medium font-geist ${step >= 1 ? 'text-brand-blue' : 'text-black/30'}`}>{t('checkout.steps.shipping')}</span>
          </div>
          <div className="h-px w-12 bg-gray-100"></div>
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-geist ${step >= 2 ? 'bg-brand-blue text-white' : 'bg-gray-100 text-black/30'}`}>2</div>
            <span className={`text-sm font-medium font-geist ${step >= 2 ? 'text-brand-blue' : 'text-black/30'}`}>{t('checkout.steps.payment')}</span>
          </div>
          <div className="h-px w-12 bg-gray-100"></div>
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold font-geist ${step >= 3 ? 'bg-brand-blue text-white' : 'bg-gray-100 text-black/30'}`}>3</div>
            <span className={`text-sm font-medium font-geist ${step >= 3 ? 'text-brand-blue' : 'text-black/30'}`}>{t('checkout.steps.review')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Form Section */}
          <div className="lg:col-span-7">
            <div className="mb-12">
              <h2 className="text-3xl font-medium tracking-tighter font-geist mb-8">
                {step === 1 ? t('checkout.titles.shipping') : t('checkout.titles.payment')}
              </h2>
              
              {step === 1 ? (
                <>
                  <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">{t('checkout.form.name')}</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('checkout.form.name_placeholder')}
                      className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">{t('checkout.form.cpf')}</label>
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
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">{t('checkout.form.email')}</label>
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
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">{t('checkout.form.phone')}</label>
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
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">{t('checkout.form.cep')}</label>
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
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">{t('checkout.form.address')}</label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder={t('checkout.form.address_placeholder')}
                      className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">{t('checkout.form.number')}</label>
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
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">{t('checkout.form.neighborhood')}</label>
                    <input 
                      type="text" 
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      placeholder={t('checkout.form.neighborhood')}
                      className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">{t('checkout.form.city')}</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder={t('checkout.form.city')}
                      className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/40 font-geist ml-1">{t('checkout.form.state')}</label>
                    <select 
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 rounded-xl border border-black/5 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist appearance-none"
                    >
                      <option value="">{t('checkout.form.select')}</option>
                      <option value="SP">São Paulo</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="MG">Minas Gerais</option>
                    </select>
                  </div>
                </div>
              </form>

              <div>
                <h3 className="text-xl font-medium font-geist mb-6">{t('checkout.titles.delivery_method')}</h3>
                <div className="space-y-4">
                  {isCalculatingShipping ? (
                    <div className="p-12 flex flex-col items-center justify-center gap-4 bg-gray-50 rounded-2xl border border-dashed border-black/10">
                      <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
                      <p className="text-sm text-black/40 font-geist">{t('checkout.shipping.calculating')}</p>
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
                            {t('checkout.shipping.estimate')}: {typeof option.prazo === 'number' ? `${option.prazo} ${option.prazo === 1 ? t('checkout.shipping.business_day') : t('checkout.shipping.business_days')}` : option.prazo}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-black font-geist">
                          {new Intl.NumberFormat(i18n.language, { style: 'currency', currency: i18n.language.startsWith('pt') ? 'BRL' : i18n.language.startsWith('es') ? 'EUR' : 'USD' }).format(Number(option.vlrFrete))}
                        </span>
                      </button>
                    ))
                  ) : formData.cep.replace(/\D/g, '').length === 8 ? (
                    <div className="p-8 text-center bg-red-50 rounded-2xl border border-red-100">
                      <p className="text-sm text-red-600 font-geist">{t('checkout.shipping.error')}</p>
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-gray-50 rounded-2xl border border-black/5">
                      <p className="text-sm text-black/40 font-geist">{t('checkout.shipping.prompt')}</p>
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
                    {t('checkout.titles.delivery_info')}
                  </h3>
                  <button 
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-brand-blue uppercase tracking-widest hover:underline"
                  >
                    {t('checkout.edit')}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-geist">
                  <div className="space-y-4">
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-black/40 font-bold mb-1">{t('checkout.destinatario')}</span>
                      <p className="text-black font-medium">{formData.name}</p>
                      <p className="text-black/60">{formData.email}</p>
                      <p className="text-black/60">{formData.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-black/40 font-bold mb-1">{t('checkout.form.address')}</span>
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
                  <h4 className="text-xl font-medium font-geist mb-2">{t('checkout.titles.secure_processing')}</h4>
                  <p className="text-sm text-black/40 font-geist max-w-sm">
                    {t('checkout.secure.desc')}
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
              <h3 className="text-xl font-medium font-geist mb-8">{t('checkout.titles.summary')}</h3>
              
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
                        <p className="text-[10px] text-black/40 font-geist uppercase tracking-widest mb-1">{t('cart.wheel_size')}: {item.selectedAro}</p>
                      )}
                      <p className="text-sm font-bold text-brand-blue font-geist">
                        {new Intl.NumberFormat(i18n.language, { style: 'currency', currency: i18n.language.startsWith('pt') ? 'BRL' : i18n.language.startsWith('es') ? 'EUR' : 'USD' }).format(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm text-black/60 font-geist">
                  <span>{t('checkout.summary.subtotal')}</span>
                  <span>{new Intl.NumberFormat(i18n.language === 'pt' ? 'pt-BR' : i18n.language === 'en' ? 'en-US' : 'es-ES', { style: 'currency', currency: 'BRL' }).format(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-sm text-black/60 font-geist">
                  <span>{t('checkout.summary.shipping')}</span>
                  <span>{shippingMethod && shippingOptions.length > 0 ? new Intl.NumberFormat(i18n.language === 'pt' ? 'pt-BR' : i18n.language === 'en' ? 'en-US' : 'es-ES', { style: 'currency', currency: 'BRL' }).format(getShippingPrice()) : t('checkout.shipping.calculating_cost')}</span>
                </div>
                <div className="pt-4 border-t border-black/10 flex justify-between text-lg font-bold text-black font-geist">
                  <span>{t('checkout.summary.total')}</span>
                  <span>{new Intl.NumberFormat(i18n.language === 'pt' ? 'pt-BR' : i18n.language === 'en' ? 'en-US' : 'es-ES', { style: 'currency', currency: 'BRL' }).format(getTotal())}</span>
                </div>
              </div>

              <div className="pt-8 border-t border-black/10 mb-8">
                {step === 1 ? (
                  <button 
                    type="button"
                    onClick={() => {
                      if (isFormValid) setStep(2);
                      else alert(t('checkout.form.errors.required'));
                    }}
                    disabled={isCalculatingShipping || shippingOptions.length === 0}
                    className="w-full h-14 rounded-2xl bg-brand-blue text-white font-bold font-geist text-lg hover:bg-brand-blue-dark transition shadow-lg shadow-brand-blue/20 mb-8 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
                  >
                    {t('checkout.summary.to_payment')}
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
                          image: '/images/amazonas.png'
                        }
                      ]}
                      payer={{ name: formData.name, email: formData.email }}
                    />
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full h-12 rounded-2xl border border-black/10 text-black/60 font-medium font-geist hover:bg-black/5 transition"
                    >
                      {t('checkout.summary.back_to_shipping')}
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-[10px] text-black/40 font-geist">
                  <Check className="w-3 h-3 text-brand-blue" />
                  {t('checkout.secure.payment')}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-black/40 font-geist">
                  <Recycle className="w-3 h-3 text-brand-blue" />
                  {t('checkout.secure.sustainable')}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-black/40 font-geist">
                  <Truck className="w-3 h-3 text-brand-blue" />
                  {t('checkout.secure.tracking')}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-black/40 font-geist">
                  <Shield className="w-3 h-3 text-brand-blue" />
                  {t('checkout.secure.warranty')}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-black/10">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-blue/5 flex items-center justify-center shrink-0">
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
          </div>
        </div>
      </div>
    </div>
  );
}
