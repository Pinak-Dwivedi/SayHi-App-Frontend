import Text from "@/components/Text";
import ApiResponse from "@/types/ApiResponse";

interface DataWithValidationError extends ApiResponse {
  validationError?: any;
}

type PropsType = {
  data?: DataWithValidationError;
  title: string;
};

export default function FormError({ data, title }: PropsType) {
  if (
    data == null ||
    data?.success ||
    data?.validationError == null ||
    data?.validationError?.[title] == null
  )
    return null;

  return (
    <Text className="text-lg text-red-600">
      {data?.validationError?.[title]}
    </Text>
  );
}
