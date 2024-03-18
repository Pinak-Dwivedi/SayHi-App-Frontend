import { FlatList, View } from "react-native";
import FriendsListItem from "./FriendsListItem";

type FriendsListProps = {
  data?: any[];
};

export default function FriendsList({ data }: FriendsListProps) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <FriendsListItem item={item} />}
      ItemSeparatorComponent={() => <View className="h-4" />}
    />
  );
}
