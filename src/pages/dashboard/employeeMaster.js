import React, { useState } from 'react';
import axios from 'axios';

function EmployeeMaster() {
  const [employee, setEmployee] = useState({ name: '', username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let errors = {};
    if (!employee.name) errors.name = 'Name is required';
    if (!employee.username) errors.username = 'Username is required';
    if (!employee.password) errors.password = 'Password is required';
    return errors;
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await axios.post('https://localhost:7196/api/User', employee);
        console.log(response.data);
        // Handle success (e.g., showing a success message, clearing the form, etc.)
      } catch (error) {
        console.error('There was an error!', error);
        // Handle error (e.g., showing an error message)
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className=" mx-auto p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 select-none">Employee Master</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 select-none" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className={`shadow appearance-none border ${errors.name ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 select-none" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={employee.username}
            onChange={handleChange}
            className={`shadow appearance-none border ${errors.username ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2 select-none" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={employee.password}
            onChange={handleChange}
            className={`shadow appearance-none border ${errors.password ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline select-none"
          >
            {isSubmitting ? 'Creating...' : 'Create Employee'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeMaster;
