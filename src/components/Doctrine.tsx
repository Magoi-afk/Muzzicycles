import { motion } from 'motion/react';
import { Shield, Recycle, Zap } from 'lucide-react';

export default function Doctrine() {
  return (
    <section id="doctrine" className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="md:col-span-4">
          <h2 className="text-3xl font-medium text-black tracking-tighter font-geist">Nossa Doutrina</h2>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Recycle className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium font-geist">100% Reciclado</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium font-geist">Garantia Vitalícia</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium font-geist">Zero Emissão</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl leading-tight text-black tracking-tighter font-geist"
          >
            Uma Muzzicycles não é apenas uma bicicleta. É um manifesto. Projetada para durar mais que você, nossa estrutura desafia a obsolescência programada e transforma o descarte em liberdade.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
