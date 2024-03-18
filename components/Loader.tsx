import { ActivityIndicator, SafeAreaView } from "react-native";

export default function Loader() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
}
