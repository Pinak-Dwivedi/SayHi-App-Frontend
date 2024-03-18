import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/auth.slice";
import friendsReducer from "@/redux/slices/friends.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    friends: friendsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
