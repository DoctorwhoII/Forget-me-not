import { createContext } from 'react';

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string) => void;
    signup: (email: string, name: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
