import { View } from "react-native";
import SearchBar from "@/components/SearchBar";
import FriendsList from "@/components/FriendsList";
import useGetFriends from "@/hooks/useGetFriends";
import Loader from "@/components/Loader";
import Text from "@/components/Text";

export default function Home() {
  const { isLoading, isError, error, data } = useGetFriends();

  return (
    <View className="flex-1 p-2 bg-compliment">
      <View className="flex-1 max-w-3xl w-[95%] mx-auto" style={{ rowGap: 15 }}>
        <SearchBar />

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Text className="text-2xl">{error?.message}</Text>
        ) : (
          <FriendsList data={data?.friends} />
        )}
      </View>
    </View>
  );
}
