"use client";

import { useState } from 'react';
import InputField from '../components/InputField'; // นำเข้า component ที่สร้างขึ้นใหม่

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-600">
          {isRegister ? 'Register' : 'Login'}
        </h1>

        <form>
          {/* หากเป็นการลงทะเบียน จะเพิ่มฟิลด์ First Name และ Last Name */}
          {isRegister && (
            <>
              <InputField
                id="first-name"
                label="First Name"
                type="text"
                placeholder="Enter your first name"
              />
              <InputField
                id="last-name"
                label="Last Name"
                type="text"
                placeholder="Enter your last name"
              />
            </>
          )}

          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Email address"
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
          />

          {isRegister && (
            <InputField
              id="phone"
              label="Phone Number"
              type="text"
              placeholder="e.g. 08012345678"
            />
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              alert('Form submitted');
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
