import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import type { Person } from '../types';

export const AddPersonPage = () => {
  const navigate = useNavigate();
  const { addPerson, canAddPerson } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    relationship: 'family' as Person['relationship'],
    birthday: '',
    interests: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canAddPerson) return;
    if (!formData.name.trim()) return;

    addPerson({
      name: formData.name.trim(),
      relationship: formData.relationship,
      birthday: formData.birthday || undefined,
      interests: formData.interests.split(',').map(i => i.trim()).filter(Boolean),
      favoriteColors: [],
      favoriteCategories: [],
      dislikes: [],
      style: '',
      sizes: {},
      notes: formData.notes,
      tags: [],
    });
    navigate('/dashboard');
  };

  if (!canAddPerson) return (
    <div className="max-w-md mx-auto py-12 px-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Free plan limit reached</h2>
      <p className="mb-6">You can add up to 3 people on the free plan.</p>
      <Button onClick={() => navigate('/upgrade')}>Upgrade to Plus</Button>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto py-12 px-8">
      <h1 className="text-3xl font-bold mb-8">Add a Person</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input className="w-full p-4 border rounded-xl" placeholder="Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        <select className="w-full p-4 border rounded-xl" value={formData.relationship} onChange={e => setFormData({...formData, relationship: e.target.value as Person['relationship']})}>
            <option value="family">Family</option>
            <option value="friend">Friend</option>
            <option value="work">Work</option>
            <option value="partner">Partner</option>
            <option value="other">Other</option>
        </select>
        <input type="date" className="w-full p-4 border rounded-xl" value={formData.birthday} onChange={e => setFormData({...formData, birthday: e.target.value})} />
        <input className="w-full p-4 border rounded-xl" placeholder="Interests (comma separated)" value={formData.interests} onChange={e => setFormData({...formData, interests: e.target.value})} />
        <textarea className="w-full p-4 border rounded-xl" placeholder="Notes" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
        <Button type="submit">Add Person</Button>
      </form>
    </div>
  );
};
