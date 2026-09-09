import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const RecommendationPage = () => {
  const { personId, occasionId } = useParams<{ personId: string, occasionId: string }>();
  const { getRecommendationsForOccasion, people, occasions } = useApp();
  
  if (!personId || !occasionId) return <div>Invalid request.</div>;

  const person = people.find(p => p.id === personId);
  const occasion = occasions.find(o => o.id === occasionId);
  const recommendations = getRecommendationsForOccasion(personId, occasionId);

  if (!person || !occasion) return <div>Data not found.</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-8">
      <h1 className="text-3xl font-bold mb-2">Recommendations for {person.name}'s {occasion.title}</h1>
      <p className="text-gray-600 mb-8">We found {recommendations.length} great gifts based on {person.name}'s interests.</p>

      <div className="space-y-8">
        {recommendations.map(rec => (
          <div key={rec.gift.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex gap-6">
            <img src={rec.gift.image} alt={rec.gift.name} className="w-48 h-48 object-cover rounded-2xl" />
            <div className="flex-1">
                <h3 className="text-xl font-bold">{rec.gift.name}</h3>
                <p className="text-gray-500 mb-2">₹{rec.gift.price}</p>
                <div className="bg-green-50 p-4 rounded-xl mb-4">
                    <p className="text-sm font-bold text-green-800 mb-1">Why this gift?</p>
                    <ul className="text-sm text-green-700 list-disc list-inside">
                        {rec.explanation.map((exp, i) => <li key={i}>{exp}</li>)}
                    </ul>
                </div>
                <Link to={`/people/${personId}/occasions/${occasionId}/select-gift`} className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold">Select Gift</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
