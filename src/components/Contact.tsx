import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Dúvida sobre Modelos',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: 'Dúvida sobre Modelos', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Erro inesperado');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 sm:px-8 py-20 bg-gray-50 rounded-[3rem] my-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <h2 className="text-4xl font-medium tracking-tighter font-geist mb-8">Fale Conosco</h2>
          <p className="text-lg text-black/70 font-geist leading-relaxed mb-12">
            Tem alguma dúvida sobre nossos modelos ou quer saber mais sobre nossa tecnologia? Nossa equipe está pronta para te atender.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-sm font-bold uppercase tracking-wider text-black/30 font-geist mb-1">E-mail</span>
                <a href="mailto:muzzicycles@muzzicycles.com.br" className="text-lg font-medium font-geist hover:text-brand-blue transition-colors">muzzicycles@muzzicycles.com.br</a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <span className="block text-sm font-bold uppercase tracking-wider text-black/30 font-geist mb-1">WhatsApp Fábrica</span>
                <div className="flex flex-col gap-2">
                  <a href="https://wa.me/551139666533" target="_blank" rel="noopener noreferrer" className="text-lg font-medium font-geist hover:text-brand-blue transition-colors">(11) 3966-6533</a>
                  <a href="https://wa.me/5511973868371" target="_blank" rel="noopener noreferrer" className="text-lg font-medium font-geist hover:text-brand-blue transition-colors">(11) 97386-8371</a>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-sm font-bold uppercase tracking-wider text-black/30 font-geist mb-1">Fábrica</span>
                <p className="text-lg font-medium font-geist">São Paulo, SP — Brasil</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-7">
          {status === 'success' ? (
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-black/5 flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-medium font-geist mb-2">Mensagem Enviada!</h3>
              <p className="text-black/60 font-geist mb-8">
                Obrigado pelo contato. Recebemos sua mensagem e responderemos em breve no seu e-mail.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="px-8 py-3 bg-brand-blue text-white rounded-xl font-bold font-geist hover:bg-brand-blue/90 transition-all"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-black/5 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium font-geist text-black/50 ml-1">Nome Completo</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome" 
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium font-geist text-black/50 ml-1">E-mail</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com" 
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium font-geist text-black/50 ml-1">Assunto</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist appearance-none bg-white"
                >
                  <option>Dúvida sobre Modelos</option>
                  <option>Suporte Técnico</option>
                  <option>Parcerias</option>
                  <option>Outros</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium font-geist text-black/50 ml-1">Mensagem</label>
                <textarea 
                  name="message"
                  required
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Como podemos te ajudar?" 
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist resize-none"
                ></textarea>
              </div>
              
              {status === 'error' && (
                <p className="text-sm text-red-500 font-geist ml-1">{errorMessage}</p>
              )}

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full py-4 bg-brand-blue text-white rounded-xl font-bold font-geist flex items-center justify-center gap-2 hover:bg-brand-blue/90 transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Mensagem
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
