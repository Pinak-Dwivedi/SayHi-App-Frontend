import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFriend } from "@/utils/apiCalls/user";

export default function useAddFriend() {
  const queryClient = useQueryClient();

  const addFriendMutation = useMutation({
    mutationFn: addFriend,

    onSuccess: async (data, variables) => {
      if (data?.success) {
        await queryClient.invalidateQueries({
          queryKey: ["users", variables?.userId, "friends"],
        });
      }
    },
  });

  return addFriendMutation;
}
