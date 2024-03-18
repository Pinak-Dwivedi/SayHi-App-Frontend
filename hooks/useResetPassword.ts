import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/utils/apiCalls/user";
import { Platform, ToastAndroid } from "react-native";

export default function useResetPassword() {
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: async (data) => {
      if (data?.success) {
        if (Platform.OS === "android")
          ToastAndroid.show(data?.message, ToastAndroid.SHORT);
      }
    },
  });

  return resetPasswordMutation;
}
