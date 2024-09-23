import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFriend } from "@/utils/apiCalls/user";
import { Platform, ToastAndroid } from "react-native";

export default function useAddFriend() {
  const queryClient = useQueryClient();

  const addFriendMutation = useMutation({
    mutationFn: addFriend,

    onSuccess: async (data, variables) => {
      if (data?.success) {
        if (Platform.OS === "android") {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
        }

        await queryClient.invalidateQueries({
          queryKey: ["users", variables?.userId, "friends"],
        });
      }
    },
  });

  return addFriendMutation;
}
