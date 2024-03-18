import ApiResponse from "@/types/ApiResponse";
import fetcher from "../fetcher";
import Token from "@/types/Token";
import User from "@/types/User";

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

type LoginParams = {
  username: string;
  password: string;
  token: Token;
};

type LoginWithGoogleParams = {
  googleId: string;
  username: string;
  email: string;
  profilePicture: string;
  token: Token;
};

type SignupParams = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  token: Token;
};

type UpdateParams = {
  userId: string;
  username: string;
  email: string;
  profileImage: string | null;
  token: Token;
};

interface UpdateResponse extends ApiResponse {
  user?: User;
  validationError?: any;
}

interface LoginSignupResponse extends ApiResponse {
  user?: User;
  token?: Token;
  validationError?: any;
}

type FogotPasswordParams = {
  email: string;
};

type VerifyForgotPasswordOTPParams = {
  email: string;
  otp: string;
};

type FogotResetVerifyOTPPasswordResponse = ApiResponse & {
  validationError?: any;
};

type ResetPasswordParams = {
  email: string;
  password: string;
  confirmPassword: string;
};

type AddFriendParams = {
  userId: string;
  friendUsername: string;
  token: Token;
};

type GetFriendsParams = {
  userId: string;
  token: Token;
};

type FindUsersParams = {
  search: string;
  token: Token;
};

// login

export async function login(
  userData: LoginParams
): Promise<LoginSignupResponse> {
  const { username, password, token } = userData;

  try {
    const result = await fetcher(
      `${SERVER_URL}/users/login`,
      "POST",
      JSON.stringify({ username, password }),
      token
    );

    return result;
  } catch (error) {
    throw error;
  }
}

// login with google

export async function loginWithGoogle(
  userData: LoginWithGoogleParams
): Promise<LoginSignupResponse> {
  const { googleId, username, email, profilePicture, token } = userData;

  try {
    const result = await fetcher(
      `${SERVER_URL}/users/loginWithGoogle`,
      "POST",
      JSON.stringify({ googleId, username, email, profilePicture }),
      token
    );

    return result;
  } catch (error) {
    throw error;
  }
}

// signup

export async function signup(
  userData: SignupParams
): Promise<LoginSignupResponse> {
  const { username, email, password, confirmPassword, token } = userData;

  try {
    const result = await fetcher(
      `${SERVER_URL}/users/register`,
      "POST",
      JSON.stringify({ username, email, password, confirmPassword }),
      token
    );

    return result;
  } catch (error) {
    throw error;
  }
}

// update

export async function update(userData: UpdateParams): Promise<UpdateResponse> {
  try {
    const { userId, username, email, profileImage, token } = userData;

    const result = await fetcher(
      `${SERVER_URL}/users/${userId}`,
      "PUT",
      JSON.stringify({
        username,
        email,
        profileImage,
      }),
      token
    );

    if (!result?.success) throw result;

    return result;
  } catch (error) {
    throw error;
  }
}

// forgot password

export async function forgotPassword(
  userData: FogotPasswordParams
): Promise<FogotResetVerifyOTPPasswordResponse> {
  const { email } = userData;

  try {
    const result = await fetcher(
      `${SERVER_URL}/users/forgotPassword`,
      "POST",
      JSON.stringify({
        email,
      }),
      null
    );

    // if (!result?.success) throw result;

    return result;
  } catch (error) {
    throw error;
  }
}

// verify OTP
export async function verifyForgotPasswordOTP(
  userData: VerifyForgotPasswordOTPParams
): Promise<FogotResetVerifyOTPPasswordResponse> {
  const { email, otp } = userData;

  try {
    const result = await fetcher(
      `${SERVER_URL}/users/verifyOTP`,
      "POST",
      JSON.stringify({
        email,
        otp,
      }),
      null
    );

    // if (!result?.success) throw result;

    return result;
  } catch (error) {
    throw error;
  }
}

// reset password

export async function resetPassword(
  userData: ResetPasswordParams
): Promise<FogotResetVerifyOTPPasswordResponse> {
  const { email, password, confirmPassword } = userData;

  try {
    const result = await fetcher(
      `${SERVER_URL}/users/resetPassword`,
      "PUT",
      JSON.stringify({
        email,
        password,
        confirmPassword,
      }),
      null
    );

    // if (!result?.success) throw result;

    return result;
  } catch (error) {
    throw error;
  }
}

// logout

export async function logout(
  token: Token
): Promise<ApiResponse & { token?: Token }> {
  try {
    const result = await fetcher(
      `${SERVER_URL}/users/logout`,
      "DELETE",
      undefined,
      token
    );

    return result;
  } catch (error) {
    throw error;
  }
}

// add friend

export async function addFriend(
  friendData: AddFriendParams
): Promise<ApiResponse> {
  try {
    const { userId, friendUsername, token } = friendData;

    const result = await fetcher(
      `${SERVER_URL}/users/${userId}/friends`,
      "PUT",
      JSON.stringify({
        friendUsername,
      }),
      token
    );

    if (!result?.success) throw result;

    return result;
  } catch (error) {
    throw error;
  }
}

// get friends

export async function getFriends(userData: GetFriendsParams): Promise<
  ApiResponse & {
    friends?: any[];
  }
> {
  try {
    const { userId, token } = userData;

    const result = await fetcher(
      `${SERVER_URL}/users/${userId}/friends`,
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

// find users

export async function findUsers(userData: FindUsersParams): Promise<
  ApiResponse & {
    users?: any[];
  }
> {
  try {
    const { search, token } = userData;

    const result = await fetcher(
      `${SERVER_URL}/users/?search=${search}`,
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
