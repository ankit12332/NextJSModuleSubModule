import React, { useState, useEffect } from 'react';
import TreeView from './treeView';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Sidebar({ onModulesChange, onSubmoduleSelect, isOpen  }) {
  const [modules, setModules] = useState([]);
  const [openModule, setOpenModule] = useState(null);

  useEffect(() => {
    // Fetch the modules from the API using Axios
    const fetchModules = async () => {
      const userId = Cookies.get('userId'); // Get userId from cookies
      if (!userId) {
        console.error("User ID is not found in the cookies.");
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7196/api/User/${userId}`);
        const transformedModules = transformData(response.data.roles);
        setModules(transformedModules);
        if (onModulesChange) {
          onModulesChange(transformedModules); // Pass modules to parent
        }
        console.log(transformedModules)
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, [onModulesChange]);

  const transformData = (roles) => {
    // Flatten the modules from all roles and transform the data
    let allModules = [];
    roles.forEach(role => {
      role.modules.forEach(module => {
        allModules.push({
          name: module.name,
          submodules: module.subModules.map(subModule => ({
            name: subModule.name
          }))
        });
      });
    });
    return allModules;
  };

  const handleModuleToggle = moduleName => {
    setOpenModule(openModule === moduleName ? null : moduleName);
  };

  return (
    <aside className={`w-64 bg-gray-700 h-screen aside ${isOpen ? 'aside-open' : 'aside-closed'}`}>
    <div className="p-4 text-white">
        {modules.map((module, index) => (
            <TreeView 
                key={index} 
                node={module} 
                onToggle={() => handleModuleToggle(module.name)}
                onSubmoduleSelect={onSubmoduleSelect} // Passing down the callback
            />
        ))}
    </div>
</aside>
  );
}
