import React from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import axios, { AxiosError } from "axios";
import { useAuth } from "@/store/authContext";
import { Colors } from "@/constants/Colors";
import CustomButton from "../ui/CustomButton";

const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  accountType: z.enum(["company", "individual"]),
  businessSize: z.string().optional(),
  location: z.string().optional(),
  industryTypeId: z.union([z.string(), z.number()]).optional(),
  maxBookingDays: z.number().optional(),
  minBookingDays: z.number().optional(),
  numbersBillboards: z.number().optional(),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const { state, dispatch } = useAuth();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      accountType: "company",
      businessSize: "50",
      location: "Alexandria",
      industryTypeId: 1,
      maxBookingDays: 8.5504628,
      minBookingDays: 4.18389,
      numbersBillboards: 9.86,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      formData.append("max_booking_days ", "8.5504628");
      formData.append("min_booking_ays", "4.18389");
      formData.append("numbers_billboards", "9.86");
      formData.append("type", "company");

      const response = await axios.post(
        "https://new.aeboards.net/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      dispatch({
        type: "LOGIN",
        payload: {
          token: response.data.data.token,
          user: { email: response.data.data.email },
        },
      });
      Alert.alert("Success", "Please verify your email.");

      router.push({
        pathname: "/auth/verify-email",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
      console.error(error);
      Alert.alert("Error", "Registration failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Name Input */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Name"
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.name && <Text>{errors.name.message}</Text>}

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      {/* Phone Input */}
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Phone"
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.phone && <Text>{errors.phone.message}</Text>}

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      {/* Submit Button */}
      <CustomButton title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: Colors.light.secondary,
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
});
