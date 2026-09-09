import type { Occasion, Person, Notification } from '../types';
import { differenceInDays } from 'date-fns';

export const generateNotifications = (people: Person[], occasions: Occasion[]): Notification[] => {
    const notifications: Notification[] = [];
    const today = new Date();

    occasions.forEach(occasion => {
        const occasionDate = new Date(occasion.date);
        
        // Simple upcoming occasion notification (e.g., 7 days before)
        const daysUntil = differenceInDays(occasionDate, today);
        
        if (daysUntil >= 0 && daysUntil <= 7) {
            const person = people.find(p => p.id === occasion.personId);
            notifications.push({
                id: `notif-${occasion.id}-${daysUntil}`,
                timestamp: today.toISOString(),
                type: 'upcoming_occasion',
                entityId: occasion.id,
                message: `${person?.name}'s ${occasion.title} is in ${daysUntil === 0 ? 'today' : `${daysUntil} days`}.`,
                read: false,
            });
        }
    });

    return notifications;
};
