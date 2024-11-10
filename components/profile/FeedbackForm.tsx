import { StyleSheet, Text, View } from "react-native";
import React from "react";

import CustomButton from "@/components/ui/CustomButton";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Toast from "react-native-root-toast";
import axios from "axios";
import { Colors } from "@/constants/Colors";

const formSchema = z.object({
  title: z.string(),
  email: z.string().email("Enter a valid email"),
  text: z.string().max(100, { message: "The maximum characters is 100" }),
});

type FeedbackFormInputs = z.infer<typeof formSchema>;

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
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FeedbackFormInputs> = async (data) => {
    try {
      const response = await axios.post(
        "https://new.aeboards.net/api/info/send_feedback",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      Toast.show("Thanks for your feedback.", {
        duration: Toast.durations.LONG,
        backgroundColor: "#198754",
        opacity: 1,
      });
      reset({
        title: "",
        text: "",
        email: "",
      });
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            mode="outlined"
            label="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {errors.email?.message && typeof errors.email.message === "string" && (
        <Text style={styles.error}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            mode="outlined"
            label="Title"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {errors.title?.message && typeof errors.title.message === "string" && (
        <Text style={styles.error}>{errors.title.message}</Text>
      )}

      <Controller
        control={control}
        name="text"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            mode="outlined"
            label="Your feedback"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            multiline={true}
            numberOfLines={5}
          />
        )}
      />
      {errors.text?.message && typeof errors.text.message === "string" && (
        <Text style={styles.error}>{errors.text.message}</Text>
      )}

      <View style={{ marginTop: 12 }}>
        <CustomButton title="Send" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default FeedbackForm;

const styles = StyleSheet.create({
  error: {
    color: Colors.light.danger,
    marginBottom: 10,
  },
});
