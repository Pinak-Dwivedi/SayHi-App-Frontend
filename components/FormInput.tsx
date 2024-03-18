import { TextInput, View } from "react-native";
import { ReactElement } from "react";

type PropsType = {
  secureEntry?: boolean;
  placeholder: string;
  value?: string;
  onChangeText?: (value: string) => void;
  Icon?: ReactElement;
};

export default function FormInput({
  secureEntry = false,
  placeholder,
  value,
  onChangeText,
  Icon,
}: PropsType) {
  // const IconStyle = {
  //   color: "rgba(0, 0, 0, .6)",
  //   top: -3,
  // };

  return (
    <View className="flex-row items-center rounded-lg border-gray-200 border-2 p-2 gap-x-3">
      {Icon}

      <TextInput
        className={"text-2xl font-poppins flex-1"}
        placeholder={placeholder}
        secureTextEntry={secureEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
