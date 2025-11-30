/* eslint-disable prettier/prettier */
import { uploadImageToFirebase, type ImageInfo } from "@/lib/media";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UploadVariables = {
  file: File;
};

export function useUploadImage() {
  const queryClient = useQueryClient();

  return useMutation<ImageInfo, Error, UploadVariables>({
    mutationFn: async ({ file }: UploadVariables) => {
      return await uploadImageToFirebase(file);
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
