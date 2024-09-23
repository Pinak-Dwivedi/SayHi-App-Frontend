import {
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "@/components/Text";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import FormInput from "@/components/FormInput";
import styles from "@/utils/inputIconStyle";
import ImageUploadModal from "@/components/ImageUploadModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useUpdateUser from "@/hooks/useUpdateUser";
import FormError from "@/components/FormError";
import FormButton from "@/components/FormButton";

export default function EditProfile() {
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [userData, setUserData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(user?.profileImage || null);

  const { mutate, data, isPending } = useUpdateUser();

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function updateImageData(imageData: string | null) {
    if (imageData == null) {
      if (user?.profileImage == null) {
        setImage(null);
      } else {
        setImage(user?.profileImage);
      }

      return;
    }

    setImage(imageData);
  }

  function getProfileImageForUpdate(imageData: string | null) {
    if (typeof imageData === "string") {
      // check if base64 string and that too proper image format jpg|jpeg|png
      if (/^data:(image\/jpg|image\/jpeg|image\/png);base64.*/.test(imageData))
        return imageData;

      return null;
    }

    return null;
  }

  function handleUpdate() {
    mutate({
      userId: user?.id!,
      username: userData.username,
      email: userData.email,
      googleId: user?.googleId,
      profileImage: getProfileImageForUpdate(image),
      token,
    });
  }

  return (
    <View className="flex-1 p-2 bg-compliment">
      <View className="flex-1 max-w-3xl w-[95%] mx-auto">
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={100}
          style={{
            rowGap: 50,
          }}
        >
          <View>
            <TouchableOpacity onPress={handleModalOpen}>
              {image != null ? (
                <View className="h-52 w-52 border-2 border-slate-300/10 rounded-full self-center overflow-hidden items-center justify-center shadow-lg shadow-slate-600">
                  <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200, objectFit: "fill" }}
                  />
                </View>
              ) : (
                <FontAwesome
                  name="user-circle"
                  size={100}
                  color="black"
                  style={{
                    textAlign: "center",
                  }}
                />
              )}
            </TouchableOpacity>

            <FormError data={data} title="profileImage" />
          </View>

          <View className="" style={{ rowGap: 45 }}>
            <View style={{ rowGap: 10 }}>
              <Text className="text-xl font-bold text-accent">Username</Text>

              <FormInput
                secureEntry={false}
                placeholder="username"
                value={userData.username}
                onChangeText={(value) =>
                  setUserData({
                    ...userData,
                    username: value,
                  })
                }
                Icon={<FontAwesome name="user" style={styles.inputIcon} />}
              />

              <FormError data={data} title="username" />
            </View>

            <View style={{ rowGap: 10 }}>
              <Text className="text-xl font-bold text-accent">E-mail</Text>

              <FormInput
                secureEntry={false}
                placeholder="email"
                value={userData.email}
                onChangeText={(value) =>
                  setUserData({
                    ...userData,
                    email: value,
                  })
                }
                Icon={<MaterialIcons name="email" style={styles.inputIcon} />}
              />

              <FormError data={data} title="email" />
            </View>

            <FormButton
              title="Update"
              disabled={isPending}
              onPress={handleUpdate}
            />
          </View>

          <ImageUploadModal
            visible={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            setImage={updateImageData}
          />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
