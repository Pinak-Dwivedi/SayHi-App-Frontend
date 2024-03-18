import { addMessage } from "@/utils/apiCalls/message";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddMessage() {
  const queryClient = useQueryClient();

  const addMessageMutation = useMutation({
    mutationFn: addMessage,

    onSuccess: async (data, variables) => {
      if (data?.success) {
        await queryClient.invalidateQueries({
          queryKey: [
            "messages",
            { receiverUsername: variables?.receiverUsername },
          ],
        });
      }
    },
  });

  return addMessageMutation;
}
