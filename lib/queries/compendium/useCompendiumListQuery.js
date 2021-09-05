import axios from "axios";
import { useQuery } from "react-query";
const url = "https://www.dnd5eapi.co/api";

export function useCompendiumListQuery(category) {
  return useQuery(["compendium", category], () =>
    axios.get(`${url}/${category}`).then((res) => res.data)
  );
}
