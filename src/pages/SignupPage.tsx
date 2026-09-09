import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signup(email, name);
        navigate('/dashboard');
    };

    return (
        <div className="max-w-md mx-auto py-12 px-8">
            <h1 className="text-3xl font-bold mb-8">Create your account</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full p-4 border rounded-xl" value={name} onChange={e => setName(e.target.value)} required />
                <input type="email" placeholder="Email" className="w-full p-4 border rounded-xl" value={email} onChange={e => setEmail(e.target.value)} required />
                <button type="submit" className="w-full bg-[var(--brand-color)] text-white p-4 rounded-full font-bold">Sign Up</button>
            </form>
        </div>
    );
};
