import React from 'react';
import { Calendar } from './components/Calendar';
import { TimeSlots } from './components/TimeSlots';
import { PaymentModal } from './components/PaymentModal';
import { MapPin, Send, Circle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import type { BookingDetails } from './types';

function App() {
  const [showScheduling, setShowScheduling] = React.useState(false);
  const [bookingDetails, setBookingDetails] = React.useState<BookingDetails>({
    date: null,
    time: null,
  });
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('home');
  const [isVerified, setIsVerified] = React.useState(false);
  const [userName, setUserName] = React.useState('');

  const handleDateSelect = (date: Date) => {
    setBookingDetails(prev => ({ ...prev, date, time: null }));
  };

  const handleTimeSelect = (time: string) => {
    setBookingDetails(prev => ({ ...prev, time }));
  };

  const handleScheduleClick = () => {
    if (bookingDetails.date && bookingDetails.time) {
      setShowPaymentModal(true);
      // Track scheduling event
      if (window.fbq) {
        window.fbq('track', 'Schedule');
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsVerified(true);
    }
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Verificação de Idade</h2>
          <form onSubmit={handleVerification} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Como podemos te chamar?
              </label>
              <input
                type="text"
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Seu nome"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Confirmação de idade
              </label>
              <div className="bg-gray-50 p-4 rounded-xl text-gray-600 text-sm">
                <p>Este site contém conteúdo sensível destinado apenas para maiores de 18 anos.</p>
                <p className="mt-2">Ao continuar, você confirma que tem 18 anos ou mais.</p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              Confirmar e Continuar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary">
      <nav className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-lg z-50">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => scrollToSection('home')}
              className={`text-white font-medium ${activeSection === 'home' ? 'opacity-100' : 'opacity-70'} hover:opacity-100 transition-opacity`}
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('schedule')}
              className={`text-white font-medium ${activeSection === 'schedule' ? 'opacity-100' : 'opacity-70'} hover:opacity-100 transition-opacity`}
            >
              Agendar
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 pt-24 pb-12">
        <section id="home" className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Massagem Tântrica
          </h2>
          <div className="relative w-32 h-32 mx-auto mb-6">
            <img
              src="https://images.unsplash.com/photo-1611042553365-9b101441c135?w=400&h=400&fit=crop"
              alt="Perfil"
              className="w-full h-full rounded-full object-cover shadow-xl border-4 border-white"
            />
            <div className="absolute bottom-2 right-2 flex items-center bg-white rounded-full px-2 py-1 shadow-lg">
              <Circle className="w-3 h-3 fill-green-500 text-green-500 mr-1" />
              <span className="text-xs font-medium text-gray-700">Online</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Amanda Silva
          </h1>
          <div className="flex items-center justify-center text-white/90 mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Florianópolis</span>
          </div>
          <p className="text-white/90 max-w-md mx-auto mb-8">
            Olá {userName}, experimente a verdadeira conexão entre corpo e mente através da massagem tântrica.
            Uma experiência transformadora que liberta tensões e desperta sensações.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => {
                scrollToSection('schedule');
                setShowScheduling(true);
              }}
              className="w-full py-3 px-6 bg-white text-primary hover:bg-white/90 rounded-full font-semibold transition-colors shadow-lg"
            >
              Agendar massagem
            </button>
            <a
              href="https://t.me/amandasilva"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (window.fbq) {
                  window.fbq('track', 'Contact');
                }
              }}
              className="flex items-center justify-center w-full py-3 px-6 bg-white/20 text-white rounded-full font-semibold hover:bg-white/30 transition-colors"
            >
              <Send className="w-4 h-4 mr-2" />
              Vídeos exclusivos
            </a>
          </div>
        </section>

        <section id="schedule" className="mt-20">
          {showScheduling && (
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <Calendar
                selectedDate={bookingDetails.date}
                onDateSelect={handleDateSelect}
              />
              
              {bookingDetails.date && (
                <TimeSlots
                  selectedDate={bookingDetails.date}
                  selectedTime={bookingDetails.time}
                  onTimeSelect={handleTimeSelect}
                />
              )}

              {bookingDetails.date && bookingDetails.time && (
                <button
                  onClick={handleScheduleClick}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-full font-semibold transition-all shadow-lg"
                >
                  Confirmar Horário
                </button>
              )}
            </div>
          )}
        </section>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        bookingDetails={bookingDetails}
      />
      
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
