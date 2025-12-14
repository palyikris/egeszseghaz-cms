/* eslint-disable prettier/prettier */
import { publishNewService } from "@/lib/publish";
import { useMutation } from "@tanstack/react-query";

type PublishVariables = {
  publishedContent: any;
};

export function usePublishNewService() {

  return useMutation<void, unknown, PublishVariables>({
    mutationKey: ["publish-new-service"],
    // mutationFn receives a single `variables` argument. Pass an object when calling mutate/mutateAsync.
    mutationFn: async ({ publishedContent }: PublishVariables) => {
      await publishNewService(publishedContent);
    },
    onError: (error) => {
      console.error("Error publishing new service:", error);
    },
  });
}