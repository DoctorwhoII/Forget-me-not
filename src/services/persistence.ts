import type { User, Person, Occasion, GiftPlan, Notification, AppSettings } from '../types';
import { generateNotifications } from './notificationService';

const STORAGE_KEY = 'fmn_data';

interface AppData {
  user: User | null;
  people: Person[];
  occasions: Occasion[];
  plans: GiftPlan[];
  notifications: Notification[];
  settings: AppSettings;
  onboardingCompleted: boolean;
}

const generateId = () => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
};

const demoData: AppData = {
  user: { id: generateId(), name: 'Aayan', email: 'aayan@example.com', onboardingCompleted: true, favoriteGiftIds: [] },
  people: [
    {
      id: generateId(),
      name: 'Mom',
      relationship: 'family',
      birthday: '1970-05-15',
      interests: ['gardening', 'books'],
      favoriteColors: ['blue'],
      favoriteCategories: ['home'],
      dislikes: [],
      style: 'classic',
      sizes: {},
      notes: 'Loves roses.',
      tags: ['family'],
      createdAt: new Date().toISOString(),
    },
  ],
  occasions: [],
  plans: [],
  notifications: [],
  settings: {
    defaultBudget: { min: 20, max: 100 },
    notificationsEnabled: true,
    currency: 'BHD',
    theme: 'system',
  },
  onboardingCompleted: true,
};

const loadData = (): AppData => {
  const data = localStorage.getItem(STORAGE_KEY);
  const parsedData = data ? JSON.parse(data) : demoData;
  
  // Refresh notifications dynamically based on current data
  parsedData.notifications = generateNotifications(parsedData.people, parsedData.occasions);
  
  return parsedData;
};

const saveData = (data: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const persistenceService = {
  // Demo Data
  resetToDemoData: () => {
    saveData(demoData);
  },

  // People
  getPeople: () => loadData().people,
  createPerson: (person: Omit<Person, 'id' | 'createdAt'>) => {
    const data = loadData();
    const newPerson: Person = {
      ...person,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    data.people.push(newPerson);
    saveData(data);
    return newPerson;
  },
  updatePerson: (updatedPerson: Person) => {
    const data = loadData();
    data.people = data.people.map(p => p.id === updatedPerson.id ? updatedPerson : p);
    saveData(data);
  },
  deletePerson: (id: string) => {
    const data = loadData();
    data.people = data.people.filter(p => p.id !== id);
    data.occasions = data.occasions.filter(o => o.personId !== id);
    data.plans = data.plans.filter(p => p.personId !== id);
    saveData(data);
  },

  // Occasions
  getOccasions: () => loadData().occasions,
  createOccasion: (occasion: Omit<Occasion, 'id'>) => {
    const data = loadData();
    const newOccasion: Occasion = {
      ...occasion,
      id: generateId(),
    };
    data.occasions.push(newOccasion);
    saveData(data);
    return newOccasion;
  },
  
  // Plans
  getGiftPlans: () => loadData().plans,
  createGiftPlan: (plan: Omit<GiftPlan, 'id' | 'createdAt' | 'updatedAt'>) => {
    const data = loadData();
    const now = new Date().toISOString();
    const newPlan: GiftPlan = {
      ...plan,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    data.plans.push(newPlan);
    saveData(data);
    return newPlan;
  },
  updateGiftPlan: (updatedPlan: GiftPlan) => {
    const data = loadData();
    data.plans = data.plans.map(p => p.id === updatedPlan.id ? { ...updatedPlan, updatedAt: new Date().toISOString() } : p);
    saveData(data);
  },

  // User & Settings
  getUser: () => loadData().user,
  saveUser: (user: User) => {
    const data = loadData();
    data.user = user;
    saveData(data);
  },
  updateSettings: (settings: AppSettings) => {
    const data = loadData();
    data.settings = settings;
    saveData(data);
  },
  toggleFavoriteGift: (giftId: string) => {
    const data = loadData();
    if (!data.user) return;
    
    if (data.user.favoriteGiftIds.includes(giftId)) {
        data.user.favoriteGiftIds = data.user.favoriteGiftIds.filter(id => id !== giftId);
    } else {
        data.user.favoriteGiftIds.push(giftId);
    }
    saveData(data);
  },
};
