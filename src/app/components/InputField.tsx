"use client";

import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, placeholder }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        id={id}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
