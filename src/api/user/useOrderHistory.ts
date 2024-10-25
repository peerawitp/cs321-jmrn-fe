import { Order } from "@/interfaces/Order";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const getOrderHistory = async () => {
  const session = await getSession();
  const { data } = await axiosInstance.get<Order[]>("/order/get-order", {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return data;
};

const useOrderHistory = () => {
  return useQuery<Order[]>({
    queryKey: ["orderHistory"],
    queryFn: getOrderHistory,
  });
};

export default useOrderHistory;
