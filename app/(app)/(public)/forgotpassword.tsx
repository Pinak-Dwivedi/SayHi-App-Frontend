import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import Text from "@/components/Text";
import FormInput from "@/components/FormInput";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import useForgotPassword from "@/hooks/useForgotPassword";
import FormError from "@/components/FormError";
import FormButton from "@/components/FormButton";
import styles from "@/utils/inputIconStyle";
import { MaterialIcons } from "@expo/vector-icons";

export default function ForgotPassword() {
  const [userData, setUserData] = useState({
    email: "",
  });

  const { mutate, data, isPending } = useForgotPassword();

  function handleForgotPassword() {
    mutate({
      email: userData.email,
    });
  }

  useEffect(() => {
    if (data?.success) {
      router.push(`./verifyOTP/${userData?.email}`);
    } else if (data?.success === false) {
      if (Platform.OS === "android")
        ToastAndroid.show(data?.message!, ToastAndroid.SHORT);
    }
  }, [data]);

  return (
    <View className="p-2 flex-1 bg-compliment">
      <ScrollView>
        <View className="flex-1 max-w-3xl w-[95%] mx-auto">
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            <View className="rounded-md gap-y-10 my-8">
              <View style={{ rowGap: 10 }}>
                <Text className="text-4xl text-accent border-b-2 border-b-accent">
                  Forgot Password
                </Text>

                <Text className="text-xl text-accent">
                  Enter the email that you used during signup and you will get
                  an OTP in the mail to reset your password.
                </Text>
              </View>

              <View style={{ rowGap: 15 }}>
                <View>
                  <FormInput
                    placeholder="email"
                    value={userData.email}
                    onChangeText={(value: string) =>
                      setUserData({
                        email: value,
                      })
                    }
                    Icon={
                      <MaterialIcons name="email" style={styles.inputIcon} />
                    }
                  />
                  <FormError data={data} title="email" />
                </View>

                <FormButton
                  title="Send"
                  disabled={isPending}
                  onPress={handleForgotPassword}
                />

                <View className="flex-row gap-x-2">
                  <Text className="text-lg">Already have an account?</Text>
                  <Link
                    className="text-lg text-blue-500 font-poppins"
                    href="/(app)/(public)/login"
                  >
                    Login
                  </Link>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
}
