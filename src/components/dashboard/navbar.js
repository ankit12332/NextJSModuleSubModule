import React, { useState, useEffect } from 'react';
import { FaUser, FaBars  } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Navbar({onToggleSidebar}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [timer, setTimer] = useState(600); // Timer set to 3 seconds
    const router = useRouter(); // Initialize the useRouter hook
    let inactivityTimer, countdownTimer;

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };

    useEffect(() => {
        // Retrieve the user's name from cookies when the component mounts
        const name = Cookies.get('name'); // Replace 'name' with the actual cookie name
        if (name) {
            setUserName(name); // Update the state with the retrieved name
        }
        // Function to reset the inactivity timer and timer countdown
        const resetInactivityTimer = () => {
          clearTimeout(inactivityTimer);
          clearInterval(countdownTimer);
          setTimer(600); // Reset timer to 3 seconds
          inactivityTimer = setTimeout(handleLogout, 600000); // 10 seconds of inactivity triggers logout
          countdownTimer = setInterval(() => setTimer(prev => prev - 1), 1000); // Update timer every second
      };

      // Event listeners for user activity
      window.addEventListener('mousemove', resetInactivityTimer);
      window.addEventListener('keypress', resetInactivityTimer);

      // Start the timers
      resetInactivityTimer();

      // Cleanup function
      return () => {
          clearTimeout(inactivityTimer);
          clearInterval(countdownTimer);
          window.removeEventListener('mousemove', resetInactivityTimer);
          window.removeEventListener('keypress', resetInactivityTimer);
      };
    }, []);

    // Function to clear all cookies
    const clearAllCookies = () => {
      const allCookies = Cookies.get();
      Object.keys(allCookies).forEach(cookie => Cookies.remove(cookie));
  };
    
    // Logout function
    const handleLogout = () => {
        // Clear the cookie
        clearAllCookies(); // Clear all cookies

        // Redirect to login page
        router.push('/login');
    };

    return (
          <nav className="bg-gray-800 text-white p-5">
            <div className="mx-auto flex justify-between items-center">
                <h1 className="text-lg font-semibold flex items-center ml-1"> {/* Added flex items-center */}
                    Siksha "O" Anusandhan
                    <span className='ml-12'>
                        <button onClick={onToggleSidebar} style={{ verticalAlign: 'middle' }}> {/* Added inline style for vertical alignment */}
                            <FaBars />
                        </button>
                    </span>
                </h1>
            <div className="flex items-center">
                {/* Timer Display */}
                <div className="mr-4">
                    {timer > 0 ? `Auto logout in ${Math.floor(timer / 60)} min ${('0' + timer % 60).slice(-2)} sec` : 'Logging out...'}
                </div>
                <div className="relative">
                    <button onClick={toggleDropdown} className="flex items-center">
                        <FaUser className="text-xl" />
                        <span className="ml-2 mr-1">{userName}</span>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</a>
                          <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </nav>
    );
  }
  