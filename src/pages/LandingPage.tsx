import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  const handleStart = () => {
    if (user) {
        navigate('/dashboard');
    } else {
        navigate('/signup');
    }
  };

  return (
    <div className="py-16 text-center space-y-16">
      <section className="space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tighter">
          Forget Me Not
        </h1>
        <h2 className="text-2xl text-gray-600 font-light">
          Never miss the moments that matter.
        </h2>
        <div className="flex justify-center gap-4">
          <Button onClick={handleStart}>Start Remembering</Button>
        </div>
      </section>

      <section className="py-20 px-8 rounded-3xl mx-4 md:mx-16 bg-[var(--bg-color)] border border-gray-100">
        <h3 className="text-4xl font-bold mb-12">How it works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Manage People", desc: "Keep track of friends and family, their interests, and budgets." },
            { title: "Track Occasions", desc: "Never miss a birthday, anniversary, or milestone." },
            { title: "Plan Perfectly", desc: "Curated recommendations and scheduled deliveries." }
          ].map((item, i) => (
            <div key={i} className="space-y-4">
              <h4 className="font-bold text-lg">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
