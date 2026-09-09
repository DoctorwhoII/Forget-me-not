import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import type { Occasion } from '../types';

export const AddOccasionPage = () => {
  const { personId } = useParams<{ personId: string }>();
  const navigate = useNavigate();
  const { createOccasion } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    type: 'birthday' as Occasion['type'],
    recurrence: 'none' as Occasion['recurrence'],
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personId) return;
    if (!formData.title.trim() || !formData.date) return;

    createOccasion({
      personId,
      title: formData.title.trim(),
      date: formData.date,
      type: formData.type,
      recurrence: formData.recurrence,
      reminderSettings: [7], // Default 1 week before
      notes: formData.notes,
    });
    navigate(`/people/${personId}`);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-8">
      <h1 className="text-3xl font-bold mb-8">Add Occasion</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input className="w-full p-4 border rounded-xl" placeholder="Occasion Title" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        <input type="date" className="w-full p-4 border rounded-xl" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
        <select className="w-full p-4 border rounded-xl" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as Occasion['type']})}>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="graduation">Graduation</option>
            <option value="wedding">Wedding</option>
            <option value="valentine">Valentine's Day</option>
            <option value="mothers-day">Mother's Day</option>
            <option value="fathers-day">Father's Day</option>
            <option value="friendship">Friendship Day</option>
            <option value="baby-shower">Baby Shower</option>
            <option value="housewarming">Housewarming</option>
            <option value="promotion">Promotion</option>
            <option value="retirement">Retirement</option>
            <option value="custom">Custom</option>
        </select>
        <select className="w-full p-4 border rounded-xl" value={formData.recurrence} onChange={e => setFormData({...formData, recurrence: e.target.value as Occasion['recurrence']})}>
            <option value="none">No Recurrence</option>
            <option value="yearly">Yearly</option>
        </select>
        <textarea className="w-full p-4 border rounded-xl" placeholder="Notes" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
        <Button type="submit">Add Occasion</Button>
      </form>
    </div>
  );
};
