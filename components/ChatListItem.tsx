import { View } from "react-native";
import Text from "@/components/Text";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Message from "@/types/Message";

export default function ChatListItem({ item }: { item: Message }) {
  const { user } = useSelector((state: RootState) => state.auth);

  const isThisUser = item?.sender === user?.id;

  return (
    <View
      className={`p-2 rounded-lg ${
        isThisUser ? "self-end bg-dominant" : "self-start bg-purple-800"
      }`}
    >
      <Text className="text-xl text-slate-50 font-bold">{item?.content}</Text>
    </View>
  );
}
