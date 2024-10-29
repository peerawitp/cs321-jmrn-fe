import AddAddressSchema from "@/interfaces/AddAddressSchema";
import axios from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const addAddress = async (address: AddAddressSchema) => {
  const session = await getSession();
  const { data } = await axios.post<AddAddressSchema>(
    "/user/add-address",
    address,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  return data;
};

const useAddAddress = () => {
  return useMutation({
    mutationFn: addAddress,
  });
};

export default useAddAddress;
