import { Product } from "@/interfaces/Product";
import { UpdateProduct } from "@/interfaces/UpdateProduct";
import axios from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const updateProduct = async (updateProduct: UpdateProduct) => {
  const session = await getSession();
  const { data } = await axios.post<Product>(
    "/product-management/products/edit",
    updateProduct,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  return data;
};

const useUpdateProduct = () => {
  return useMutation({
    mutationFn: updateProduct,
  });
};

export default useUpdateProduct;
