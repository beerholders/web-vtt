import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { SESSION_QUERY_KEY } from "./useSessionQuery";

export function useLogoutMutation(options) {
  const queryClient = useQueryClient();
  return useMutation((data) => axios.get("/api/logout", data), {
    ...options,
    onSuccess: (...args) => {
      queryClient.setQueryData(SESSION_QUERY_KEY, null);
      return options?.onSuccess?.(...args);
    },
  });
}
