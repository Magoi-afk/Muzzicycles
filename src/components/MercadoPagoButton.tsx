import React, { useState, useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Loader2 } from 'lucide-react';

// Initialize MP with Public Key
const getPublicKey = () => {
  return import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY || '';
};

// We'll initialize inside the component or effect to handle dynamic updates better if needed
// but for now, top level is standard for the SDK
const initialKey = getPublicKey();
if (initialKey) {
  initMercadoPago(initialKey, { locale: 'pt-BR' });
}

interface MercadoPagoButtonProps {
  items: any[];
  payer: {
    name: string;
    email: string;
  };
}

export default function MercadoPagoButton({ items, payer }: MercadoPagoButtonProps) {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState(getPublicKey());

  useEffect(() => {
    // Check for key periodically or on focus if it was missing
    const key = getPublicKey();
    if (key !== publicKey) {
      setPublicKey(key);
      if (key) initMercadoPago(key, { locale: 'pt-BR' });
    }
  }, [publicKey]);

  const handleCreatePreference = async () => {
    const currentKey = getPublicKey();
    if (!currentKey) {
      setError('Configuração pendente');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items, payer }),
      });

      const data = await response.json();

      if (data.id) {
        setPreferenceId(data.id);
        // Note: Wallet component is preferred over direct redirect for better experience
        // but let's keep it robust
      } else {
        throw new Error(data.error || 'Erro ao criar preferência de pagamento.');
      }
    } catch (err: any) {
      console.error('Erro MP:', err);
      setError(err.message || 'Não foi possível iniciar o pagamento. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulatedPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      alert('Pagamento SIMULADO realizado com sucesso! (Apenas para teste)');
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    if (items && items.length > 0 && !preferenceId && !isLoading && !error && publicKey) {
      handleCreatePreference();
    }
  }, [items]);

  if (error && !publicKey) {
    return (
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 text-sm font-medium">
          <p className="mb-2">Configuração do Mercado Pago pendente.</p>
          <p className="text-xs font-normal opacity-80">Para ativar pagamentos reais, adicione as chaves em Settings &gt; Secrets.</p>
        </div>
        <button
          onClick={handleSimulatedPayment}
          disabled={isLoading}
          className="w-full h-14 rounded-2xl bg-brand-blue text-white font-bold font-geist text-lg hover:bg-brand-blue-dark transition shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Teste com Pagamento Simulado'}
        </button>
      </div>
    );
  }

  if (preferenceId) {
    return (
      <div className="w-full">
        <Wallet 
          initialization={{ preferenceId }} 
        />
      </div>
    );
  }

  return (
    <button
      onClick={handleCreatePreference}
      disabled={isLoading}
      className="w-full h-14 rounded-2xl bg-brand-blue text-white font-bold font-geist text-lg hover:bg-brand-blue-dark transition shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Processando...
        </>
      ) : (
        'Finalizar com Mercado Pago'
      )}
    </button>
  );
}
