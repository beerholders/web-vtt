import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { SESSION_QUERY_KEY } from "./useSessionQuery";

export function useSignupMutation(options) {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => axios.post("/api/signup", data).then((res) => res.data),
    {
      ...options,
      onSuccess: (data, ...args) => {
        queryClient.setQueryData(SESSION_QUERY_KEY, data);
        return options?.onSuccess?.(data, ...args);
      },
    }
  );
}
