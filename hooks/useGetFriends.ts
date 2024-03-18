import { useQuery } from "@tanstack/react-query";
import { getFriends } from "@/utils/apiCalls/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { setFriends } from "@/redux/slices/friends.slice";

export default function useGetFriends() {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const getFriendsQuery = useQuery({
    queryKey: ["users", user?.id, "friends"],

    queryFn: async () =>
      await getFriends({
        userId: user?.id!,
        token: token,
      }),
  });

  const { data } = getFriendsQuery;

  useEffect(() => {
    if (data?.success) {
      dispatch(setFriends({ friends: data?.friends }));
    }
  }, [data]);

  return getFriendsQuery;
}
