import Header from "@/components/Header";
import LogoutButton from "@/components/LogoutButton";
import { Stack } from "expo-router";
import { View } from "react-native";
import Text from "@/components/Text";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          header: () => (
            <Header>
              <View className="flex-row justify-between items-center flex-grow">
                <Text className="text-3xl text-compliment">Profile</Text>
                <LogoutButton />
              </View>
            </Header>
          ),
        }}
      />

      <Stack.Screen
        name="editProfile"
        options={{
          title: "Edit Profile",
          header: () => <Header title="Edit Profile" />,
        }}
      />
    </Stack>
  );
}
