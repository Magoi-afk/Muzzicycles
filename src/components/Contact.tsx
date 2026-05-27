import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PHYSICAL_PHONE, WHATSAPP_NUMBER } from '../constants';
import { db, collection, doc, setDoc, serverTimestamp } from '../firebase';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: t('contact.subjects.models'),
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Frontend Field Validation
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      setStatus('error');
      setErrorMessage('Por favor, informe seu Nome Completo.');
      return;
    }
    if (trimmedName.length < 3) {
      setStatus('error');
      setErrorMessage('O nome precisa ter pelo menos 3 caracteres.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      setStatus('error');
      setErrorMessage('O endereço de e-mail é obrigatório.');
      return;
    }
    if (!emailRegex.test(trimmedEmail)) {
      setStatus('error');
      setErrorMessage('Por favor, insira um endereço de e-mail válido.');
      return;
    }

    if (!trimmedMessage) {
      setStatus('error');
      setErrorMessage('A sua mensagem não pode ser vazia.');
      return;
    }

    try {
      let apiSuccess = false;
      let apiValidationError = '';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            subject: formData.subject,
            message: trimmedMessage
          }),
        });

        const contentType = response.headers.get('content-type');
        let data: any = {};
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        }

        if (response.ok) {
          if (data && data.success) {
            apiSuccess = true;
          }
        } else {
          // Extract the exact error message and details to show on-screen
          const errorMsg = data.error || 'Erro no servidor de e-mail';
          const errorDetails = data.details ? ` (${data.details})` : '';
          apiValidationError = `${errorMsg}${errorDetails}`;
        }
      } catch (apiErr) {
        console.warn('API submission failed with network error, falling back to database writer:', apiErr);
      }

      // If API submission didn't succeed (e.g., server down, network issues, etc.)
      let dbFallbackSuccess = false;
      if (!apiSuccess) {
        console.log('Writing message directly to Firestore database for user:', trimmedEmail);
        try {
          const contactsCol = collection(db, 'contacts');
          const docRef = doc(contactsCol);
          await setDoc(docRef, {
            name: trimmedName,
            email: trimmedEmail,
            subject: formData.subject,
            message: trimmedMessage,
            createdAt: serverTimestamp()
          });
          dbFallbackSuccess = true;
        } catch (dbErr) {
          console.error('Firestore fallback database write failed:', dbErr);
        }
      }

      // We consider the submission successful if either the API succeeded or the database fallback succeeded!
      if (apiSuccess || dbFallbackSuccess) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: formData.subject, message: '' });
      } else {
        // Both failed. Throw appropriate error message.
        if (apiValidationError) {
          throw new Error(apiValidationError);
        } else {
          throw new Error('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
        }
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-5 bg-gray-50 rounded-[3rem] mt-5 mb-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <h2 className="text-4xl font-medium tracking-tighter font-geist mb-8">{t('contact.title')}</h2>
          <p className="text-lg text-black/70 font-geist leading-relaxed mb-12">
            {t('contact.subtitle')}
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-sm font-bold uppercase tracking-wider text-black/30 font-geist mb-1">{t('contact.labels.email')}</span>
                <a href="mailto:muzzicycles@muzzicycles.com.br" className="text-lg font-medium font-geist hover:text-brand-blue transition-colors">muzzicycles@muzzicycles.com.br</a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-sm font-bold uppercase tracking-wider text-black/30 font-geist mb-1">{t('contact.labels.phone')}</span>
                <span className="text-lg font-medium font-geist">{PHYSICAL_PHONE}</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-sm font-bold uppercase tracking-wider text-black/30 font-geist mb-1">{t('contact.labels.whatsapp')}</span>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-lg font-medium font-geist hover:text-brand-blue transition-colors">(11) 97386-8371</a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-sm font-bold uppercase tracking-wider text-black/30 font-geist mb-1">{t('contact.labels.factory')}</span>
                <p className="text-lg font-medium font-geist">{t('contact.factory_address')}</p>
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
              <h3 className="text-2xl font-medium font-geist mb-2">{t('contact.success.title')}</h3>
              <p className="text-black/60 font-geist mb-8">
                {t('contact.success.desc')}
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="px-8 py-3 bg-brand-blue text-white rounded-xl font-bold font-geist hover:bg-brand-blue/90 transition-all"
              >
                {t('contact.success.button')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-black/5 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium font-geist text-black/50 ml-1">{t('contact.labels.name')}</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.placeholders.name')} 
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium font-geist text-black/50 ml-1">{t('contact.labels.email')}</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.placeholders.email')} 
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium font-geist text-black/50 ml-1">{t('contact.labels.subject')}</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist appearance-none bg-white"
                >
                  <option value={t('contact.subjects.models')}>{t('contact.subjects.models')}</option>
                  <option value={t('contact.subjects.support')}>{t('contact.subjects.support')}</option>
                  <option value={t('contact.subjects.partners')}>{t('contact.subjects.partners')}</option>
                  <option value={t('contact.subjects.others')}>{t('contact.subjects.others')}</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium font-geist text-black/50 ml-1">{t('contact.labels.message')}</label>
                <textarea 
                  name="message"
                  required
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.placeholders.message')} 
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
                    {t('contact.button.sending')}
                  </>
                ) : (
                  <>
                    {t('contact.button.send')}
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
