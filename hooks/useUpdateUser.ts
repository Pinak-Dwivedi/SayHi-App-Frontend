import { useMutation } from "@tanstack/react-query";
import { update } from "@/utils/apiCalls/user";
import { useQueryClient } from "@tanstack/react-query";
import { Platform, ToastAndroid } from "react-native";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: update,
    onSuccess: async (data) => {
      if (Platform.OS === "android")
        ToastAndroid.show(data?.message, ToastAndroid.SHORT);

      if (data?.success) {
        await queryClient.invalidateQueries({ queryKey: ["auth"] });
      }
    },
  });

  return updateUserMutation;
}
