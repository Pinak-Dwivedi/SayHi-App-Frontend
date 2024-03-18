import { Image, View } from "react-native";
import Text from "@/components/Text";
import { FontAwesome } from "@expo/vector-icons";
import FriendsList from "@/components/FriendsList";
import { Link } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useGetFriends from "@/hooks/useGetFriends";
import Loader from "@/components/Loader";

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);

  const { isLoading, isError, error, data } = useGetFriends();

  return (
    <View className="flex-1 p-2 bg-compliment">
      <View className="flex-1 max-w-3xl w-[95%] mx-auto">
        <View
          className="border-2 border-slate-300 rounded-2xl bg-compliment self-center p-4 items-center mb-6"
          style={{
            rowGap: 6,
          }}
        >
          {user?.profileImage != null ? (
            <Image
              className="w-28 h-28 rounded-full"
              source={{
                uri: user?.profileImage,
              }}
            />
          ) : (
            <FontAwesome name="user-circle" size={75} color="black" />
          )}

          <Text className="text-xl font-bold">{user?.username || "Dummy"}</Text>
          <Text className="text-xl font-bold">
            {user?.email || "dummy@email.com"}
          </Text>

          <Link href={"./editProfile"} className="absolute right-2 top-2">
            <Entypo name="edit" size={24} color="#00BDFF" />
          </Link>
        </View>

        {/* friends list */}

        <Text className="text-2xl font-bold mb-3">People you know</Text>

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
