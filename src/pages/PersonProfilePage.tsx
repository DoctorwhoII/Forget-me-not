import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const PersonProfilePage = () => {
  const { personId } = useParams();
  const { people, occasions } = useApp();
  
  const person = people.find(p => p.id === personId);
  const personOccasions = occasions.filter(o => o.personId === personId);

  if (!person) return <div>Person not found.</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{person.name}</h1>
        <Link to={`/people/${person.id}/edit`} className="bg-gray-100 px-4 py-2 rounded-full font-bold">Edit Profile</Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Details</h3>
            <p><strong>Relationship:</strong> {person.relationship}</p>
            {person.birthday && <p><strong>Birthday:</strong> {new Date(person.birthday).toLocaleDateString()}</p>}
            <p><strong>Interests:</strong> {person.interests.join(', ')}</p>
            {person.notes && <p className="mt-4 text-gray-600">{person.notes}</p>}
        </section>

        <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Occasions</h3>
            {personOccasions.length === 0 ? (
                <p className="text-gray-500">No occasions added.</p>
            ) : (
                <ul className="space-y-2">
                    {personOccasions.map(o => <li key={o.id}>{o.title} - {new Date(o.date).toLocaleDateString()}</li>)}
                </ul>
            )}
        </section>
      </div>
    </div>
  );
};
