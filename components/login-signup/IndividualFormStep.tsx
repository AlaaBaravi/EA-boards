import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { FC, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Colors } from "@/constants/Colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../ui/CustomButton";

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
  const [isPasswordVisable, setIsPasswordVisable] = useState<boolean>(false);

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

  function handlePasswordVisable() {
    setIsPasswordVisable((visable) => !visable);
  }

  const onSubmit = (data: IndividualFormStepData) => {
    onNextStep(data);
  };

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Business Name"
            placeholderTextColor={Colors.light.icon}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholderTextColor={Colors.light.icon}
            placeholder="Business Location"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Name"
            placeholderTextColor={Colors.light.icon}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.light.icon}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={Colors.light.icon}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={[styles.input, styles.passwordInput]}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={Colors.light.icon}
              secureTextEntry={!isPasswordVisable}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            <Ionicons
              name={isPasswordVisable ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="black"
              style={{ opacity: 0.64 }}
              onPress={handlePasswordVisable}
            />
          </View>
        )}
      />
      {errors.password?.message &&
        typeof errors.password.message === "string" && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}

      <CustomButton title="Back" onPress={onPrevStep} />
      <CustomButton title="Next" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default IndividualFormStep;

const styles = StyleSheet.create({
  formContainer: {
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
