"use client";

import { useState } from "react";
import InputField from "../components/InputField"; // นำเข้า component ที่สร้างขึ้นใหม่
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import LoginSchema from "@/interfaces/LoginSchema";
import { useRouter } from "next/navigation";
import RegisterSchema from "@/interfaces/RegisterSchema";
import useRegister from "@/api/user/useRegister";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
  firstName: z.string().regex(/^[a-zA-Z]+$/),
  lastName: z.string().regex(/^[a-zA-Z]+$/),
  phone: z.string().min(10).max(10),
});

const AuthPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    resetField,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const {
    register: registerReg,
    handleSubmit: handleSubmitReg,
    formState: { errors: errorReg, isSubmitting: isSubmittingReg },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const [isRegister, setIsRegister] = useState(false);

  const registerMutation = useRegister();

  const router = useRouter();

  const handleLogin = async (data: LoginSchema) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok === true) {
          router.replace("/");
        } else {
          alert("Invalid email or password");
          resetField("password");
        }
      })
      .catch((error) => {
        alert("Server error! Please try again later. " + error);
      });
  };

  const handleRegister = async (data: RegisterSchema) => {
    await registerMutation.mutateAsync(data);
    await handleLogin(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-600">
          {isRegister ? "Register" : "Login"}
        </h1>

        {isRegister && (
          <form onSubmit={handleSubmitReg(handleRegister)}>
            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="Email address"
              register={registerReg}
              required
            />
            {errorReg.email && (
              <p className="mb-4 text-red-500 text-sm">
                {errorReg.email?.message}
              </p>
            )}
            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              register={registerReg}
              required
            />
            {errorReg.password && (
              <p className="mb-4 text-red-500 text-sm">
                {errorReg.password?.message}
              </p>
            )}
            <InputField
              id="firstName"
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              register={registerReg}
              required
            />
            {errorReg.firstName && (
              <p className="mb-4 text-red-500 text-sm">
                {errorReg.firstName?.message}
              </p>
            )}
            <InputField
              id="lastName"
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              register={registerReg}
              required
            />
            {errorReg.lastName && (
              <p className="mb-4 text-red-500 text-sm">
                {errorReg.lastName?.message}
              </p>
            )}
            <InputField
              id="phone"
              label="Phone Number"
              type="text"
              placeholder="e.g. 0812345678"
              register={registerReg}
              required
            />
            {errorReg.phone && (
              <p className="mb-4 text-red-500 text-sm">
                {errorReg.phone?.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isSubmittingReg}
            >
              Register
            </button>
          </form>
        )}

        {!isRegister && (
          <form onSubmit={handleSubmit(handleLogin)}>
            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="Email address"
              register={register}
              required
            />
            {errors.email && (
              <p className="mb-4 text-red-500 text-sm">
                {errors.email?.message}
              </p>
            )}

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              register={register}
              required
            />

            {errors.password && (
              <p className="mb-4 text-red-500 text-sm">
                {errors.password?.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isSubmitting}
            >
              Login
            </button>
          </form>
        )}

        <p className="mt-4 text-sm text-center text-gray-600">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button
            className="text-blue-600 hover:underline ml-2"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
