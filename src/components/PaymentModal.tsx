import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Loader2, Copy, Check } from 'lucide-react';
import type { BookingDetails, PixResponse } from '../types';
import { generatePixPayment, checkPaymentStatus } from '../services/pix';
import toast from 'react-hot-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: BookingDetails;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  bookingDetails,
}) => {
  const [pixData, setPixData] = React.useState<PixResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [transactionId, setTransactionId] = React.useState<string | null>(null);
  const checkInterval = React.useRef<number>();

  const generatePix = async () => {
    setIsLoading(true);
    try {
      const data = await generatePixPayment(150);
      setPixData(data);
      setTransactionId(data.id);
      startPaymentCheck(data.id);
    } catch (error) {
      toast.error('Erro ao gerar o pagamento. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && !pixData) {
      generatePix();
    }

    return () => {
      if (checkInterval.current) {
        clearInterval(checkInterval.current);
      }
    };
  }, [isOpen]);

  const startPaymentCheck = (id: string) => {
    checkInterval.current = window.setInterval(async () => {
      try {
        const status = await checkPaymentStatus(id);
        if (status.status === 'paid' || status.status === 'approved') {
          clearInterval(checkInterval.current);
          handlePaymentSuccess();
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    }, 2000);
  };

  const handlePaymentSuccess = () => {
    toast.success('Pagamento confirmado! Redirecionando...');
    setTimeout(() => {
      onClose();
      // Here you would redirect to success page
    }, 1500);
  };

  const copyPixCode = () => {
    if (pixData?.qr_code) {
      navigator.clipboard.writeText(pixData.qr_code);
      setCopied(true);
      toast.success('Código PIX copiado!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const verifyPayment = async () => {
    if (!transactionId) return;
    
    setIsVerifying(true);
    try {
      const status = await checkPaymentStatus(transactionId);
      if (status.status === 'paid' || status.status === 'approved') {
        handlePaymentSuccess();
      } else {
        toast.error('Pagamento ainda não confirmado. Tente novamente em alguns instantes.');
      }
    } catch (error) {
      toast.error('Erro ao verificar pagamento. Tente novamente.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="text-xl font-semibold mb-4 text-gray-800">
                Confirme seu agendamento
              </Dialog.Title>

              {bookingDetails.date && bookingDetails.time && (
                <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                  <p className="text-sm text-gray-500">Data:</p>
                  <p className="font-medium text-gray-800">
                    {format(bookingDetails.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Horário:</p>
                  <p className="font-medium text-gray-800">{bookingDetails.time}</p>
                </div>
              )}

              <div className="text-center mb-6">
                <p className="text-gray-500">Para confirmar, conclua o pagamento:</p>
                <p className="text-3xl font-bold text-primary">R$ 150,00</p>
                <p className="text-sm text-gray-500 mt-1">
                  Após o pagamento você será direcionado para meu whatsapp pessoal
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : pixData ? (
                <>
                  <div className="space-y-4">
                    <button
                      onClick={copyPixCode}
                      className="w-full p-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-full font-medium transition-all flex items-center justify-center space-x-2 shadow-lg"
                    >
                      {copied ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>Código PIX Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5" />
                          <span>Copiar Código PIX</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={verifyPayment}
                      disabled={isVerifying}
                      className="w-full p-4 bg-gray-100 text-gray-800 rounded-full font-medium hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isVerifying ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Verificando pagamento...
                        </span>
                      ) : (
                        'Já realizei o pagamento'
                      )}
                    </button>
                  </div>
                </>
              ) : null}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
