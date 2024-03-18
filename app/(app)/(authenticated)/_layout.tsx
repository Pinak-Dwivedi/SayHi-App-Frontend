import { Tabs } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function AuthenticatedLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#8B00FF",
        tabBarLabelStyle: {
          fontSize: 16,
        },
        headerShown: false,
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
