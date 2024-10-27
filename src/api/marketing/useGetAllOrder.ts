import { MarketingOrder, Order } from "@/interfaces/Order";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const getAllOrder = async () => {
  const session = await getSession();
  const { data } = await axiosInstance.get<MarketingOrder[]>(
    "/order-management/get-all-order",
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  return data;
};

const useGetAllOrder = () => {
  return useQuery<MarketingOrder[]>({
    queryKey: ["getAllOrder"],
    queryFn: getAllOrder,
  });
};

export default useGetAllOrder;
