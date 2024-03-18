import Header from "@/components/Header";
import { Stack } from "expo-router";

export default function PublicLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "LOGIN",
        }}
      />

      <Stack.Screen
        name="signup"
        options={{
          title: "SIGNUP",
        }}
      />
    </Stack>
  );
}
