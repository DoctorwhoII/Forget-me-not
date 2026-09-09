import { useApp } from '../context/AppContext';
import { persistenceService } from '../services/persistence';

export const SettingsPage = () => {
    const { settings, refreshData } = useApp();

    const updateBudget = (min: number, max: number) => {
        // Mock update
        const newSettings = { ...settings, defaultBudget: { min, max } };
        persistenceService.updateSettings(newSettings); 
        refreshData();
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-8 space-y-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <h2 className="text-xl font-bold">Preferences</h2>
                <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">Default Budget (Min)</label>
                    <input type="number" className="w-full p-4 border rounded-xl" value={settings.defaultBudget.min} onChange={e => updateBudget(Number(e.target.value), settings.defaultBudget.max)} />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-500 mb-1">Default Budget (Max)</label>
                    <input type="number" className="w-full p-4 border rounded-xl" value={settings.defaultBudget.max} onChange={e => updateBudget(settings.defaultBudget.min, Number(e.target.value))} />
                </div>
            </section>
        </div>
    );
};
