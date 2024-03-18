import { Stack } from "expo-router";
import Header from "@/components/Header";

export default function ConversationsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Conversations",
          header: () => <Header />,
        }}
      />

      <Stack.Screen
        name="(chat)/[username]"
        // options={{
        //   headerRight: () => (
        //     <FontAwesome name="user-circle" size={36} color="black" />
        //   ),
        // }}
      />

      <Stack.Screen
        name="(search)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
