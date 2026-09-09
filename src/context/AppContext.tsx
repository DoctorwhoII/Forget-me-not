import { createContext, useContext } from 'react';
import type { User, Person, Occasion, GiftPlan, Notification, AppSettings } from '../types';
import { getRecommendations } from '../services/recommendationService';

export interface AppState {
  user: User | null;
  people: Person[];
  occasions: Occasion[];
  plans: GiftPlan[];
  notifications: Notification[];
  settings: AppSettings;
  onboardingCompleted: boolean;
}

export interface AppContextType extends AppState {
  addPerson: (person: Omit<Person, 'id' | 'createdAt'>) => void;
  updatePerson: (person: Person) => void;
  deletePerson: (id: string) => void;
  toggleFavoriteGift: (giftId: string) => void;
  getRecommendationsForOccasion: (personId: string, occasionId: string) => ReturnType<typeof getRecommendations>;
  canAddPerson: boolean;
  createOccasion: (occasion: Omit<Occasion, 'id'>) => void;
  createGiftPlan: (plan: Omit<GiftPlan, 'id' | 'createdAt' | 'updatedAt'>) => GiftPlan;
  updateGiftPlan: (plan: GiftPlan) => void;
  saveUser: (user: User) => void;
  resetDemoData: () => void;
  refreshData: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
