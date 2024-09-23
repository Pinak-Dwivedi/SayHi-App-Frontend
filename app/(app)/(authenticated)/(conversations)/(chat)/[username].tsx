import { Stack, useLocalSearchParams } from "expo-router";
import { Image, View } from "react-native";
import Text from "@/components/Text";
import MessageBar from "@/components/MessageBar";
import ChatList from "@/components/ChatList";
import Header from "@/components/Header";
import { FontAwesome } from "@expo/vector-icons";
import useGetMessages from "@/hooks/useGetMessages";
import Loader from "@/components/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { RECEIVE_MESSAGE } from "@/utils/socketEvents";
import Message from "@/types/Message";
import { useSocket } from "@/components/SocketProvider";

export default function Chat() {
  const { username } = useLocalSearchParams();
  const { isLoading, isError, error, data } = useGetMessages(
    username.toString()
  );
  const { friends } = useSelector((state: RootState) => state.friends);
  const [messages, setMessages] = useState<Message[] | []>([]);
  const { socket } = useSocket();

  const friend = friends?.find(
    (friend) => friend.username === username.toString()
  );

  useEffect(() => {
    if (data?.success) {
      setMessages(data?.messages!);
    }
  }, [data]);

  // events
  useEffect(() => {
    if (!socket?.connected) return;

    function onReceiveMessage(messageData: Message) {
      // console.log("receive message", messageData);

      setMessages((prevMessages) => {
        return [...prevMessages, messageData];
      });
    }

    socket.on(RECEIVE_MESSAGE, onReceiveMessage);

    return () => {
      socket.off(RECEIVE_MESSAGE, onReceiveMessage);
    };
  }, [socket, socket?.connected]);

  return (
    <View className="p-2 flex-grow bg-compliment">
      <Stack.Screen
        options={{
          header: () => (
            <Header>
              <View className="flex-row justify-between items-center flex-grow">
                <Text className="text-3xl font-medium text-compliment">
                  {username}
                </Text>

                {friend?.profileImage != null ? (
                  <Image
                    className="w-12 h-12 rounded-full"
                    source={{
                      uri: friend?.profileImage,
                    }}
                  />
                ) : (
                  <FontAwesome name="user-circle" size={39} color="white" />
                )}
              </View>
            </Header>
          ),
        }}
      />

      <View
        className="flex-grow max-w-3xl w-[95%] mx-auto justify-between"
        style={{
          rowGap: 5,
        }}
      >
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Text className="text-2xl">{error?.message}</Text>
        ) : (
          <ChatList messages={messages} />
        )}

        <MessageBar username={username.toString()} socket={socket} />
      </View>
    </View>
  );
}
