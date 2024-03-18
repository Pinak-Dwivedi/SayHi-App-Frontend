import fetcher from "../fetcher";
const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;
import Token from "@/types/Token";
import ApiResponse from "@/types/ApiResponse";
import Message from "@/types/Message";

type AddMessageParams = {
  content: string;
  receiverUsername: string;
  token: Token;
};

interface AddMessageResponse extends ApiResponse {
  validationError?: any;
}

interface GetMessagesResponse extends ApiResponse {
  messages?: Message[] | [];
}

export async function getMessages(
  receiverUsername: string,
  token: Token
): Promise<GetMessagesResponse> {
  const result = await fetcher(
    `${SERVER_URL}/messages?receiverUsername=${receiverUsername}`,
    "GET",
    undefined,
    token
  );

  if (!result.success) throw result;

  return result;
}

export async function addMessage(
  messageData: AddMessageParams
): Promise<AddMessageResponse> {
  const { content, receiverUsername, token } = messageData;

  const result = await fetcher(
    `${SERVER_URL}/messages`,
    "POST",
    JSON.stringify({
      content,
      receiverUsername,
    }),
    token
  );

  if (!result.success) throw result;

  return result;
}
