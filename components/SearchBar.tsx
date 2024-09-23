import {
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  function handleSearch() {
    if (search.trim() === "") return;

    setSearch("");

    return router.navigate(`/(search)/${search}`);
  }

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
      <View className="border-2 border-dominant rounded-xl overflow-hidden flex-row items-center justify-between">
        <TextInput
          className="text-xl p-2"
          placeholder="search username"
          value={search}
          onChangeText={setSearch}
        />

        <TouchableOpacity
          className="border-l-2 border-dominant p-2 h-full bg-dominant"
          onPress={handleSearch}
        >
          <Ionicons name="search-sharp" size={24} color={"#fff"} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
