import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import {
  ADD_USER,
  CONNECT,
  CONNECT_ERROR,
  WELCOME,
} from "@/utils/socketEvents";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
});

export default function SocketProvider({ children }: { children: ReactNode }) {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    const socketConnection = io(process.env.EXPO_PUBLIC_SOCKET_SERVER_URL!, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSocket(socketConnection);

    function onConnect() {
      // console.log("on connect", socketConnection?.id);

      socketConnection?.emit(ADD_USER, user, () => {
        // console.log("user added");
      });
    }

    function onWelcome(message: string) {
      // console.log("welcome", message);
    }

    function onConnectError(error: any) {
      // console.log("connect error", error);
    }

    socketConnection.on(CONNECT, onConnect);
    socketConnection.on(WELCOME, onWelcome);
    socketConnection.on(CONNECT_ERROR, onConnectError);

    return () => {
      socketConnection.off(CONNECT, onConnect);
      socketConnection.off(WELCOME, onWelcome);
      socketConnection.off(CONNECT_ERROR, onConnectError);
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
