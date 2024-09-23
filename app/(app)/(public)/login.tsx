import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import Text from "@/components/Text";
import FormInput from "@/components/FormInput";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { useState } from "react";
import useLogin from "@/hooks/useLogin";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import FormError from "@/components/FormError";
import FormButton from "@/components/FormButton";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import useLoginWithGoogle from "@/hooks/useLoginWithGoogle";
import { Fontisto } from "@expo/vector-icons";
import styles from "@/utils/inputIconStyle";

export default function Login() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const { token } = useSelector((state: RootState) => state.auth);

  const { mutate, data, isPending } = useLogin();
  const { mutate: mutateG, isPending: isPendingG } = useLoginWithGoogle();

  function handleLogin() {
    mutate({
      username: userData.username,
      password: userData.password,
      token: token,
    });
  }

  async function handleLoginWithGoogle() {
    // Check if your device supports Google Play
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredentials = await auth().signInWithCredential(
        googleCredential
      );

      // console.log("userCredentials", userCredentials);

      if (userCredentials.user != null) {
        mutateG({
          googleId: userCredentials.user.uid!,
          username: userCredentials.user.displayName!,
          email: userCredentials.user.email!,
          profilePicture: userCredentials.user.photoURL!,
          token: token,
        });
      }
    } catch (error) {
      // console.error("google sign-in error", error);
    }
  }

  return (
    <View className="p-2 flex-1 bg-compliment">
      <ScrollView>
        <View className="flex-1 max-w-3xl w-[95%] mx-auto">
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            <View className="rounded-md gap-y-10 my-8">
              <Text className="text-4xl text-accent border-b-2 border-b-accent">
                Login
              </Text>

              <View style={{ rowGap: 15 }}>
                <View>
                  <FormInput
                    placeholder="username"
                    value={userData.username}
                    onChangeText={(value: string) =>
                      setUserData({
                        ...userData,
                        username: value,
                      })
                    }
                    Icon={<FontAwesome name="user" style={styles.inputIcon} />}
                  />
                  <FormError data={data} title="username" />
                </View>

                <View>
                  <FormInput
                    placeholder="password"
                    secureEntry={true}
                    value={userData.password}
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

                <FormButton
                  title="Login"
                  disabled={isPending || isPendingG}
                  onPress={handleLogin}
                />

                <View className="flex-row gap-x-2">
                  <Link
                    className="text-lg text-blue-500 font-poppins"
                    href="/(app)/(public)/forgotpassword"
                  >
                    Forgot password?
                  </Link>
                </View>

                {/* <View className="flex-row gap-x-2">
                  <Link
                    className="text-lg text-blue-500 font-poppins"
                    href={"/(app)/(public)/resetpassword/Mike/abc123!!!"}
                  >
                    Reset password?
                  </Link>
                </View> */}

                <View className="flex-row items-center my-2 gap-x-2">
                  <Text className="border-2 h-0 opacity-[.15] grow"> </Text>
                  <Text className="text-lg">OR</Text>
                  <Text className="border-2 h-0 opacity-[.15] grow"> </Text>
                </View>

                <FormButton
                  onPress={handleLoginWithGoogle}
                  disabled={isPending || isPendingG}
                >
                  <View className="flex-row justify-center items-center">
                    <Text className="text-2xl text-slate-100 mr-3">
                      Login with Google
                    </Text>
                    <FontAwesome
                      name="google"
                      size={21}
                      color={"white"}
                      className="text-xl text-slate-100"
                    />
                  </View>
                </FormButton>

                <View className="flex-row gap-x-2">
                  <Text className="text-lg">Don't have an account?</Text>

                  <Link
                    className="text-lg text-blue-500 font-poppins"
                    href="/(app)/(public)/signup"
                  >
                    SignUp
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
