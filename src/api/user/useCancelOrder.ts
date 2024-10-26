import axios from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const cancelOrder = async (cancelOrder: CancelOrder) => {
  const session = await getSession();
  const { data } = await axios.post<CancelOrder>("/order/cancel", cancelOrder, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return data;
};

const useCancelOrder = () => {
  return useMutation({
    mutationFn: cancelOrder,
  });
};

export default useCancelOrder;
