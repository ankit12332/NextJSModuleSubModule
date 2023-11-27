import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Function to toggle the dropdown
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    // Function to close the dropdown
    const closeDropdown = () => setShowDropdown(false);

    // Event listener to detect outside clicks
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10">
            <div className="flex justify-between items-center container mx-auto">
                <Link href="/">
                    <div className="font-semibold text-xl">Dashboard</div>
                </Link>
                <div className="relative" ref={dropdownRef}>
                    <button onClick={toggleDropdown}>
                        {/* Replace with actual icon or image */}
                        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
