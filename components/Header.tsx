import { ReactNode } from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "@/components/Text";
import { useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

type PropsType = {
  title?: string;
  children?: ReactNode;
};

export default function Header({ title, children }: PropsType) {
  const navigation = useNavigation();

  return (
    <View className="pb-6 pt-9 px-4 border-2 border-dominant rounded-b-3xl bg-dominant">
      <StatusBar style="light" />

      <View className="flex-row items-center gap-x-3">
        {navigation.canGoBack() ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
        ) : null}

        {children != null ? (
          children
        ) : title != null ? (
          <Text className="text-3xl text-compliment">{title}</Text>
        ) : (
          <Text className="text-4xl text-compliment font-roboto">SayHi</Text>
        )}
      </View>
    </View>
  );
}
