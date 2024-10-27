import axios from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const verifySlip = async (verifySlip: VerifySlip) => {
  const session = await getSession();
  const { data } = await axios.post<VerifySlip>(
    "/order-management/verify-slip",
    verifySlip,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  return data;
};

const useVerifySlip = () => {
  return useMutation({
    mutationFn: verifySlip,
  });
};

export default useVerifySlip;
