import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { giftCatalog } from '../services/giftCatalogService';

export const ConfigurePlanPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { plans, people, occasions, updateGiftPlan } = useApp();

  const plan = plans.find(p => p.id === planId);
  const person = plan ? people.find(p => p.id === plan.personId) : null;
  const occasion = plan ? occasions.find(o => o.id === plan.occasionId) : null;
  const gift = plan ? giftCatalog.find(g => g.id === plan.giftId) : null;

  const [step, setStep] = useState(1);
  
  // Message Form State
  const [message, setMessage] = useState(plan?.message || '');
  
  // Delivery Form State
  const [deliveryDate, setDeliveryDate] = useState(plan?.deliveryDate || '');
  const [deliveryInstructions, setDeliveryInstructions] = useState(plan?.deliveryInstructions || '');
  const [address, setAddress] = useState({
    street: plan?.deliveryAddress?.street || '',
    city: plan?.deliveryAddress?.city || '',
    state: plan?.deliveryAddress?.state || '',
    zip: plan?.deliveryAddress?.zip || '',
    country: plan?.deliveryAddress?.country || 'India',
  });

  if (!plan || !person || !occasion || !gift) {
    return <div className="p-8">Gift Plan details not found.</div>;
  }

  // Pre-filled Message Templates
  const getMessageTemplates = () => {
    if (occasion.type === 'birthday') {
      return [
        `Happy Birthday, ${person.name}! Wishing you a wonderful day filled with love and laughter. Hope you like this gift!`,
        `To the best ${person.relationship} in the world, Happy Birthday! Thank you for always being there for me.`,
      ];
    }
    if (occasion.type === 'anniversary') {
      return [
        `Happy Anniversary to my amazing ${person.relationship}! Thank you for another year of wonderful memories.`,
        `Wishing you both a lifetime of love and happiness. Happy Anniversary!`,
      ];
    }
    return [
      `Thinking of you on this special day, ${person.name}! Hope this token of appreciation brings a smile to your face.`,
    ];
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSchedulePlan = () => {
    const updatedPlan = {
      ...plan,
      message,
      deliveryDate,
      deliveryAddress: address,
      deliveryInstructions,
      status: 'scheduled' as const,
    };
    updateGiftPlan(updatedPlan);
    navigate('/dashboard');
  };

  // Warning check if delivery date is after occasion date
  const isDeliveryAfterOccasion = () => {
    if (!deliveryDate || !occasion.date) return false;
    return new Date(deliveryDate) > new Date(occasion.date);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-8">
      {/* Progress Indicator */}
      <div className="flex justify-between items-center mb-12">
        {['Write Message', 'Delivery Details', 'Review & Schedule'].map((name, idx) => (
          <div key={name} className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {idx + 1}
            </div>
            <span className={`text-sm ${step === idx + 1 ? 'font-bold text-gray-800' : 'text-gray-400'}`}>{name}</span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Write a Message for {person.name}</h2>
          <div className="space-y-2">
            <p className="text-sm font-bold text-gray-500">Need some inspiration?</p>
            <div className="flex gap-4">
              {getMessageTemplates().map((tmpl, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setMessage(tmpl)}
                  className="p-4 bg-gray-50 hover:bg-gray-100 border rounded-xl text-left text-sm text-gray-600 transition"
                >
                  {tmpl}
                </button>
              ))}
            </div>
          </div>
          <textarea 
            className="w-full p-4 border rounded-xl h-48"
            placeholder="Write your personal message here..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <div className="text-right text-xs text-gray-400">
            {message.length} characters
          </div>
          <Button onClick={handleNextStep}>Continue to Delivery</Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Delivery Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-1">Expected Delivery Date</label>
              <input 
                type="date" 
                className="w-full p-4 border rounded-xl"
                value={deliveryDate}
                onChange={e => setDeliveryDate(e.target.value)}
              />
              {isDeliveryAfterOccasion() && (
                <p className="text-xs text-amber-600 mt-1 font-bold">⚠️ Warning: Delivery date is scheduled after the occasion date ({new Date(occasion.date).toLocaleDateString()})!</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                className="w-full p-4 border rounded-xl col-span-2"
                placeholder="Street Address"
                value={address.street}
                onChange={e => setAddress({...address, street: e.target.value})}
              />
              <input 
                type="text" 
                className="w-full p-4 border rounded-xl"
                placeholder="City"
                value={address.city}
                onChange={e => setAddress({...address, city: e.target.value})}
              />
              <input 
                type="text" 
                className="w-full p-4 border rounded-xl"
                placeholder="State"
                value={address.state}
                onChange={e => setAddress({...address, state: e.target.value})}
              />
              <input 
                type="text" 
                className="w-full p-4 border rounded-xl"
                placeholder="Zip Code"
                value={address.zip}
                onChange={e => setAddress({...address, zip: e.target.value})}
              />
            </div>
            <textarea 
              className="w-full p-4 border rounded-xl"
              placeholder="Delivery Instructions (Optional) e.g., leave at front door, ring doorbell"
              value={deliveryInstructions}
              onChange={e => setDeliveryInstructions(e.target.value)}
              rows={2}
            />
            <input 
              type="text" 
              className="w-full p-4 border rounded-xl animate-pulse"
              placeholder="Fulfillment Agency (Simulated local delivery)"
              disabled
              value="FMN Simulated Logistics Service"
            />
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={handlePrevStep}>Back</Button>
            <Button onClick={handleNextStep}>Review Plan</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Review Your Gift Plan</h2>
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-4">
            <p><strong>Recipient:</strong> {person.name} ({person.relationship})</p>
            <p><strong>Occasion:</strong> {occasion.title} on {new Date(occasion.date).toLocaleDateString()}</p>
            <p><strong>Selected Gift:</strong> {gift.name} (₹{gift.price})</p>
            <p><strong>Message:</strong> "{message || '(None written)'}"</p>
            <p><strong>Delivery Address:</strong> {address.street}, {address.city}, {address.state} - {address.zip}</p>
            <p><strong>Status:</strong> Will be set to <span className="font-bold text-green-600">Scheduled</span></p>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={handlePrevStep}>Back</Button>
            <Button onClick={handleSchedulePlan}>Schedule Gift</Button>
          </div>
        </div>
      )}
    </div>
  );
};
