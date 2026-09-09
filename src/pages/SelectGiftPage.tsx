import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { giftCatalog } from '../services/giftCatalogService';

export const SelectGiftPage = () => {
  const { personId, occasionId } = useParams();
  const navigate = useNavigate();
  const { createGiftPlan } = useApp();
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);

  const handleSelect = () => {
    if (!personId || !occasionId || !selectedGiftId) return;

    const plan = createGiftPlan({
      personId,
      occasionId,
      giftId: selectedGiftId,
      budget: 0, // Placeholder
      message: '',
      status: 'selected',
    });
    
    navigate(`/plans/${plan.id}/configure`); 
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-8">
      <h1 className="text-3xl font-bold mb-8">Select a Gift</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {giftCatalog.map(gift => (
          <div 
            key={gift.id} 
            className={`p-6 rounded-3xl border-2 cursor-pointer ${selectedGiftId === gift.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100'}`}
            onClick={() => setSelectedGiftId(gift.id)}
          >
            <h3 className="font-bold">{gift.name}</h3>
            <p className="text-sm text-gray-500">₹{gift.price}</p>
          </div>
        ))}
      </div>
      <button 
        className="mt-8 bg-black text-white px-8 py-4 rounded-full font-bold disabled:opacity-50"
        disabled={!selectedGiftId}
        onClick={handleSelect}
      >
        Confirm Selection
      </button>
    </div>
  );
};
