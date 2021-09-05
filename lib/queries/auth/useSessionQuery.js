import axios from "axios";
import { useQuery } from "react-query";

export const SESSION_QUERY_KEY = "session";

export function useSessionQuery() {
  return useQuery(SESSION_QUERY_KEY, () =>
    axios
      .get("/api/session")
      .then((res) => res.data)
      .catch(() => null)
  );
}
