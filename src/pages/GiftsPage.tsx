import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { giftCatalog } from '../services/giftCatalogService';

export const GiftsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGifts = useMemo(() => {
    return giftCatalog.filter(gift => 
      gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gift.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="max-w-6xl mx-auto py-12 px-8">
      <h1 className="text-3xl font-bold mb-8">Gift Catalog</h1>
      
      <input 
        type="text" 
        className="w-full p-4 border rounded-xl mb-8" 
        placeholder="Search gifts by name or category..." 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <div className="grid md:grid-cols-3 gap-8">
        {filteredGifts.map(gift => (
          <Link key={gift.id} to={`/gifts/${gift.id}`} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
            <img src={gift.image} alt={gift.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-lg mb-1">{gift.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{gift.category}</p>
              <p className="font-bold text-lg">₹{gift.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
