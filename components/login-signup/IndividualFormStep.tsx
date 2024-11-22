import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { FC, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Colors } from "@/constants/Colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../ui/CustomButton";
import CustomTextInput from "../ui/CustomTextInput";

const individualStepSchema = z.object({
  username: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  location: z.string().optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be no more than 15 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
  image: z.string().url().optional(),
});

type IndividualFormStepData = z.infer<typeof individualStepSchema>;

interface Props {
  onNextStep: (data: IndividualFormStepData) => void;
  onPrevStep: () => void;
}

const IndividualFormStep: FC<Props> = ({ onNextStep, onPrevStep }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IndividualFormStepData>({
    resolver: zodResolver(individualStepSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (data: IndividualFormStepData) => {
    onNextStep(data);
  };

  return (
    <View>
      <CustomTextInput
        control={control}
        name="username"
        error={errors.username}
        placeholder="Username"
        label="Username"
      />

      <CustomTextInput
        control={control}
        name="location"
        error={errors.location}
        placeholder="location"
        label="Location"
      />

      <CustomTextInput
        control={control}
        name="name"
        error={errors.name}
        placeholder="name"
        label="Name"
      />

      <CustomTextInput
        control={control}
        name="email"
        error={errors.email}
        placeholder="email"
        label="Email"
      />

      <CustomTextInput
        control={control}
        name="phone"
        error={errors.phone}
        placeholder="phone Number"
        keyboardType="phone-pad"
        label="Phone Number"
      />

      <CustomTextInput
        name="password"
        control={control}
        placeholder="password"
        error={errors.password}
        secureTextEntry={true}
        icon="eye"
        label="Password"
      />
      <View style={styles.buttonsContainer}>
        <CustomButton title="Back" onPress={onPrevStep} />
        <CustomButton title="Next" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default IndividualFormStep;

const styles = StyleSheet.create({
  buttonsContainer: {
    gap: 12,
  },
  input: {
    borderColor: Colors.light.primary,
    borderBottomWidth: 1,
    padding: 8,
    borderRadius: 5,
  },
  error: { color: Colors.light.danger },
  passwordInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
