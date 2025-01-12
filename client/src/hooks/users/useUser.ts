import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "@/service/https";
import { GET_ALL_USERS, GET_PROFILE_USER, LOGOUT_USER } from "@/service/urls";

export const useDetailUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.get(GET_PROFILE_USER),
    retry: false,
  });

  const user = data?.data || {};

  return { user, isLoading };
};
export const useAllUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get(GET_ALL_USERS),
    retry: false,
  });

  const users = data?.data?.user;

  return { users, isLoading };
};

export const useLogOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: logOut, isPending } = useMutation({
    mutationFn: () => api.post(LOGOUT_USER),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/join", { replace: true });
    },
  });

  return { logOut, isPending };
};
