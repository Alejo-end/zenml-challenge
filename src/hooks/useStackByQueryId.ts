import { useQuery } from "@tanstack/react-query";
import { fetchStackById } from "../services/api";

export const useStackByIdQuery = (stackId: string) => {
  return useQuery({
    queryKey: ["stack", stackId],
    queryFn: () => fetchStackById(stackId),
    enabled: !!stackId, // Run only if stackId is provided
  });
};
