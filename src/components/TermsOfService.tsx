import { ArrowLeft, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
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
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-geist">Termos de Serviço</h1>
        </div>

        <div className="prose prose-neutral max-w-none space-y-6 text-black/70 font-geist">
          <section>
            <h2 className="text-xl font-semibold text-black mb-3">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar este site, você concorda em cumprir e estar vinculado a estes Termos de Serviço. Se você não concordar com qualquer parte destes termos, não deve acessar o site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">2. Uso do Site</h2>
            <p>
              Este site destina-se ao uso pessoal e não comercial. Você concorda em não usar o site para qualquer finalidade ilegal ou proibida por estes termos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">3. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo deste site, incluindo textos, gráficos, logotipos e imagens, é propriedade da Muzzicycles ou de seus fornecedores de conteúdo e está protegido por leis de direitos autorais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">4. Produtos e Preços</h2>
            <p>
              Esforçamo-nos para exibir as cores e imagens de nossos produtos com a maior precisão possível. Os preços dos produtos estão sujeitos a alterações sem aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">5. Garantia Vitalícia do Quadro</h2>
            <p>
              A Muzzicycles oferece uma garantia vitalícia limitada para o quadro de suas bicicletas contra defeitos de fabricação, válida para o primeiro proprietário. Esta garantia não cobre danos causados por uso indevido, acidentes ou desgaste natural.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">6. Limitação de Responsabilidade</h2>
            <p>
              A Muzzicycles não será responsável por quaisquer danos diretos, indiretos, incidentais ou consequentes decorrentes do uso ou da incapacidade de usar este site ou seus produtos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">7. Lei Aplicável</h2>
            <p>
              Estes termos são regidos e interpretados de acordo com as leis da República Federativa do Brasil.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mb-3">8. Contato</h2>
            <p>
              Perguntas sobre os Termos de Serviço devem ser enviadas para: <span className="text-brand-blue">muzzicycles@muzzicycles.com.br</span>
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
