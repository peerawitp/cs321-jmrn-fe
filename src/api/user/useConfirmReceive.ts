import axios from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const confirmReceive = async (confirmReceive: ConfirmReceive) => {
  const session = await getSession();
  const { data } = await axios.post<ConfirmReceive>(
    "/order/confirm-receive",
    confirmReceive,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  return data;
};

const useConfirmReceive = () => {
  return useMutation({
    mutationFn: confirmReceive,
  });
};

export default useConfirmReceive;
