import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { useApp } from '../context/AppContext';

export const CalendarPage = () => {
  const { people, occasions } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="max-w-6xl mx-auto py-12 px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{format(currentDate, 'MMMM yyyy')}</h1>
        <div className="space-x-4">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="bg-gray-100 px-4 py-2 rounded-full">Previous</button>
          <button onClick={() => setCurrentDate(new Date())} className="bg-gray-100 px-4 py-2 rounded-full">Today</button>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="bg-gray-100 px-4 py-2 rounded-full">Next</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-bold text-gray-500">{day}</div>
        ))}
        {calendarDays.map(day => {
          const dayOccasions = occasions.filter(o => isSameDay(new Date(o.date), day));
          return (
            <div key={day.toString()} className={`min-h-32 p-2 border rounded-xl ${!isSameMonth(day, monthStart) ? 'bg-gray-50 text-gray-400' : 'bg-white'}`}>
              <div className="font-bold mb-2">{format(day, 'd')}</div>
              <div className="space-y-1">
                {dayOccasions.map(o => {
                  const person = people.find(p => p.id === o.personId);
                  return (
                    <Link key={o.id} to={`/people/${o.personId}`} className="block text-xs bg-blue-100 text-blue-800 p-1 rounded truncate">
                      {person?.name}'s {o.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
