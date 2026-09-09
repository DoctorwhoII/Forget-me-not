export interface User {
  id: string;
  name: string;
  email: string;
  onboardingCompleted: boolean;
  favoriteGiftIds: string[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Person {
  id: string;
  name: string;
  relationship: 'family' | 'friend' | 'work' | 'partner' | 'other';
  birthday?: string;
  email?: string;
  phone?: string;
  address?: Address;
  interests: string[];
  favoriteColors: string[];
  favoriteCategories: string[];
  dislikes: string[];
  style: string;
  sizes: Record<string, string>;
  notes: string;
  tags: string[];
  createdAt: string;
}

export interface Occasion {
  id: string;
  personId: string;
  type: 'birthday' | 'anniversary' | 'graduation' | 'wedding' | 'valentine' | 'mothers-day' | 'fathers-day' | 'friendship' | 'baby-shower' | 'housewarming' | 'promotion' | 'retirement' | 'custom';
  title: string;
  date: string; // ISO format
  recurrence: 'none' | 'yearly';
  reminderSettings: number[]; // days before
  notes: string;
}

export interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  interests: string[];
  suitableOccasions: string[];
  rating: number;
  image: string;
  available: boolean;
}

export interface GiftPlan {
  id: string;
  personId: string;
  occasionId: string;
  giftId?: string;
  budget: number;
  message: string;
  deliveryDate?: string;
  deliveryAddress?: Address;
  deliveryInstructions?: string;
  status: 'planning' | 'selected' | 'scheduled' | 'preparing' | 'delivered';
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  timestamp: string;
  type: 'upcoming_occasion' | 'gift_needed' | 'gift_scheduled' | 'delivery_alert';
  entityId: string;
  message: string;
  read: boolean;
}

export interface AppSettings {
  defaultBudget: { min: number; max: number };
  notificationsEnabled: boolean;
  currency: string;
  theme: 'light' | 'dark' | 'system';
}
