import { useMutation } from "@tanstack/react-query";
import { signup } from "@/utils/apiCalls/user";
import { useQueryClient } from "@tanstack/react-query";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Platform, ToastAndroid } from "react-native";

export default function useSignup() {
  const queryClient = useQueryClient();
  const { setItem } = useAsyncStorage("auth");

  const loginMutation = useMutation({
    mutationFn: signup,
    onSuccess: async (data) => {
      if (Platform.OS === "android")
        ToastAndroid.show(data?.message, ToastAndroid.SHORT);

      if (data?.success) {
        await setItem(
          JSON.stringify({
            token: data?.token,
            user: data?.user,
          })
        );

        await queryClient.invalidateQueries({ queryKey: ["auth"] });
      }
    },
  });

  return loginMutation;
}
