import axios from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const confirmPurchase = async (createOrder: CreateOrder) => {
  const session = await getSession();
  const { data } = await axios.post<CreateOrder>(
    "/order/create-order",
    createOrder,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  return data;
};

const useConfirmPurchase = () => {
  return useMutation({
    mutationFn: confirmPurchase,
  });
};

export default useConfirmPurchase;
