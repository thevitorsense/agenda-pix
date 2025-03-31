import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { TimeSlot } from '../types';

interface TimeSlotsProps {
  selectedDate: Date;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({
  selectedDate,
  selectedTime,
  onTimeSelect,
}) => {
  const [timeSlots, setTimeSlots] = React.useState<TimeSlot[]>([]);

  React.useEffect(() => {
    // Generate only 6 time slots per day
    const slots: TimeSlot[] = [
      { time: '10:00', available: Math.random() > 0.3 },
      { time: '13:00', available: Math.random() > 0.3 },
      { time: '15:00', available: Math.random() > 0.3 },
      { time: '17:00', available: Math.random() > 0.3 },
      { time: '19:00', available: Math.random() > 0.3 },
      { time: '21:00', available: Math.random() > 0.3 },
    ];
    setTimeSlots(slots);
  }, [selectedDate]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Horários disponíveis para {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {timeSlots.map((slot) => (
          <button
            key={slot.time}
            onClick={() => slot.available && onTimeSelect(slot.time)}
            disabled={!slot.available}
            className={`
              p-4 rounded-full text-base font-medium transition-all
              ${slot.available
                ? selectedTime === slot.time
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
};
