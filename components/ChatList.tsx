import { ScrollView, View } from "react-native";
import ChatListItem from "./ChatListItem";
import { useLayoutEffect, useRef } from "react";
import Message from "@/types/Message";

type ChatListPropsType = {
  messages: Message[] | [];
};

export default function ChatList({ messages }: ChatListPropsType) {
  const listRef = useRef<any>();

  useLayoutEffect(() => {
    const timeoutId = setTimeout(() => {
      listRef.current.scrollToEnd({ animated: true });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [messages]);

  return (
    <View className="flex-1">
      <ScrollView ref={listRef}>
        <View
          style={{
            rowGap: 15,
          }}
        >
          {messages?.map((item) => (
            <ChatListItem key={item?.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
