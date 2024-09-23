import { createSlice } from "@reduxjs/toolkit";

export type FriendType = {
  id: string;
  username: string;
  profileImage?: string;
};

type FriendsState = {
  friends: FriendType[];
};

const initialState: FriendsState = {
  friends: [],
};

const FriendsSlice = createSlice({
  name: "friends",

  initialState: initialState,

  reducers: {
    setFriends(state, action) {
      state.friends = action?.payload?.friends;
    },
  },
});

export default FriendsSlice.reducer;
export const { setFriends } = FriendsSlice.actions;
