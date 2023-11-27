import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64"> {/* Margin left to account for the fixed sidebar */}
                    <main className="p-4 pt-16"> {/* Padding top to account for the fixed navbar */}
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
