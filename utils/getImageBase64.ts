export default function getImageBase64(image: any) {
  // data:image/jpeg;base64,

  const base64Header = "data:image/";

  if (image?.mimeType === "image/jpeg")
    return `${base64Header}jpeg;base64,${image?.base64}`;

  if (image?.mimeType === "image/jpg")
    return `${base64Header}jpg;base64,${image?.base64}`;

  if (image?.mimeType === "image/png")
    return `${base64Header}png;base64,${image?.base64}`;

  return `data:${image?.mimeType};base64,${image?.base64}`;

  // return "Please select only png|jpeg|jpg format image";
}
