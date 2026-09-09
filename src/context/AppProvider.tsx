import { useState } from 'react';
import type { ReactNode } from 'react';
import type { User, Person, Occasion, GiftPlan } from '../types';
import { persistenceService } from '../services/persistence';
import { giftCatalog } from '../services/giftCatalogService';
import { getRecommendations } from '../services/recommendationService';
import { AppContext } from './AppContext';
import type { AppState } from './AppContext';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AppState>({
    user: persistenceService.getUser(),
    people: persistenceService.getPeople(),
    occasions: persistenceService.getOccasions(),
    plans: persistenceService.getGiftPlans(),
    notifications: [],
    settings: {
      defaultBudget: { min: 500, max: 2000 },
      notificationsEnabled: true,
      currency: 'INR',
      theme: 'system',
    },
    onboardingCompleted: true,
  });

  const refreshData = () => {
    setData({
      user: persistenceService.getUser(),
      people: persistenceService.getPeople(),
      occasions: persistenceService.getOccasions(),
      plans: persistenceService.getGiftPlans(),
      notifications: [],
      settings: {
        defaultBudget: { min: 500, max: 2000 },
        notificationsEnabled: true,
        currency: 'INR',
        theme: 'system',
      },
      onboardingCompleted: true,
    });
  };

  const canAddPerson = data.people.length < 3;

  const addPerson = (person: Omit<Person, 'id' | 'createdAt'>) => {
    if (!canAddPerson) return;
    persistenceService.createPerson(person);
    refreshData();
  };

  const updatePerson = (person: Person) => {
    persistenceService.updatePerson(person);
    refreshData();
  };

  const deletePerson = (id: string) => {
    if (window.confirm("Are you sure you want to delete this person and all their associated data?")) {
        persistenceService.deletePerson(id);
        refreshData();
    }
  };

  const toggleFavoriteGift = (giftId: string) => {
    persistenceService.toggleFavoriteGift(giftId);
    refreshData();
  };

  const getRecommendationsForOccasion = (personId: string, occasionId: string) => {
    const person = data.people.find(p => p.id === personId);
    const occasion = data.occasions.find(o => o.id === occasionId);
    
    if (!person || !occasion) return [];
    
    return getRecommendations(person, occasion, giftCatalog, data.plans);
  };

  const createOccasion = (occasion: Omit<Occasion, 'id'>) => {
    persistenceService.createOccasion(occasion);
    refreshData();
  };

  const createGiftPlan = (plan: Omit<GiftPlan, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPlan = persistenceService.createGiftPlan(plan);
    refreshData();
    return newPlan;
  };

  const updateGiftPlan = (plan: GiftPlan) => {
    persistenceService.updateGiftPlan(plan);
    refreshData();
  };

  const saveUser = (user: User) => {
    persistenceService.saveUser(user);
    refreshData();
  };

  const resetDemoData = () => {
    if (window.confirm("Are you sure you want to reset all data to demo data? This cannot be undone.")) {
      persistenceService.resetToDemoData();
      refreshData();
    }
  };

  return (
    <AppContext.Provider value={{ 
      ...data, 
      addPerson, 
      updatePerson,
      deletePerson,
      toggleFavoriteGift,
      getRecommendationsForOccasion,
      canAddPerson, 
      createOccasion, 
      createGiftPlan, 
      updateGiftPlan,
      saveUser, 
      resetDemoData,
      refreshData 
    }}>
      {children}
    </AppContext.Provider>
  );
};
