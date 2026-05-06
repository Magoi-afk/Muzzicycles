import React, { useState, useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Loader2 } from 'lucide-react';

// Initialize MP with Public Key
const getPublicKey = () => {
  return (import.meta as any).env.VITE_MERCADO_PAGO_PUBLIC_KEY || '';
};

const publicKey = getPublicKey();
if (publicKey) {
  initMercadoPago(publicKey, { locale: 'pt-BR' });
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

  const handleCreatePreference = async () => {
    const currentKey = getPublicKey();
    if (!currentKey) {
      setError(
        'Configuração do Mercado Pago pendente. Para ativar os pagamentos:\n' +
        '1. Vá em Settings > Secrets no topo do editor.\n' +
        '2. Adicione VITE_MERCADO_PAGO_PUBLIC_KEY com sua Chave Pública.\n' +
        '3. Adicione MERCADO_PAGO_ACCESS_TOKEN com seu Token de Acesso.\n' +
        '4. Reinicie o servidor ou recarregue a página.'
      );
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
        if (data.init_point) {
          // Automatic redirection to Mercado Pago
          window.location.href = data.init_point;
        }
      } else {
        throw new Error(data.error || 'Erro ao criar preferência de pagamento.');
      }
    } catch (err) {
      console.error('Erro MP:', err);
      setError('Não foi possível iniciar o pagamento. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (items && items.length > 0 && !preferenceId && !isLoading && !error) {
      handleCreatePreference();
    }
  }, [items]);

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
        {error}
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
