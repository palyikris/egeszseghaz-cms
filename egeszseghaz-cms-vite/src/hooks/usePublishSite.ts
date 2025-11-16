/* eslint-disable prettier/prettier */
import { publishDraft } from "@/lib/publish";
import { useMutation } from "@tanstack/react-query"

export function usePublishSite() {


  return useMutation({
    mutationKey: ["publish-site"],
    mutationFn: async (pageId: string, publishedContent: any) => {
      console.log("usePublishSite mutationFn called with:", pageId, publishedContent)
      await publishDraft(pageId, publishedContent)
    },
    onError: (error) => {
      console.error("Error publishing site:", error)
    },
  })
}
