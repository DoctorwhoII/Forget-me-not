export const ErrorPage = ({ message, onRetry }: { message: string, onRetry?: () => void }) => (
    <div className="max-w-md mx-auto py-20 px-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="text-gray-600">{message}</p>
        {onRetry && (
            <button onClick={onRetry} className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold">Try Again</button>
        )}
    </div>
);
