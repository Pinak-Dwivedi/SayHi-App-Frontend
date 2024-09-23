import { TouchableOpacity, TextInput, View } from "react-native";
import Text from "@/components/Text";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SEND_MESSAGE, TYPING_START, TYPING_STOP } from "@/utils/socketEvents";
import { Socket } from "socket.io-client";

export default function MessageBar({
  username,
  socket,
}: {
  username: string;
  socket: Socket | null;
}) {
  const [content, setContent] = useState("");
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isFriendTyping, setIsFriendTyping] = useState(false);

  useEffect(() => {
    if (!socket?.connected) return;

    function onFriendTyping() {
      // console.log("friend typing start");
      setIsFriendTyping(true);
    }

    function onFriendStoppedTyping() {
      // console.log("friend typing stop");
      setIsFriendTyping(false);
    }

    socket.on(TYPING_START, onFriendTyping);
    socket.on(TYPING_STOP, onFriendStoppedTyping);

    return () => {
      socket.off(TYPING_START, onFriendTyping);
      socket.off(TYPING_STOP, onFriendStoppedTyping);
    };
  }, [socket, socket?.connected]);

  function handleSendMessage() {
    if (!socket?.connected) return;

    if (content?.trim() === "") return;

    setIsLoading(true);

    socket.emit(
      SEND_MESSAGE,
      {
        senderUsername: user?.username,
        receiverUsername: username,
        content,
      },
      () => {
        setContent("");
        setIsLoading(false);
      }
    );
  }

  function handleTypingStart() {
    if (!socket?.connected) return;

    socket.emit(TYPING_START, { receiverUsername: username });
  }

  function handleTypingStop() {
    if (!socket?.connected) return;

    socket.emit(TYPING_STOP, { receiverUsername: username });
  }

  return (
    <>
      {isFriendTyping && (
        <Text className="text-lg font-bold text-dominant">Typing ......</Text>
      )}
      <View className="border-2 border-dominant rounded-xl overflow-hidden flex-row items-center justify-between">
        <TextInput
          className="text-xl p-2"
          placeholder="type your message..."
          value={content}
          onFocus={handleTypingStart}
          onBlur={handleTypingStop}
          onChangeText={(text) => setContent(text)}
        />

        <TouchableOpacity
          className="border-l-2 border-l-dominant p-2 h-full bg-dominant"
          disabled={isLoading}
          onPress={handleSendMessage}
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
}
