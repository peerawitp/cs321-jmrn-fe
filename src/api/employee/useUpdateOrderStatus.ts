import axios from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

import { UpdateOrderStatus } from "@/interfaces/UpdateOrderStatus";

const updateOrderStatus = async (updateOrderStatus: UpdateOrderStatus) => {
  const session = await getSession();
  const { data } = await axios.post<VerifySlip>(
    "/order-management/update-order-status",
    updateOrderStatus,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  return data;
};

const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: updateOrderStatus,
  });
};

export default useUpdateOrderStatus;
