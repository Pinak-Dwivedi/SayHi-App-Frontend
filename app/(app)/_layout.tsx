import {
  Stack,
  useRouter,
  useNavigationContainerRef,
  useSegments,
} from "expo-router";
import useAuth from "@/hooks/useAuth";
import { useEffect, useLayoutEffect, useState } from "react";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const rootNavigationRef = useNavigationContainerRef();
  const segments = useSegments();
  const router = useRouter();
  const {
    authQuery: { isLoading, isError, data },
    isInitializing,
  } = useAuth();

  const [fontsLoaded] = useFonts({
    Poppins: require("@/assets/fonts/Poppins-Regular.ttf"),
    Roboto: require("@/assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    const unsubscribe = rootNavigationRef.addListener("state", (event) => {
      setIsNavigationReady(true);
    });

    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigationRef]);

  useLayoutEffect(() => {
    if (!isNavigationReady || isLoading || !fontsLoaded || isInitializing) {
      return;
    }

    if (isError || !data?.success) {
      if (segments[1] === "(authenticated)") {
        router.replace("/(app)/(public)/login");
      }
    } else if (data?.success) {
      if (segments[1] === "(public)") {
        router.replace("/(app)/(authenticated)/(conversations)");
      }
    }

    setTimeout(SplashScreen.hideAsync, 5000);
  }, [
    isNavigationReady,
    isLoading,
    isError,
    data?.success,
    segments[1],
    fontsLoaded,
    isInitializing,
  ]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#FCF7FF",
        },
      }}
    >
      <Stack.Screen name="(authenticated)" />

      <Stack.Screen name="(public)" />
    </Stack>
  );
}
