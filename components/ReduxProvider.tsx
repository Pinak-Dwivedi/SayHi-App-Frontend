import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";

type PropsType = {
  children: ReactNode;
};

export default function ReduxProvider({ children }: PropsType) {
  return <Provider store={store}>{children}</Provider>;
}
