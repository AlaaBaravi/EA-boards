import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomButton from "../ui/CustomButton";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 chars" }),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character")
    .refine(
      (password) => !/\s/.test(password),
      "Password must not contain spaces"
    ),
  phone: z.string(),
});

type SignupFormInput = z.infer<typeof signupSchema>;

const SignupCompany = () => {
  const [isPasswordVisable, setIsPasswordVisable] = useState<boolean>(false);

  function handlePasswordVisable() {
    setIsPasswordVisable((visable) => !visable);
  }

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignupFormInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupFormInput> = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name?.message && typeof errors.name.message === "string" && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
            )}
          />
          {errors.email?.message &&
            typeof errors.email.message === "string" && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[styles.input, styles.passwordInput]}>
                <TextInput
                  placeholder="Password"
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

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Phone"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="number-pad"
              />
            )}
          />
          {errors.phone?.message &&
            typeof errors.phone.message === "string" && (
              <Text style={styles.error}>{errors.phone.message}</Text>
            )}

          <CustomButton title="Sign up" onPress={handleSubmit(onSubmit)} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    width: "100%",
    flex: 1,
    gap: 8,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: Colors.light.secondary,
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  passwordInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
