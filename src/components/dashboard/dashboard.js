import Navbar from './navbar';
import Sidebar from './sidebar';
import MainContent from './mainContent';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'

export default function Dashboard() {
    const [modules, setModules] = useState([]);
    const [selectedContent, setSelectedContent] = useState(null); 
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if the token is present in cookies
        const token = Cookies.get('token');
    
        // If there is no token, redirect to the login page
        if (!token) {
          router.push('/login');
        }
      }, [router]);

      // Function to update modules from Sidebar
    const updateModules = (newModules) => {
      setModules(newModules);
  };

  // New function to update selected content
  const handleSubmoduleSelect = (submoduleContent) => {
    setSelectedContent(submoduleContent);
};

const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
};
      
  return (
    <div className="flex flex-col h-screen">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-grow overflow-hidden bg-gray-100">
        <Sidebar isOpen={isSidebarOpen} onModulesChange={updateModules}  onSubmoduleSelect={handleSubmoduleSelect} />
        <MainContent content={selectedContent} />
      </div>
    </div>
  );
}
