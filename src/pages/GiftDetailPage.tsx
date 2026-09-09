import { useParams } from 'react-router-dom';
import { giftCatalog } from '../services/giftCatalogService';
import { useApp } from '../context/AppContext';

export const GiftDetailPage = () => {
  const { giftId } = useParams();
  const gift = giftCatalog.find(g => g.id === giftId);
  const { user, toggleFavoriteGift } = useApp();
  
  if (!gift) return <div>Gift not found.</div>;

  const isFavorite = user?.favoriteGiftIds.includes(gift.id);

  return (
    <div className="max-w-4xl mx-auto py-12 px-8">
      <div className="grid md:grid-cols-2 gap-12">
        <img src={gift.image} alt={gift.name} className="w-full h-96 object-cover rounded-3xl" />
        <div className="space-y-6">
            <h1 className="text-4xl font-bold">{gift.name}</h1>
            <p className="text-2xl font-bold text-gray-700">₹{gift.price}</p>
            <p className="text-gray-600">{gift.description}</p>
            <div className="space-x-2">
                {gift.tags.map(tag => <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{tag}</span>)}
            </div>
            <div className="flex gap-4">
                <button className="bg-black text-white px-8 py-4 rounded-full font-bold">Choose Gift</button>
                <button 
                  onClick={() => toggleFavoriteGift(gift.id)} 
                  className={`px-8 py-4 rounded-full font-bold border ${isFavorite ? 'bg-red-50 text-red-600 border-red-200' : 'border-gray-300'}`}
                >
                    {isFavorite ? 'Favorited' : 'Favorite'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
