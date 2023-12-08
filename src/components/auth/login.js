import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import ApiConfig from '../../_configFile/apiConfig';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(ApiConfig.AUTH_LOGIN, {
        username,
        password
      });
      //console.log(response);

      if (response.status === 200) {
        // Assuming the token is in response.data.token (adjust as per your API response structure)
        const token = response.data.token;
        const name = response.data.name;
        // Store the token in a cookie
        Cookies.set('token', token, { expires: 7 }); // Set the cookie to expire in 7 days
        Cookies.set('name', name);
        Cookies.set('userId', response.data.userId);
         
        // Redirect to dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      // Handle errors here, such as displaying login failure messages
      console.error('Login error', error);
    }
  };

  //overflow hidden
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Welcome Back</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="border-b border-gray-300 py-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none" 
                placeholder="Enter your username"
                aria-label="Username"
                required
              />
            </div>
            <div className="border-b border-gray-300 py-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none" 
                placeholder="Enter your password"
                aria-label="Password"
                required
              />
            </div>
            <button type="submit" className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log in</button>
          </form>
        </div>
      </motion.div>
  );
}
