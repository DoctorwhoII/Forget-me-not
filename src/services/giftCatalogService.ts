import type { Gift } from '../types';

export const giftCatalog: Gift[] = [
  {
    id: 'gift-1',
    name: 'Classic Leather Notebook',
    description: 'A beautiful, high-quality leather notebook perfect for journaling and sketches.',
    price: 850,
    category: 'Stationery',
    tags: ['classic', 'stationary'],
    interests: ['books', 'writing'],
    suitableOccasions: ['birthday', 'graduation', 'promotion'],
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500&auto=format&fit=crop',
    available: true,
  },
  {
    id: 'gift-2',
    name: 'Aromatic Soy Candle Set',
    description: 'A set of 3 hand-poured soy candles with calming lavender and jasmine scents.',
    price: 1200,
    category: 'Wellness',
    tags: ['relaxing', 'home'],
    interests: ['wellness'],
    suitableOccasions: ['birthday', 'housewarming', 'mothers-day'],
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1602654593466-231a54203770?q=80&w=500&auto=format&fit=crop',
    available: true,
  },
  {
    id: 'gift-3',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact yet powerful, this waterproof speaker is perfect for music on the go.',
    price: 1800,
    category: 'Technology',
    tags: ['tech', 'music'],
    interests: ['technology', 'music'],
    suitableOccasions: ['birthday', 'graduation', 'friendship'],
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=500&auto=format&fit=crop',
    available: true,
  }
];
