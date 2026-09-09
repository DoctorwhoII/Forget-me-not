import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/useAuth';

export const Layout = () => {
  const { notifications } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="py-4 px-4 md:py-6 md:px-8 flex flex-wrap justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-100">
        <Link to="/" className="text-xl md:text-2xl font-bold text-[var(--brand-color)] tracking-tight">Forget Me Not</Link>
        <nav className="flex items-center space-x-2 md:space-x-6 mt-2 md:mt-0 text-sm md:text-base">
          <ThemeSwitcher />
          {user && (
            <>
              <Link to="/dashboard" className="font-semibold text-gray-600 hover:text-[var(--brand-color)]">Dashboard</Link>
              <Link to="/history" className="font-semibold text-gray-600 hover:text-[var(--brand-color)]">History</Link>
              <Link to="/notifications" className="font-semibold text-gray-600 hover:text-[var(--brand-color)] flex items-center">
                Notifs
                {unreadCount > 0 && <span className="ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
              </Link>
              <Link to="/settings" className="font-semibold text-gray-600 hover:text-[var(--brand-color)]">Settings</Link>
              <Link to="/tiers" className="font-semibold text-gray-600 hover:text-[var(--brand-color)]">Upgrade</Link>
              <button onClick={handleLogout} className="font-semibold text-red-600 hover:text-red-800">Logout</button>
            </>
          )}
          {!user && <Link to="/login" className="font-semibold text-blue-600">Login</Link>}
        </nav>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="py-10 px-8 text-center text-gray-500 border-t border-gray-100">
        &copy; 2026 Forget Me Not.
        <p className="text-gray-400 text-xs mt-2">Made by: Anam</p>
      </footer>
      </div>
      );
};
