import { Tabs, useSegments } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function AuthenticatedLayout() {
  const segments = useSegments();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#8B00FF",
        tabBarLabelStyle: {
          fontSize: 16,
        },
        headerShown: false,
        tabBarStyle: {
          display: segments[3] === "(chat)" ? "none" : "flex",
        },
      }}
    >
      <Tabs.Screen
        name="(conversations)"
        options={{
          title: "Conversations",
          tabBarIcon: ({ color }) => (
            <Entypo name="chat" size={21} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={21} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
