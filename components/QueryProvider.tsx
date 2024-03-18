import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
};

export default function QueryProvider({ children }: PropsType) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
