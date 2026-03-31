import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
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
                <a href="mailto:contato@muzzicycles.com.br" className="text-lg font-medium font-geist hover:text-brand-blue transition-colors">contato@muzzicycles.com.br</a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-sm font-bold uppercase tracking-wider text-black/30 font-geist mb-1">WhatsApp</span>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-lg font-medium font-geist hover:text-brand-blue transition-colors">+55 (11) 99999-9999</a>
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
          <form className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-black/5 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium font-geist text-black/50 ml-1">Nome Completo</label>
                <input type="text" placeholder="Seu nome" className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium font-geist text-black/50 ml-1">E-mail</label>
                <input type="email" placeholder="seu@email.com" className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium font-geist text-black/50 ml-1">Assunto</label>
              <select className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist appearance-none bg-white">
                <option>Dúvida sobre Modelos</option>
                <option>Suporte Técnico</option>
                <option>Parcerias</option>
                <option>Outros</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium font-geist text-black/50 ml-1">Mensagem</label>
              <textarea rows={4} placeholder="Como podemos te ajudar?" className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all font-geist resize-none"></textarea>
            </div>
            
            <button type="submit" className="w-full py-4 bg-brand-blue text-white rounded-xl font-bold font-geist flex items-center justify-center gap-2 hover:bg-brand-blue/90 transition-all group">
              Enviar Mensagem
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
