import { createSlice } from "@reduxjs/toolkit";

type FriendsState = {
  friends: any[];
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
