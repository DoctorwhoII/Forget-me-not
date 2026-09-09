import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getUpcomingOccasions } from '../utils/dateUtils';

export const DashboardPage = () => {
  const { people, occasions, plans, deletePerson } = useApp();
  const upcoming = getUpcomingOccasions(people, occasions);

  const needsAttention = upcoming.filter(o => {
    const hasPlan = plans.some(p => p.occasionId === o.id);
    return o.daysLeft <= 7 && !hasPlan;
  });

  return (
    <div className="max-w-6xl mx-auto py-12 px-8 space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Welcome back.</h1>
        <Link to="/add-person" className="bg-black text-white px-6 py-3 rounded-full font-bold">Add Person</Link>
      </div>
      
      <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">{people.length} / 3 people added</h2>
        <div className="grid md:grid-cols-3 gap-6">
            {people.map(p => (
                <div key={p.id} className="p-4 bg-gray-50 rounded-xl space-y-2">
                    <div className="flex justify-between items-start">
                        <Link to={`/people/${p.id}`} className="font-bold hover:text-blue-600">{p.name}</Link>
                        <div className="flex gap-2">
                            <Link to={`/people/${p.id}/edit`} className="text-xs text-blue-500 hover:text-blue-700">Edit</Link>
                            <button onClick={() => deletePerson(p.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600">{p.relationship}</p>
                    <Link to={`/people/${p.id}/add-occasion`} className="text-sm text-blue-600 block">Add Occasion</Link>
                </div>
            ))}
        </div>
      </section>
      
      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Upcoming Moments</h3>
          {upcoming.length === 0 ? (
              <p className="text-gray-500">No upcoming moments yet.</p>
          ) : (
              <div className="space-y-4">
                  {upcoming.map(o => (
                      <div key={o.id} className="flex justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-bold">{o.person?.name}'s {o.title}</p>
                            <p className="text-sm text-gray-600">{o.nextDate.toLocaleDateString()}</p>
                          </div>
                          <p className="font-bold">{o.daysLeft === 0 ? 'Today' : `${o.daysLeft} days away`}</p>
                      </div>
                  ))}
              </div>
          )}
        </section>
        
        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Needs Attention</h3>
          {needsAttention.length === 0 ? (
              <p className="text-gray-500">All clear for now.</p>
          ) : (
              <div className="space-y-4">
                  {needsAttention.map(o => (
                      <div key={o.id} className="p-4 bg-red-50 rounded-xl">
                          <p className="font-bold text-red-800">{o.person?.name}'s {o.title} is in {o.daysLeft} days!</p>
                          <p className="text-sm text-red-600">You haven't planned a gift yet.</p>
                          <Link to={`/people/${o.personId}/add-occasion`} className="text-sm text-red-700 font-bold underline">Plan gift now</Link>
                      </div>
                  ))}
              </div>
          )}
        </section>
      </div>
    </div>
  );
};
