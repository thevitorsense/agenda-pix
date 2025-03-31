import React from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const isDateAvailable = (date: Date) => {
    // Mock availability - in production this would check against actual availability
    return Math.random() > 0.3;
  };

  return (
    <div className="rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isAvailable = isDateAvailable(day);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const dayIsToday = isToday(day);

          return (
            <button
              key={day.toString()}
              onClick={() => isAvailable && onDateSelect(day)}
              disabled={!isAvailable}
              className={`
                p-2 text-sm rounded-full transition-colors
                ${isAvailable ? 'hover:bg-primary/10 cursor-pointer' : 'cursor-not-allowed opacity-50'}
                ${isSelected ? 'bg-primary text-white hover:bg-primary/90' : ''}
                ${dayIsToday && !isSelected ? 'border border-primary text-primary' : 'text-gray-700'}
              `}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};
