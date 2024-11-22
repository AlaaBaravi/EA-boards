import { StyleSheet, View } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSendFeedback } from "@/hooks/info/useSendFeedback";
import { FeedbackFormInputs, sendFeedbackSchema } from "@/constants/Schemas";

import CustomTextInput from "@/components/ui/CustomTextInput";
import CustomButton from "@/components/ui/CustomButton";

const FeedbackForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormInputs>({
    defaultValues: {
      email: "",
      title: "",
      text: "",
    },
    resolver: zodResolver(sendFeedbackSchema),
  });

  const onReset = () => {
    reset();
  };

  const { mutate: sendFeedbackMutation, isPending } = useSendFeedback(onReset);

  const onSubmit: SubmitHandler<FeedbackFormInputs> = async (data) => {
    sendFeedbackMutation(data);
  };

  return (
    <View style={styles.form}>
      <CustomTextInput
        control={control}
        name="email"
        error={errors.email}
        placeholder="Email"
      />

      <CustomTextInput
        control={control}
        name="title"
        error={errors.title}
        placeholder="Title"
      />

      <CustomTextInput
        control={control}
        name="text"
        error={errors.text}
        placeholder="Your feedback"
        multiline={true}
        numberOfLines={5}
      />

      <View style={{ marginTop: 12 }}>
        <CustomButton
          title={isPending ? "Sending..." : "Send"}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        />
      </View>
    </View>
  );
};

export default FeedbackForm;

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
});
