import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email);
        navigate('/dashboard');
    };

    return (
        <div className="max-w-md mx-auto py-12 px-8">
            <h1 className="text-3xl font-bold mb-8">Sign In</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" placeholder="Email" className="w-full p-4 border rounded-xl" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="w-full p-4 border rounded-xl" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit" className="w-full bg-blue-500 text-white p-4 rounded-full font-bold">Sign In</button>
            </form>
        </div>
    );
};
