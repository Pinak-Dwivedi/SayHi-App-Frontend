import Header from "@/components/Header";
import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import Text from "@/components/Text";
import useFindUsers from "@/hooks/useFindUsers";
import FriendsList from "@/components/FriendsList";
import Loader from "@/components/Loader";

export default function SearchResults() {
  const { search } = useLocalSearchParams();
  const { isLoading, isError, error, data } = useFindUsers(search.toString());

  return (
    <View className="flex-1 p-2 bg-compliment">
      <Stack.Screen
        options={{
          // title: `Search results for ${search}`,
          header: () => (
            <Header>
              <Text className="text-2xl font-medium text-compliment">
                Search results for {search}
              </Text>
            </Header>
          ),
        }}
      />

      <View className="flex-1 max-w-3xl w-[95%] mx-auto" style={{ rowGap: 15 }}>
        {/* <Text className="text-3xl">Search Results for {search}</Text> */}

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Text className="text-2xl">{error?.message}</Text>
        ) : (
          <FriendsList data={data?.users} />
        )}
      </View>
    </View>
  );
}
