import React, { useState } from 'react';
import Innovation from './Innovation';
import History from './History';
import Sustainability from './Sustainability';
import Acervo from './Acervo';
import LogoCloud from './LogoCloud';
import { Product } from '../types';

interface NossaHistoriaProps {
  onProductClick: (product: Product) => void;
  initialTab?: string;
}

const tabs = [
  { id: 'history', label: 'Histórias' },
  { id: 'innovation', label: 'Inovação' },
  { id: 'sustainability', label: 'Sustentabilidade' },
  { id: 'acervo', label: 'Acervo' },
  { id: 'media', label: 'Na Mídia' },
];

export default function NossaHistoria({ onProductClick, initialTab = 'history' }: NossaHistoriaProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="min-h-screen bg-white">
      {/* Tab Navigation */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar py-4 gap-8 justify-start md:justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-2 text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? 'text-brand-blue' : 'text-black/40 hover:text-black'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-12">
        {activeTab === 'innovation' && <Innovation />}
        {activeTab === 'history' && <History />}
        {activeTab === 'sustainability' && <Sustainability />}
        {activeTab === 'acervo' && <Acervo onProductClick={onProductClick} />}
        {activeTab === 'media' && <LogoCloud />}
      </div>
    </div>
  );
}
