import UserInfo from "@/interfaces/UserInfo";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const getInfo = async () => {
  const session = await getSession();
  const { data } = await axiosInstance.get<UserInfo>("/user/get-info", {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return data;
};

const useUserInfo = () => {
  return useQuery<UserInfo>({
    queryKey: ["user", "info"],
    queryFn: getInfo,
  });
};

export default useUserInfo;
