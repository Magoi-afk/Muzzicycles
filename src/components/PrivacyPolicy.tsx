import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-6 py-12 sm:py-20"
    >
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-black/60 hover:text-black transition mb-8 font-geist"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
        Voltar para o Início
      </button>

      <div className="bg-white border border-black/5 rounded-3xl p-8 sm:p-12 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-geist">Política de Privacidade</h1>
        </div>

        <div className="prose prose-neutral max-w-none space-y-6 text-black/70 font-geist">
          <section>
            <h2 className="text-xl font-semibold text-black mb-3">1. Introdução</h2>
            <p>
              A Muzzicycles valoriza a sua privacidade. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais ao utilizar nosso site e serviços.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">2. Coleta de Dados</h2>
            <p>
              Coletamos informações que você nos fornece diretamente, como nome, e-mail, endereço de entrega e informações de pagamento ao realizar uma compra ou se inscrever em nossa newsletter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">3. Uso das Informações</h2>
            <p>
              Suas informações são utilizadas para processar pedidos, fornecer suporte ao cliente, enviar atualizações sobre produtos (caso autorizado) e melhorar sua experiência em nosso site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">4. Cookies e Tecnologias de Rastreamento</h2>
            <p>
              Utilizamos cookies para entender como você interage com nosso site, lembrar suas preferências e analisar o tráfego. Você pode gerenciar as configurações de cookies em seu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">5. Segurança de Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração ou destruição.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">6. Seus Direitos</h2>
            <p>
              Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Entre em contato conosco para exercer esses direitos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">7. Contato</h2>
            <p>
              Se tiver dúvidas sobre esta política, entre em contato pelo e-mail: <span className="text-brand-blue">muzzicycles@muzzicycles.com.br</span>
            </p>
          </section>

          <div className="pt-8 border-t border-black/5 text-sm">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
