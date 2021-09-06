import axios from "axios";
import { useQuery } from "react-query";

export const PLAYER_SHEET_QUERY_KEY = "player_sheet";

export function usePlayerSheetQuery(id) {
  return useQuery([PLAYER_SHEET_QUERY_KEY, id], () =>
    axios
      .get(`/api/sheets/${id}`)
      .then((res) => res.data)
      .catch(() => null)
  );
}
