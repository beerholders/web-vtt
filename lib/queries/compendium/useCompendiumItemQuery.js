import axios from "axios";
import { useQuery } from "react-query";
const url = "https://www.dnd5eapi.co/api";

export function useCompendiumItemQuery(category, item) {
  return useQuery(
    ["compendium", category, item],
    () => axios.get(`${url}/${category}/${item}`).then((res) => res.data),
    { enabled: !!item }
  );
}
