import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import type { Person } from '../types';

export const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [personName, setPersonName] = useState('');
  const [relationship, setRelationship] = useState('family' as Person['relationship']);
  const navigate = useNavigate();
  const { addPerson, canAddPerson, saveUser } = useApp();

  const handleFinish = () => {
    if (canAddPerson && userName && personName && relationship) {
      saveUser({
        id: crypto.randomUUID(),
        name: userName,
        email: '',
        onboardingCompleted: true,
        favoriteGiftIds: [],
      });
      addPerson({
        name: personName,
        relationship,
        birthday: '2000-01-01',
        interests: [],
        favoriteColors: [],
        favoriteCategories: [],
        dislikes: [],
        style: '',
        sizes: {},
        notes: '',
        tags: [],
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-8">
      <div className="mb-8 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 transition-all" style={{ width: `${(step / 2) * 100}%` }}></div>
      </div>
      
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">What's your name?</h2>
          <input className="w-full p-4 border rounded-xl" placeholder="Your full name" value={userName} onChange={e => setUserName(e.target.value)} />
          <Button onClick={() => setStep(2)}>Continue</Button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Add someone who matters.</h2>
          {!canAddPerson && <p className="text-red-500">Free plan limit reached (3/3).</p>}
          <div className="space-y-4">
            <input className="w-full p-4 border rounded-xl" placeholder="Person's Name" value={personName} onChange={e => setPersonName(e.target.value)} />
            <select className="w-full p-4 border rounded-xl" value={relationship} onChange={e => setRelationship(e.target.value as Person['relationship'])}>
                <option value="family">Family</option>
                <option value="friend">Friend</option>
                <option value="work">Work</option>
                <option value="partner">Partner</option>
                <option value="other">Other</option>
            </select>
          </div>
          <Button onClick={handleFinish} disabled={!canAddPerson}>Finish</Button>
        </div>
      )}
    </div>
  );
};
