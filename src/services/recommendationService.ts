import type { Gift, Person, Occasion, GiftPlan } from '../types';

interface Recommendation {
  gift: Gift;
  score: number;
  explanation: string[];
}

export const getRecommendations = (
  person: Person,
  occasion: Occasion,
  allGifts: Gift[],
  giftHistory: GiftPlan[]
): Recommendation[] => {
  return allGifts
    .map(gift => {
      let score = 0;
      const explanation: string[] = [];

      // Interest match (+40)
      const interestMatches = gift.interests.filter(i => person.interests.includes(i));
      if (interestMatches.length > 0) {
        score += 40;
        explanation.push(`Matches interests: ${interestMatches.join(', ')}`);
      }

      // Occasion match (+25)
      if (gift.suitableOccasions.includes(occasion.type)) {
        score += 25;
        explanation.push(`Perfect for a ${occasion.type}`);
      }

      // Popularity (+5)
      if (gift.rating > 4.5) {
        score += 5;
        explanation.push(`Highly rated gift`);
      }

      // Previously gifted (-30)
      const alreadyGifted = giftHistory.some(plan => plan.giftId === gift.id && plan.personId === person.id && plan.status === 'delivered');
      if (alreadyGifted) {
        score -= 30;
        explanation.push(`Already gifted this to ${person.name} before`);
      }

      // Unavailable (-100)
      if (!gift.available) {
        score -= 100;
        explanation.push(`Currently unavailable`);
      }

      return { gift, score, explanation };
    })
    .filter(rec => rec.score > 0)
    .sort((a, b) => b.score - a.score);
};
