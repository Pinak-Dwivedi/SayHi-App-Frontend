import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import Text from "@/components/Text";

type PropsType = {
  title?: string;
  children?: ReactNode;
  disabled?: boolean;
  onPress?: () => any;
};

export default function FormButton({
  title,
  disabled = false,
  children,
  onPress,
}: PropsType) {
  return (
    <TouchableOpacity
      className="bg-dominant px-2 py-2 rounded-xl"
      onPress={onPress}
      disabled={disabled}
    >
      {children == null ? (
        <Text className="text-slate-50 text-center text-2xl">{title}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
