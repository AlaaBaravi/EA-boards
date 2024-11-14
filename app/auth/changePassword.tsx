import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import LinearBackground from "@/components/ui/LinearBackground";
import Logo from "@/components/ui/Logo";
import WelcomeText from "@/components/ui/WelcomeText";
import { z } from "zod";
import { Ionicons } from "@expo/vector-icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { mainstyles } from "@/constants/Styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/ui/CustomButton";
import { useResetPassword } from "@/hooks/auth/useResetPassword";

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export type changePasswordValues = z.infer<typeof changePasswordSchema>;

const changePassword = () => {
  const { email, token } = useLocalSearchParams();
  const [isPasswordVisable, setIsPasswordVisable] = useState<boolean>(false);
  const [isConfirmPasswordVisable, setIsConfirmPasswordVisable] =
    useState<boolean>(false);

  function handlePasswordVisable() {
    setIsPasswordVisable((visable) => !visable);
  }

  function handleConfirmPasswordVisable() {
    setIsConfirmPasswordVisable((visable) => !visable);
  }

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<changePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { confirmPassword: "", password: "" },
  });

  const { mutate: resetPasswordMutation, isPending } = useResetPassword();

  const onSubmit: SubmitHandler<changePasswordValues> = async (data) => {
    if (typeof email === "string" && typeof token === "string") {
      resetPasswordMutation({ email, token, new_password: data.password });
    }
  };

  return (
    <LinearBackground>
      <Logo />
      <WelcomeText text="Reset Password" />

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[mainstyles.input, styles.passwordInput]}>
              <TextInput
                placeholder="Password"
                secureTextEntry={!isPasswordVisable}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  flex: 1,
                }}
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
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[mainstyles.input, styles.passwordInput]}>
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={!isConfirmPasswordVisable}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  flex: 1,
                }}
              />
              <Ionicons
                name={
                  isConfirmPasswordVisable ? "eye-off-outline" : "eye-outline"
                }
                size={20}
                color="black"
                style={{ opacity: 0.64 }}
                onPress={handleConfirmPasswordVisable}
              />
            </View>
          )}
        />
        {errors.confirmPassword?.message &&
          typeof errors.confirmPassword.message === "string" && (
            <Text style={styles.error}>{errors.confirmPassword.message}</Text>
          )}

        <CustomButton
          title="Reset Password"
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        />
      </View>
    </LinearBackground>
  );
};

export default changePassword;

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    gap: 12,
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
});
