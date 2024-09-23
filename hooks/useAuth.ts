import { useQuery } from "@tanstack/react-query";
import { getAuth } from "@/utils/apiCalls/auth";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/auth.slice";
import auth from "@react-native-firebase/auth";

export default function useAuth() {
  const { getItem, setItem, removeItem } = useAsyncStorage("auth");
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function handleAuthStateChanged(user: any) {
      if (user) setUser(user);

      if (isInitializing) setIsInitializing(false);
    }

    const unsubscribe = auth().onAuthStateChanged(handleAuthStateChanged);

    return unsubscribe;
  }, []);

  const authQuery = useQuery({
    queryKey: ["auth"],

    queryFn: async () => {
      const data = await getItem();

      if (data == null) throw new Error("Token not found!");
      else {
        const parsed = JSON.parse(data);
        return await getAuth(parsed.token);
      }
    },
    retry: false,
    enabled: !isInitializing,
  });

  const { isLoading, isError, data } = authQuery;

  useEffect(() => {
    (async () => {
      try {
        if (isLoading || isInitializing) return;

        if (isError || !data?.success) {
          await removeItem();

          // also logout from firebase
          if (user != null) await auth().signOut();

          dispatch(
            setAuth({
              token: null,
              user: null,
            })
          );
        } else if (data.success) {
          await setItem(
            JSON.stringify({
              token: data.token,
              user: data.user,
            })
          );

          dispatch(
            setAuth({
              token: data.token,
              user: data.user,
            })
          );
        }
      } catch (error) {
        // console.log("auth error", error);
      }
    })();
  }, [isLoading, isInitializing, isError, data?.success]);

  return { authQuery, isInitializing };
}
