import axios from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const uploadSlip = async (uploadSlip: UploadSlip) => {
  const session = await getSession();
  const { data } = await axios.post<UploadSlip>(
    "/order/upload-slip",
    uploadSlip,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  return data;
};

const useUploadSlip = () => {
  return useMutation({
    mutationFn: uploadSlip,
  });
};

export default useUploadSlip;
