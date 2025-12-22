/* eslint-disable prettier/prettier */
import { publishService } from "@/lib/publish";
import { useMutation } from "@tanstack/react-query";

type PublishVariables = {
  id: string;
  publishedContent: any;
};

export function usePublishService() {
  return useMutation<void, unknown, PublishVariables>({
    mutationKey: ["publish-service"],
    mutationFn: async ({ id, publishedContent }: PublishVariables) => {
      console.log("Publishing service with ID:", publishedContent);
      await publishService(id, publishedContent);
    },
    onError: (error) => {
      console.error("Error publishing service:", error);
    },
  });
}
