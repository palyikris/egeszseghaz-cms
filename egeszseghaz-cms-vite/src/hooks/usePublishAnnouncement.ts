/* eslint-disable prettier/prettier */
import { publishAnnouncement } from "@/lib/publish";
import { useMutation } from "@tanstack/react-query";

type PublishVariables = {
  publishedContent: any;
};

export function usePublishAnnouncement() {

  return useMutation<void, unknown, PublishVariables>({
    mutationKey: ["publish-announcement"],
    // mutationFn receives a single `variables` argument. Pass an object when calling mutate/mutateAsync.
    mutationFn: async ({ publishedContent }: PublishVariables) => {
      await publishAnnouncement(publishedContent);
    },
    onError: (error) => {
      console.error("Error publishing announcement:", error);
    },
  });
}