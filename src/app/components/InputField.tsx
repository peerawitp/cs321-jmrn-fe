"use client";

import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  register,
  required,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id, { required })}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
