import { useQuery } from "@tanstack/react-query";
import { fetchComponents } from "../services/api";

export const useComponentsQuery = () => {
  return useQuery({
    queryKey: ["components"],
    queryFn: fetchComponents
  });
};
