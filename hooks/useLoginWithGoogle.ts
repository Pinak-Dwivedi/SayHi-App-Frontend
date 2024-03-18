import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { loginWithGoogle } from "@/utils/apiCalls/user";
import { Platform, ToastAndroid } from "react-native";

export default function useLoginWithGoogle() {
  const queryClient = useQueryClient();
  const { setItem } = useAsyncStorage("auth");

  const loginWithGoogleMutation = useMutation({
    mutationFn: loginWithGoogle,
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

  return loginWithGoogleMutation;
}
