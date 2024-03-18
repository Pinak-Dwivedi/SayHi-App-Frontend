import { RootState } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/utils/apiCalls/message";
import { useSelector } from "react-redux";

export default function useGetMessages(receiverUsername: string) {
  const { token } = useSelector((state: RootState) => state.auth);

  const getMessagesQuery = useQuery({
    queryKey: ["messages", { receiverUsername }],
    queryFn: async () => getMessages(receiverUsername, token),
  });

  return getMessagesQuery;
}
