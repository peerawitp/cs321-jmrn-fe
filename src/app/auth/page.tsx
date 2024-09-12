// auth.tsx
"use client";

import { useState } from 'react';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-600">
          {isRegister ? 'Register' : 'Login'}
        </h1>

        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email address"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
            />
          </div>
          
          {isRegister && (
            <div className="mb-4">
              <label htmlFor="Phone Number" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                id="Phone Number"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. 08012345678"
              />
            </div>
          )}

          <button 
          onClick={(e) => {
            e.preventDefault();
            alert('Form submitted nigga');
          }}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isRegister ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <button
            className="text-blue-600 hover:underline ml-2"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Login' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
