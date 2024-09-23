import { useMutation } from "@tanstack/react-query";
import { logout } from "@/utils/apiCalls/user";
import { useQueryClient } from "@tanstack/react-query";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Platform, ToastAndroid } from "react-native";
import { useSocket } from "@/components/SocketProvider";

export default function useLogout() {
  const queryClient = useQueryClient();
  const { removeItem } = useAsyncStorage("auth");
  const { socket } = useSocket();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async (data) => {
      if (data?.success) {
        if (Platform.OS === "android")
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }

      await removeItem();
      socket?.disconnect();

      // await auth().signOut(); useAuth is handling firebase signOut

      await queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  return logoutMutation;
}
