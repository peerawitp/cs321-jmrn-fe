import { AddProduct } from "@/interfaces/AddProduct";
import { Product } from "@/interfaces/Product";
import axios from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const addProduct = async (addProduct: AddProduct) => {
  const session = await getSession();
  const { data } = await axios.post<Product>(
    "/product-management/products/add",
    addProduct,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  return data;
};

const useAddProduct = () => {
  return useMutation({
    mutationFn: addProduct,
  });
};

export default useAddProduct;
