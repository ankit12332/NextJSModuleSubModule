export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-700 text-white p-4 fixed h-full">
            <ul className="space-y-2 pt-12">
                <li><a href="#" className="block p-2 hover:bg-gray-600 rounded">Dashboard</a></li>
                <li><a href="#" className="block p-2 hover:bg-gray-600 rounded">Settings</a></li>
                <li><a href="#" className="block p-2 hover:bg-gray-600 rounded">Reports</a></li>
                <li><a href="#" className="block p-2 hover:bg-gray-600 rounded">Analytics</a></li>
                <li><a href="#" className="block p-2 hover:bg-gray-600 rounded">Support</a></li>
                {/* Add more sidebar links here */}
            </ul>
        </aside>
    );
}
