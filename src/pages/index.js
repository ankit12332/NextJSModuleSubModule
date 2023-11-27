export default function Dashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Sample dashboard cards */}
                <div className="bg-white p-4 rounded shadow">
                    Card Content
                </div>
                <div className="bg-white p-4 rounded shadow">
                    Card Content
                </div>
                {/* Add more cards or content here */}
            </div>
        </div>
    );
}
