import { Modal, TouchableOpacity, View } from "react-native";
import Text from "@/components/Text";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import getImageBase64 from "@/utils/getImageBase64";

type PropsType = {
  visible: boolean;
  onClose: () => void;
  setImage: (imageData: string | null) => void;
};

export default function ImageUploadModal({
  visible = false,
  onClose,
  setImage,
}: PropsType) {
  async function handlePickImageFromGallery() {
    await ImagePicker.requestMediaLibraryPermissionsAsync();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    // console.log("result", result);
    // close modal
    onClose();

    if (!result?.canceled) {
      const base64Image = getImageBase64(result?.assets?.[0]);

      setImage(base64Image);

      return;
    }

    setImage(null);
  }

  async function handlePickImageFromCamera() {
    await ImagePicker.requestCameraPermissionsAsync();

    const result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    // console.log("result", result);
    // close modal
    onClose();

    if (!result?.canceled) {
      const base64Image = getImageBase64(result?.assets?.[0]);

      // removing frontend validation
      // if (base64Image === "Please select only png|jpeg|jpg format image")
      //   return;
      // can show a form error here

      setImage(base64Image);

      return;
    }

    setImage(null);
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent={true}
      animationType="slide"
    >
      <View className="flex-1 bg-slate-900/[.3] justify-center">
        <View className="max-w-3xl w-[95%] mx-auto bg-slate-50 px-4 py-8 rounded-lg flex-row justify-around">
          <TouchableOpacity
            className="items-center"
            style={{
              rowGap: 5,
            }}
            onPress={handlePickImageFromCamera}
          >
            <FontAwesome
              name="camera"
              size={45}
              style={{
                color: "#8B00FF",
              }}
            />

            <Text className="text-lg">Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            style={{
              rowGap: 5,
            }}
            onPress={handlePickImageFromGallery}
          >
            <Fontisto name="photograph" size={45} color="#8B00FF" />

            <Text className="text-lg">Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="absolute right-4 top-1"
            onPress={onClose}
          >
            <FontAwesome name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
