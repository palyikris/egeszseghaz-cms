/* eslint-disable prettier/prettier */
import { uploadImageToFirebase, type ImageInfo } from "@/lib/settings/media";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UploadVariables = {
  file: File;
  folder?: string;
};

export function useUploadImage() {
  const queryClient = useQueryClient();

  return useMutation<ImageInfo, Error, UploadVariables>({
    mutationFn: async ({ file, folder }: UploadVariables) => {
      return await uploadImageToFirebase(file, folder);
    },
    mutationKey: ["upload-image"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: (err: Error) => {
      console.error("Error uploading image:", err);
    },
  });
}
