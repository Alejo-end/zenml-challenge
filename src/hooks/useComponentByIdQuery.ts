import { useQuery } from "@tanstack/react-query";
import { fetchComponentById } from "../services/api";

export const useComponentByIdQuery = (componentId: string) => {
  return useQuery(
    {
      queryKey: ["component", componentId],
      queryFn: () => fetchComponentById(componentId),
      enabled: !!componentId // Run only if componentId is provided
    }
  );
};
