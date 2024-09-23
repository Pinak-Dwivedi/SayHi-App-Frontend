import QueryProvider from "@/components/QueryProvider";
import ReduxProvider from "@/components/ReduxProvider";
import { Slot } from "expo-router";
import "expo-dev-client";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import SocketProvider from "@/components/SocketProvider";
import { StatusBar } from "expo-status-bar";

GoogleSignin.configure({
  webClientId:
    "246775189321-jooqd17t34it4up36n2rri5v15v5tql0.apps.googleusercontent.com",
});

export default function RootLayout() {
  return (
    <ReduxProvider>
      <QueryProvider>
        <SocketProvider>
          <Slot />
          <StatusBar style="light" />
        </SocketProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
