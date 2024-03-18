import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import Text from "@/components/Text";
import FormInput from "@/components/FormInput";
import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import FormError from "@/components/FormError";
import FormButton from "@/components/FormButton";
import styles from "@/utils/inputIconStyle";
import { Fontisto } from "@expo/vector-icons";
import useVerifyForgotPasswordOTP from "@/hooks/useVerifyForgotPasswordOTP";

export default function VerifyOTP() {
  const [OTP, setOTP] = useState("");

  const { email } = useLocalSearchParams();

  const { mutate, data, isPending } = useVerifyForgotPasswordOTP();

  function handleVerifyForgotPasswordOTP() {
    mutate({
      email: email?.toString(),
      otp: OTP,
    });
  }

  return (
    <View className="p-2 flex-1 bg-compliment">
      <ScrollView>
        <View className="flex-1 max-w-3xl w-[95%] mx-auto">
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            <View className="rounded-md gap-y-10 my-8">
              <View style={{ rowGap: 10 }}>
                <Text className="text-4xl text-accent border-b-2 border-b-accent">
                  Verify OTP
                </Text>

                <Text className="text-xl text-accent">
                  Enter the OTP sent on your email.
                </Text>
              </View>

              <View style={{ rowGap: 15 }}>
                <View>
                  <FormInput
                    placeholder="OTP"
                    value={OTP}
                    onChangeText={(value) => setOTP(value)}
                    Icon={<Fontisto name="locked" style={styles.inputIcon} />}
                  />
                  <FormError data={data} title="OTP" />
                </View>

                <FormButton
                  title="Send"
                  disabled={isPending}
                  onPress={handleVerifyForgotPasswordOTP}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
}
