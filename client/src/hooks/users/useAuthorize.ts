import { useDetailUser } from "./useUser";

export const useAuthorize = () => {
  const { isLoading, user } = useDetailUser();

  const { user: karbar } = user || {};
  let isAuthenticated = false;

  if (karbar) isAuthenticated = true;

  return { isAuthenticated, isLoading };
};
