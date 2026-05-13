import React, { useState } from 'react';
import FAQ from './FAQ';
import Contact from './Contact';

interface SupportProps {
  initialTab?: 'faq' | 'contact';
}

export default function Support({ initialTab = 'faq' }: SupportProps) {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>(initialTab);

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex py-4 gap-8 justify-center">
            <button
              onClick={() => setActiveTab('faq')}
              className={`relative py-2 text-sm font-bold uppercase tracking-widest transition-colors ${
                activeTab === 'faq' ? 'text-brand-blue' : 'text-black/40 hover:text-black'
              }`}
            >
              FAQ
              {activeTab === 'faq' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`relative py-2 text-sm font-bold uppercase tracking-widest transition-colors ${
                activeTab === 'contact' ? 'text-brand-blue' : 'text-black/40 hover:text-black'
              }`}
            >
              Contato
              {activeTab === 'contact' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="py-12">
        {activeTab === 'faq' ? <FAQ /> : <Contact />}
      </div>
    </div>
  );
}
