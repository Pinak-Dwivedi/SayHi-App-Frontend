import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import Text from "@/components/Text";
import FormInput from "@/components/FormInput";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import FormError from "@/components/FormError";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useSignup from "@/hooks/useSignup";
import FormButton from "@/components/FormButton";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import useLoginWithGoogle from "@/hooks/useLoginWithGoogle";
import { Fontisto } from "@expo/vector-icons";
import styles from "@/utils/inputIconStyle";
import { MaterialIcons } from "@expo/vector-icons";

export default function SignUp() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { token } = useSelector((state: RootState) => state.auth);
  const { mutate, data, isPending } = useSignup();
  const { mutate: mutateG, isPending: isPendingG } = useLoginWithGoogle();

  function handleSignup() {
    mutate({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      token: token,
    });
  }

  async function handleLoginWithGoogle() {
    try {
      // Check if your device supports Google Play
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

      // console.log(userCredentials);

      if (userCredentials.user != null) {
        mutateG({
          googleId: userCredentials.user.providerId!,
          username: userCredentials.user.displayName!,
          email: userCredentials.user.email!,
          profilePicture: userCredentials.user.photoURL!,
          token: token,
        });
      }
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <View className="p-2 flex-1 bg-compliment">
      <ScrollView>
        <View className="flex-1 max-w-3xl w-[95%] mx-auto">
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            <View className="rounded-md gap-y-5 my-8">
              <Text className="text-4xl text-accent border-b-accent">
                SignUp
              </Text>

              <View
                style={{
                  rowGap: 15,
                }}
              >
                <View>
                  <FormInput
                    placeholder="username"
                    value={userData.username}
                    onChangeText={(value) => {
                      setUserData({
                        ...userData,
                        username: value,
                      });
                    }}
                    Icon={<FontAwesome name="user" style={styles.inputIcon} />}
                  />
                  <FormError data={data} title="username" />
                </View>

                <View>
                  <FormInput
                    placeholder="email"
                    value={userData.email}
                    onChangeText={(value) => {
                      setUserData({
                        ...userData,
                        email: value,
                      });
                    }}
                    Icon={
                      <MaterialIcons name="email" style={styles.inputIcon} />
                    }
                  />
                  <FormError data={data} title="email" />
                </View>

                <View>
                  <FormInput
                    placeholder="password"
                    secureEntry={true}
                    value={userData.password}
                    onChangeText={(value) => {
                      setUserData({
                        ...userData,
                        password: value,
                      });
                    }}
                    Icon={<Fontisto name="locked" style={styles.inputIcon} />}
                  />
                  <FormError data={data} title="password" />
                </View>

                <View>
                  <FormInput
                    placeholder="re-enter password"
                    secureEntry={true}
                    value={userData.confirmPassword}
                    onChangeText={(value) => {
                      setUserData({
                        ...userData,
                        confirmPassword: value,
                      });
                    }}
                    Icon={<Fontisto name="locked" style={styles.inputIcon} />}
                  />
                  <FormError data={data} title="confirmPassword" />
                </View>

                <FormButton
                  title="Sign Up"
                  disabled={isPending || isPendingG}
                  onPress={handleSignup}
                />

                <View className="flex-row items-center my-2 gap-x-2">
                  <Text className="border-2 h-0 opacity-[.15] grow"> </Text>
                  <Text className="text-lg">OR</Text>
                  <Text className="border-2 h-0 opacity-[.15] grow"> </Text>
                </View>

                <FormButton
                  disabled={isPending || isPendingG}
                  onPress={handleLoginWithGoogle}
                >
                  <View className="flex-row justify-center items-center">
                    <Text className="text-2xl text-slate-100 mr-3">
                      SignUp with Google
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
