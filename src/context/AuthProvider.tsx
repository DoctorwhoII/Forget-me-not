import { useState } from 'react';
import type { ReactNode } from 'react';
import { persistenceService } from '../services/persistence';
import { AuthContext } from './AuthContext';
import type { User } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(persistenceService.getUser() ? {
        id: persistenceService.getUser()!.id,
        email: persistenceService.getUser()!.email,
        name: persistenceService.getUser()!.name
    } : null);

    const login = (email: string) => {
        // Simple mock authentication
        const newUser: User = { id: 'user-1', email, name: 'User' };
        persistenceService.saveUser({ ...persistenceService.getUser()!, id: newUser.id, email, name: newUser.name, onboardingCompleted: true, favoriteGiftIds: [] });
        setUser(newUser);
    };

    const signup = (email: string, name: string) => {
        // Simple mock signup
        const newUser: User = { id: 'user-' + Date.now(), email, name };
        persistenceService.saveUser({ ...persistenceService.getUser()!, id: newUser.id, email, name, onboardingCompleted: true, favoriteGiftIds: [] });
        setUser(newUser);
    };

    const logout = () => {
        setUser(null);
        persistenceService.saveUser({ ...persistenceService.getUser()!, id: '', email: '', name: '', onboardingCompleted: false, favoriteGiftIds: [] });
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
