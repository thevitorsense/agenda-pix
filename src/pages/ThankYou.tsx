import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CheckCircle } from 'lucide-react';

export const ThankYou = () => {
  const bookingDate = localStorage.getItem('bookingDate');
  const bookingTime = localStorage.getItem('bookingTime');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/95 via-secondary/95 to-primary/95 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-accent" />
        </div>
        
        <h1 className="font-display text-3xl font-bold text-white mb-4">
          Agendamento Confirmado!
        </h1>
        
        <p className="text-gray-200 mb-8">
          Seu horário foi reservado com sucesso. Aguardamos você para uma experiência única.
        </p>
        
        {bookingDate && bookingTime && (
          <div className="bg-white/10 rounded-lg p-4 mb-8">
            <p className="text-gray-200">
              <strong>Data:</strong> {bookingDate}
            </p>
            <p className="text-gray-200">
              <strong>Horário:</strong> {bookingTime}
            </p>
          </div>
        )}
        
        <p className="text-gray-300 mb-8">
          O endereço exato será enviado por Telegram algumas horas antes da sua sessão.
        </p>
        
        <a
          href="/"
          className="inline-block bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
        >
          Voltar ao Início
        </a>
      </div>
    </div>
  );
};
