import { useQuery } from "@tanstack/react-query";
import { fetchStacks } from "../services/api";

export const useStacksQuery = () => {
    return useQuery({
        queryKey: ["stacks"],
        queryFn: fetchStacks
    });
};
