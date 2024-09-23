import { View, Pressable, Image, TouchableOpacity } from "react-native";
import Text from "@/components/Text";
import { FontAwesome } from "@expo/vector-icons";
import { router, useSegments } from "expo-router";
import useAddFriend from "@/hooks/useAddFriend";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useMemo } from "react";

type FriendsListItemProps = {
  item: {
    id: string;
    username: string;
    profileImage?: string;
  };
};

export default function FriendsListItem({ item }: FriendsListItemProps) {
  const segments = useSegments();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { friends } = useSelector((state: RootState) => state.friends);
  const { mutate, data, isPending } = useAddFriend();

  function handleAddFriend() {
    mutate({
      userId: user?.id!,
      friendUsername: item?.username,
      token,
    });
  }

  useEffect(() => {
    if (data?.success) {
      router.back();
    }
  }, [data]);

  const isSearchPage = segments.includes("(search)" as never);
  const isAlreadyFriend = useMemo(
    () => friends.some((friend) => friend.username === item.username),
    [item]
  );

  const content = (
    <View
      className={`border-2 border-slate-300 shadow-md px-3 py-6 rounded-xl flex-row items-center bg-compliment ${
        isSearchPage && "justify-between"
      }`}
      style={{ columnGap: 15 }}
    >
      {item?.profileImage != null ? (
        <Image
          className={`${isSearchPage ? "w-16 h-16" : "w-20 h-20"} rounded-full`}
          source={{
            uri: item?.profileImage,
          }}
        />
      ) : (
        <FontAwesome
          name="user-circle"
          size={isSearchPage ? 30 : 45}
          color="black"
        />
      )}

      <Text className="text-xl text-dominant font-bold">{item?.username}</Text>

      {isSearchPage && !isAlreadyFriend ? (
        <TouchableOpacity disabled={isPending} onPress={handleAddFriend}>
          <Text className="rounded-lg p-2 bg-dominant text-slate-50 text-lg">
            Add
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  return (
    <>
      {isSearchPage ? (
        content
      ) : (
        <Pressable onPress={() => router.navigate(`/(chat)/${item?.username}`)}>
          {content}
        </Pressable>
      )}
    </>
  );
}
