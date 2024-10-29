import { ProductSize } from "@/interfaces/Product";
import { UpdateProductSize } from "@/interfaces/UpdateProductSize";
import axios from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const updateProductSize = async (updateProductSize: UpdateProductSize) => {
  const session = await getSession();
  const { data } = await axios.post<ProductSize>(
    "/product-management/products/sizes/edit",
    updateProductSize,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  return data;
};

const useUpdateProductSize = () => {
  return useMutation({
    mutationFn: updateProductSize,
  });
};

export default useUpdateProductSize;
