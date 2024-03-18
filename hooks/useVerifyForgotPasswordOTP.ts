import { useMutation } from "@tanstack/react-query";
import { verifyForgotPasswordOTP } from "@/utils/apiCalls/user";
import { router } from "expo-router";
import { Platform, ToastAndroid } from "react-native";

export default function useVerifyForgotPasswordOTP() {
  const verifyForgotPasswordOTPMutation = useMutation({
    mutationFn: verifyForgotPasswordOTP,
    onSuccess: async (data, variables) => {
      if (data?.success) {
        router.push(`../resetpassword/${variables?.email}`);
      } else {
        if (Platform.OS === "android")
          ToastAndroid.show(data?.message, ToastAndroid.SHORT);
      }
    },
  });

  return verifyForgotPasswordOTPMutation;
}
