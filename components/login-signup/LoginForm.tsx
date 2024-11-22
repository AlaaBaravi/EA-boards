import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomButton from "../ui/CustomButton";
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";
import axios, { AxiosError } from "axios";
import { mainstyles } from "@/constants/Styles";
import Toast from "react-native-root-toast";
import useAuthActions from "@/store/authActions";
import { showToast } from "@/util/fn";
import CustomTextInput from "../ui/CustomTextInput";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine(
      (password) => !/\s/.test(password),
      "Password must not contain spaces"
    ),
});

type LoginFormInput = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [error, setError] = useState<string>("");
  const { login } = useAuthActions();

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      const response = await axios.post(
        "https://new.aeboards.net/api/auth/login",
        { email: data.email, password: data.password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      Toast.show("You logged in successfully.", {
        duration: Toast.durations.LONG,
        backgroundColor: "#198754",
        opacity: 1,
      });

      await login(response.data.data.token, response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        showToast(error.response?.data.message, "danger");
      } else {
        console.error(error);
        showToast("An unknown error occurred.", "danger");
      }
    }
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        control={control}
        name="email"
        label="email"
        placeholder="Email"
        error={errors.email}
        keyboardType="email-address"
      />

      <CustomTextInput
        name="password"
        control={control}
        label="Password"
        placeholder="password"
        error={errors.password}
        secureTextEntry={true}
        icon="eye"
      />

      <Link href="/auth/forgotPassword" asChild>
        <Pressable
          onPress={() => {
            reset();
            setError("");
          }}
        >
          <Text
            style={[
              styles.forgetPassword,
              {
                color:
                  error === "Email and password not valid"
                    ? Colors.light.danger
                    : "black",
              },
            ]}
          >
            Forget your password?
          </Text>
        </Pressable>
      </Link>

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
  passwordInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  error: {
    color: Colors.light.danger,
    marginBottom: 10,
  },
  forgetPassword: {
    ...mainstyles.caption,
    marginVertical: 12,
    textAlign: "right",
  },
});
