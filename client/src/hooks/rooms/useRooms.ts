import api from "@/service/https";
import { CREATE_ROOMS, GET_ROOMS } from "@/service/urls";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllRooms = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => api.get(GET_ROOMS),
    retry: false,
  });

  const rooms = data?.data?.rooms;

  return { rooms, isLoading };
};

export const useCreateRoom = () => {
  const { mutateAsync: createRoom, isPending } = useMutation({
    mutationFn: (values: { userId1: string; userId2: string }) =>
      api.post(CREATE_ROOMS, values),
  });

  return { createRoom, isPending };
};
