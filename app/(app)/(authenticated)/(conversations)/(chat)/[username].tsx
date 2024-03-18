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
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import {
  WELCOME,
  RECEIVE_MESSAGE,
  ADD_USER,
  CONNECT,
  CONNECT_ERROR,
} from "@/utils/socketEvents";
import Message from "@/types/Message";

export default function Chat() {
  const { username } = useLocalSearchParams();
  const { token, user } = useSelector((state: RootState) => state.auth);

  const userAddedRef = useRef<boolean>(false);

  const [socket] = useState<any>(() => {
    userAddedRef.current = false;

    return io(process.env.EXPO_PUBLIC_SOCKET_SERVER_URL!, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  });

  const { isLoading, isError, error, data } = useGetMessages(
    username.toString()
  );

  const { friends } = useSelector((state: RootState) => state.friends);
  const [messages, setMessages] = useState<Message[] | []>([]);

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

    // connect
    function onConnect() {
      // console.log("on connect", socket.id);
    }

    function onWelcome(message: string) {
      // console.log(message);
    }

    function onReceiveMessage(messageData: Message) {
      // console.log("receive message");
      // console.log(messageData);

      setMessages((prevMessages) => {
        return [...prevMessages, messageData];
      });
    }

    function onConnectError(error: any) {
      // console.log(error);
    }

    socket.on(CONNECT, onConnect);
    socket?.on(WELCOME, onWelcome);
    socket?.on(RECEIVE_MESSAGE, onReceiveMessage);
    socket?.on(CONNECT_ERROR, onConnectError);

    return () => {
      // remove listener on unmount
      socket?.off(CONNECT, onConnect);
      socket?.off(WELCOME, onWelcome);
      socket?.off(RECEIVE_MESSAGE, onReceiveMessage);
      socket?.off(CONNECT_ERROR, onConnectError);
    };
  }, [socket, messages]);

  // console.log(socket?.connected, userAddedRef.current);

  if (socket?.connected && !userAddedRef.current) {
    // console.log("add user");
    // add user in socket
    socket?.emit(ADD_USER, user, () => {
      userAddedRef.current = true;
    });
  }

  return (
    <View className="flex-1 p-2 bg-compliment">
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
        className="flex-1 max-w-3xl w-[95%] mx-auto justify-between"
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
