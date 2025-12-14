/* eslint-disable prettier/prettier */
import { publishDraft } from "@/lib/publish";
import { useMutation } from "@tanstack/react-query";

type PublishVariables = {
  pageId: string;
  publishedContent: any;
};

export function usePublishSite() {

  return useMutation<void, unknown, PublishVariables>({
    mutationKey: ["publish-site"],
    // mutationFn receives a single `variables` argument. Pass an object when calling mutate/mutateAsync.
    mutationFn: async ({ pageId, publishedContent }: PublishVariables) => {
      await publishDraft(pageId, publishedContent);
    },
    onError: (error) => {
      console.error("Error publishing site:", error);
    },
  });
}
