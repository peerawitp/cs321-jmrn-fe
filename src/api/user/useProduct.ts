import { Product } from "@/interfaces/Product";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getProducts = async () => {
  const { data } = await axiosInstance.get<Product[]>("/product/get-all");

  return data;
};

const useProduct = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000,
  });
};

export default useProduct;
