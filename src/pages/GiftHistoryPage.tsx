import { useApp } from '../context/AppContext';
import { giftCatalog } from '../services/giftCatalogService';

export const GiftHistoryPage = () => {
  const { plans, people, occasions } = useApp();
  
  const history = plans.filter(p => p.status === 'delivered');

  return (
    <div className="max-w-6xl mx-auto py-12 px-8">
      <h1 className="text-3xl font-bold mb-8">Gift History</h1>
      
      {history.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center">
            <p className="text-gray-500 text-lg">No delivered gifts yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
            {history.map(plan => {
                const person = people.find(p => p.id === plan.personId);
                const occasion = occasions.find(o => o.id === plan.occasionId);
                const gift = giftCatalog.find(g => g.id === plan.giftId);
                
                return (
                    <div key={plan.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
                        <div>
                            <p className="font-bold text-lg">{gift?.name}</p>
                            <p className="text-sm text-gray-500">For {person?.name}'s {occasion?.title}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">₹{plan.budget}</p>
                            <p className="text-sm text-gray-500">{new Date(plan.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                );
            })}
        </div>
      )}
    </div>
  );
};
