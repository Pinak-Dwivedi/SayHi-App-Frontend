import { useMutation } from "@tanstack/react-query";
import { logout } from "@/utils/apiCalls/user";
import { useQueryClient } from "@tanstack/react-query";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export default function useLogout() {
  const queryClient = useQueryClient();
  const { removeItem } = useAsyncStorage("auth");

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async (data) => {
      await removeItem();

      // await auth().signOut(); useAuth is handling firebase signOut

      await queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  return logoutMutation;
}
