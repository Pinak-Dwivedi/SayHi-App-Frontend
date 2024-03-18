import Text from "@/components/Text";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useLogout from "@/hooks/useLogout";

export default function LogoutButton() {
  const { token } = useSelector((state: RootState) => state.auth);
  const { mutate } = useLogout();

  async function handleLogout() {
    mutate(token);
  }

  return (
    <Pressable onPress={handleLogout}>
      <Text className="text-compliment text-lg font-medium">LogOut</Text>
    </Pressable>
  );
}
