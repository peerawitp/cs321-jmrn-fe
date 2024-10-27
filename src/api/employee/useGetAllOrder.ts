import { EmployeeOrder } from "@/interfaces/Order";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const getAllOrder = async () => {
  const session = await getSession();
  const { data } = await axiosInstance.get<EmployeeOrder[]>(
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
  return useQuery<EmployeeOrder[]>({
    queryKey: ["getAllOrder"],
    queryFn: getAllOrder,
  });
};

export default useGetAllOrder;
