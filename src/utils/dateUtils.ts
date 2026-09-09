import type { Occasion, Person } from '../types';

export const getNextOccurrence = (date: string, recurrence: 'none' | 'yearly'): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const occDate = new Date(date);
  
  // Create candidate date for current or next year
  const nextOcc = new Date(today.getFullYear(), occDate.getMonth(), occDate.getDate());

  // Handle leap day (Feb 29) if user input a leap day but current year isn't a leap year
  if (occDate.getMonth() === 1 && occDate.getDate() === 29) {
    // If not a leap year, move to Feb 28
    if (new Date(nextOcc.getFullYear(), 1, 29).getMonth() !== 1) {
        nextOcc.setDate(28);
    }
  }

  if (nextOcc < today) {
    if (recurrence === 'yearly') {
        nextOcc.setFullYear(today.getFullYear() + 1);
        // Re-check leap day for next year
        if (occDate.getMonth() === 1 && occDate.getDate() === 29) {
            if (new Date(nextOcc.getFullYear(), 1, 29).getMonth() !== 1) {
                nextOcc.setDate(28);
            }
        }
    } else {
        // If not recurring, it's technically passed
        return nextOcc;
    }
  }
  return nextOcc;
};

export const getDaysRemaining = (date: Date): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = date.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getUpcomingOccasions = (people: Person[], occasions: Occasion[]) => {
  return occasions
    .map(occ => {
      const person = people.find(p => p.id === occ.personId);
      const nextDate = getNextOccurrence(occ.date, occ.recurrence);
      const daysLeft = getDaysRemaining(nextDate);
      return { ...occ, person, nextDate, daysLeft };
    })
    .filter(o => o.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft);
};
