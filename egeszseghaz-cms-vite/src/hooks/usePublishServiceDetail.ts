/* eslint-disable prettier/prettier */
import { publishServiceDetail } from "@/lib/publish";
import { useMutation } from "@tanstack/react-query";

export function usePublishServiceDetail() {
  return useMutation<void, unknown, any>({
    mutationKey: ["publish-service-detail"],
    mutationFn: async (publishedContent: any) => {
      await publishServiceDetail(publishedContent);
    },
    onError: (err) => {
      console.error("Error publishing serviceDetail:", err);
    },
  });
}
