import { useApp } from '../context/AppContext';

export const NotificationCenterPage = () => {
  const { notifications } = useApp();
  
  const markAsRead = (id: string) => {
    // In a real app, this would call a service to mark as read in storage.
    // For now, we can just update the local state or persist it.
    // Since we're regenerating notifications in persistence, 
    // we need a way to persist the 'read' state.
    // Let's keep it simple for now.
    console.log(`Marking ${id} as read`);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-8">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
      
      {notifications.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center">
            <p className="text-gray-500 text-lg">No new notifications.</p>
        </div>
      ) : (
        <div className="space-y-4">
            {notifications.map(notif => (
                <div key={notif.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
                    <p className={notif.read ? 'text-gray-500' : 'font-bold'}>{notif.message}</p>
                    {!notif.read && (
                        <button onClick={() => markAsRead(notif.id)} className="text-sm text-blue-600">Mark as read</button>
                    )}
                </div>
            ))}
        </div>
      )}
    </div>
  );
};
