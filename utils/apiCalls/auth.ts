import ApiResponse from "@/types/ApiResponse";
import Token from "@/types/Token";
import User from "@/types/User";

import fetcher from "../fetcher";
const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

interface GetAuthResponse extends ApiResponse {
  user: User;
  token: Token;
}

export async function getAuth(token: Token): Promise<GetAuthResponse> {
  try {
    // fake call
    // return new Promise((resolve) =>
    //   setTimeout(
    //     () =>
    //       resolve({
    //         success: true,
    //         token: "token",
    //         user: {
    //           username: "HULK",
    //         },
    //       }),
    //     1000
    //   )
    // );

    // actual call
    const result = await fetcher(
      `${SERVER_URL}/users/auth`,
      "GET",
      undefined,
      token
    );

    if (!result?.success) throw result;

    return result;
  } catch (error) {
    throw error;
  }
}
