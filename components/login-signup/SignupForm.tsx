import React, { useContext, useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useRouter } from "expo-router";
import axios, { AxiosError } from "axios";
import { useAuth } from "@/store/authContext";
import { Colors } from "@/constants/Colors";
import CustomButton from "../ui/CustomButton";
import { mainstyles } from "@/constants/Styles";
import { FormValues, signupFormSchema } from "@/constants/Schemas";
import { FormContext, FormProvider } from "@/store/signupContext";
import CompanyFormStep from "./CompanyFormStep";
import IndividualFormStep from "./IndividualFormStep";
import CompanyFormStepTwo from "./CompanyFormStepTwo";
import { uriToBlob } from "@/util/fn";
import Toast from "react-native-root-toast";

export default function Signup() {
  const { dispatch } = useAuth();
  const [step, setStep] = useState(0);
  const { accountType, setAccountType, formData, setFormData } =
    useContext(FormContext);

  const handleNextStep = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (step === 1) {
      setStep((prevStep) => prevStep + 1);
    }

    if (step === 2) {
      onSubmit(formData);
    }
  };

  const handleSelectType = (type: "company" | "individual") => {
    setAccountType(type);
    setFormData((prev) => ({ ...prev, type }));
    setStep(1);
  };

  const onSubmit = async (data: FormValues) => {
    console.log(data.image);
    try {
      const formData = new FormData();
      formData.append("type", data.type);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      if (data.username !== undefined) {
        formData.append("user_name", data.username);
      }
      if (data.industry_type_id !== undefined) {
        formData.append("industry_type_id", data.industry_type_id.toString());
      }
      if (data.location !== undefined) {
        formData.append("location", data.location);
      }
      if (data.business_size !== undefined) {
        formData.append("business_size", data.business_size);
      }
      if (data.image) {
        const response = await fetch(data.image);
        const blob = await response.blob();
        formData.append("image", {
          uri: data.image,
          name: `photo.${blob.type.split("/")[1]}`, // e.g., "photo.jpeg"
          type: blob.type, // e.g., "image/jpeg"
        } as any);
      }
      if (data.files) {
        data.files.forEach((file, index) => {
          formData.append(`files[${index}]`, {
            uri: file.uri,
            name: file.name,
            type: file.type,
          } as any);
        });
      }

      console.log(formData);
      // const response = await axios.post(
      //   "https://new.aeboards.net/api/auth/register",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Accept: "application/json",
      //     },
      //   }
      // );
      // dispatch({
      //   type: "LOGIN",
      //   payload: {
      //     token: response.data.data.token,
      //     user: {
      //       email: response.data.data.email,
      //       accountType: response.data.data.type,
      //     },
      //   },
      // });
      Alert.alert("Success", "Please verify your email.");
      router.push({
        pathname: "/auth/verify-email",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const apiErrorMessage = error.response.data?.message;
          console.log(apiErrorMessage);
          if (apiErrorMessage === "User already exist") {
            Toast.show("This user already exists. Please log in..", {
              duration: Toast.durations.LONG,
              backgroundColor: Colors.light.danger,
              opacity: 1,
            });
          } else {
            Toast.show(
              apiErrorMessage || "Registration failed. Please try again.",
              {
                duration: Toast.durations.LONG,
                backgroundColor: Colors.light.danger,
                opacity: 1,
              }
            );
          }
        }
      } else {
        console.error(error);
        Toast.show("An unexpected error occurred. Please try again.", {
          duration: Toast.durations.LONG,
          backgroundColor: Colors.light.danger,
          opacity: 1,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      {step === 0 ? (
        // Account Type Selection Screen (Step 0)
        <View style={styles.buttonContainer}>
          <Text style={[mainstyles.title2, { textAlign: "center" }]}>
            Select Account Type
          </Text>
          <CustomButton
            title="Company"
            onPress={() => handleSelectType("company")}
          />
          <CustomButton
            title="Individual"
            onPress={() => handleSelectType("individual")}
          />
        </View>
      ) : accountType === "company" ? (
        // Render Company Form Steps
        step === 1 ? (
          <CompanyFormStep onNextStep={handleNextStep} />
        ) : (
          <CompanyFormStepTwo onNextStep={handleNextStep} />
        )
      ) : (
        // Render Individual Form Steps
        <IndividualFormStep />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  buttonContainer: {
    gap: 16,
  },
});
