import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import type { Person } from '../types';

export const EditPersonPage = () => {
  const { personId } = useParams();
  const navigate = useNavigate();
  const { people, updatePerson } = useApp();
  
  const person = people.find(p => p.id === personId);
  
  const [formData, setFormData] = useState<Person | null>(person || null);

  if (!person || !formData) return <div>Person not found.</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePerson(formData);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-8">
      <h1 className="text-3xl font-bold mb-8">Edit {person.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input className="w-full p-4 border rounded-xl" placeholder="Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        <select className="w-full p-4 border rounded-xl" value={formData.relationship} onChange={e => setFormData({...formData, relationship: e.target.value as Person['relationship']})}>
            <option value="family">Family</option>
            <option value="friend">Friend</option>
            <option value="work">Work</option>
            <option value="partner">Partner</option>
            <option value="other">Other</option>
        </select>
        <input type="date" className="w-full p-4 border rounded-xl" value={formData.birthday || ''} onChange={e => setFormData({...formData, birthday: e.target.value})} />
        <input className="w-full p-4 border rounded-xl" placeholder="Interests (comma separated)" value={formData.interests.join(', ')} onChange={e => setFormData({...formData, interests: e.target.value.split(',').map(i => i.trim()).filter(Boolean)})} />
        <textarea className="w-full p-4 border rounded-xl" placeholder="Notes" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
        <div className="flex gap-4">
            <Button type="submit">Save Changes</Button>
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};
