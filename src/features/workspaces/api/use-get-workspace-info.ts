import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface UseGetWorkspaceInfoProps {
  workspaceId: string;
}

export const useGetWorkspaceInfo = ({
  workspaceId,
}: UseGetWorkspaceInfoProps) => {
  const query = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"]["info"].$get(
        {
          param: { workspaceId },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to get workspace info");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
