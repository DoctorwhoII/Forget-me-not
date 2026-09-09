export const TiersPage = () => (
    <div className="max-w-6xl mx-auto py-12 px-8">
        <h1 className="text-3xl font-bold mb-12 text-center">Choose your plan</h1>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="border rounded-3xl p-8 space-y-4">
                <h2 className="text-2xl font-bold">Free</h2>
                <p>3 People limit.</p>
                <button className="w-full bg-gray-200 p-3 rounded-full font-bold">Current</button>
            </div>
            <div className="border border-[var(--brand-color)] rounded-3xl p-8 space-y-4 shadow-lg">
                <h2 className="text-2xl font-bold">Plus</h2>
                <p>Unlimited people + Premium gifts.</p>
                <p className="text-2xl font-bold">5 BHD / month</p>
                <button className="w-full bg-[var(--brand-color)] text-white p-3 rounded-full font-bold">Upgrade</button>
            </div>
            <div className="border rounded-3xl p-8 space-y-4">
                <h2 className="text-2xl font-bold">Premium</h2>
                <p>All Plus features + Personal help.</p>
                <p className="text-2xl font-bold">15 BHD / month</p>
                <button className="w-full bg-gray-800 text-white p-3 rounded-full font-bold">Upgrade</button>
            </div>
        </div>
    </div>
);
