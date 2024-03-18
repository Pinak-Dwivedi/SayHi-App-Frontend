import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import Text from "@/components/Text";
import FormInput from "@/components/FormInput";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import FormError from "@/components/FormError";
import FormButton from "@/components/FormButton";
import useResetPassword from "@/hooks/useResetPassword";
import { Fontisto } from "@expo/vector-icons";
import styles from "@/utils/inputIconStyle";

export default function ResetPassword() {
  const [userData, setUserData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { email } = useLocalSearchParams();

  const { mutate, data, isPending } = useResetPassword();

  function handleResetPassword() {
    mutate({
      email: email?.toString(),
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    });
  }

  useEffect(() => {
    if (data?.success) {
      router.replace(`/(app)/(public)/login`);
    }
  }, [data]);

  return (
    <View className="p-2 flex-1 bg-compliment">
      <ScrollView>
        <View className="flex-1 max-w-3xl w-[95%] mx-auto">
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            <View className="rounded-md gap-y-10 my-8">
              <Text className="text-4xl text-accent border-b-2 border-b-accent">
                Reset Password
              </Text>

              <View style={{ rowGap: 15 }}>
                <View>
                  <FormInput
                    placeholder="password"
                    value={userData.password}
                    secureEntry={true}
                    onChangeText={(value: string) =>
                      setUserData({
                        ...userData,
                        password: value,
                      })
                    }
                    Icon={<Fontisto name="locked" style={styles.inputIcon} />}
                  />
                  <FormError data={data} title="password" />
                </View>

                <View>
                  <FormInput
                    placeholder="re-enter password"
                    secureEntry={true}
                    value={userData.confirmPassword}
                    onChangeText={(value: string) =>
                      setUserData({
                        ...userData,
                        confirmPassword: value,
                      })
                    }
                    Icon={<Fontisto name="locked" style={styles.inputIcon} />}
                  />
                  <FormError data={data} title="confirmPassword" />
                </View>

                <FormButton
                  title="Reset"
                  disabled={isPending}
                  onPress={handleResetPassword}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
}
