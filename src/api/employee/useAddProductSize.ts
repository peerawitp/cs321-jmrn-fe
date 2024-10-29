import { AddProductSize } from "@/interfaces/AddProductSize";
import { ProductSize } from "@/interfaces/Product";
import axios from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const addProductSize = async (addProductSize: AddProductSize) => {
  const session = await getSession();
  const { data } = await axios.post<ProductSize>(
    "/product-management/products/sizes/add",
    addProductSize,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  return data;
};

const useAddProductSize = () => {
  return useMutation({
    mutationFn: addProductSize,
  });
};

export default useAddProductSize;
