import RegisterSchema from "@/interfaces/RegisterSchema";
import User from "@/interfaces/User";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const register = async (newUser: RegisterSchema) => {
  const { data } = await axiosInstance.post<User>("/auth/register", newUser);

  return data;
};

const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: async (data) => {},
  });
};

export default useRegister;
