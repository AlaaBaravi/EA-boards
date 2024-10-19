import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomButton from "../ui/CustomButton";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import axios, { AxiosError } from "axios";

const loginSchema = z.object({
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
});

type LoginFormInput = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isPasswordVisable, setIsPasswordVisable] = useState<boolean>(false);

  function handlePasswordVisable() {
    setIsPasswordVisable((visable) => !visable);
  }

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "abdoezzat@gmail.com", password: "Ammmmmm123!" },
  });

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    console.log("Form Data:", data);
    try {
      // const response = await axios.post(
      //   "https://new.aeboards.net/api/auth/login",
      //   { email: data.email, password: data.password },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //     },
      //   }
      // );

      // Alert.alert("Success", "You logged in successfully.");

      router.push("/(tabs)");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
      console.error(error);
      Alert.alert("Error", "login failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
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
      {errors.email?.message && typeof errors.email.message === "string" && (
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

      <CustomButton title="Log in" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
