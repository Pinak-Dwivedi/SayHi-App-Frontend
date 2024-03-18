import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/utils/apiCalls/user";

export default function useForgotPassword() {
  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    // onSuccess: async (data) => {
    // },
  });

  return forgotPasswordMutation;
}
