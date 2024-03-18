import { createSlice } from "@reduxjs/toolkit";
import Token from "@/types/Token";
import User from "@/types/User";

type AuthState = {
  user: User;
  token: Token;
};

const initialState: AuthState = {
  user: null,
  token: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export default AuthSlice.reducer;
export const { setAuth } = AuthSlice.actions;
