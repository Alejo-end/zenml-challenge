import { useQuery } from "@tanstack/react-query";
import { fetchRoot } from "../services/api";

export const useRootQuery = () => {
    return useQuery({
        queryKey: ["root"],
        queryFn: fetchRoot
    });
};
