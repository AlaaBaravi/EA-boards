import React, { FC, useContext, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

import CustomButton from "../ui/CustomButton";
import { FormContext } from "@/store/signupContext";
import { mainstyles } from "@/constants/Styles";

import { Colors } from "@/constants/Colors";
import { Image } from "react-native";
import CustomTextInput from "../ui/CustomTextInput";
const companyStepSchemaTwo = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
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
  files: z
    .array(
      z.object({
        uri: z.string(),
        name: z.string(),
        type: z.string(),
      })
    )
    .optional(),
});

type CompanyFormStepTwoData = z.infer<typeof companyStepSchemaTwo>;

interface Props {
  onNextStep: (data: CompanyFormStepTwoData) => void;
  onPrevStep: () => void;
}

const CompanyFormStepTwo: FC<Props> = ({ onNextStep, onPrevStep }) => {
  const { formData } = useContext(FormContext);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormStepTwoData>({
    resolver: zodResolver(companyStepSchemaTwo),
    defaultValues: { image: undefined },
  });

  const handleFilePick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*", // Adjust the file type as needed
      copyToCacheDirectory: true,
    });

    // Check if the document picking was canceled
    if (result.canceled) {
      return;
    }

    // If assets exist, add them to the files array
    if (result.assets && Array.isArray(result.assets)) {
      const newFiles = result.assets.map((file) => ({
        uri: file.uri,
        name: file.name || "Unknown",
        type: file.mimeType || "unknown",
      }));

      // Use getValues to retrieve the current value of files
      const currentFiles = getValues("files") || [];
      setValue("files", [...currentFiles, ...newFiles, ...formData.files!]);
    }
  };

  const pickImage = async () => {
    const currentImage = getValues("image") || undefined;

    if (currentImage) {
      setErrorMessage("You can only upload a maximum one image");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImage = result.assets[0].uri;
      setValue("image", newImage);
      setErrorMessage("");
    }
  };

  const removeImage = () => {
    const updatedImage = undefined;
    setValue("image", updatedImage);
  };

  const onSubmit = (data: CompanyFormStepTwoData) => {
    onNextStep(data);
  };

  return (
    <View>
      <CustomTextInput
        control={control}
        name="name"
        error={errors.name}
        placeholder="name"
      />

      <CustomTextInput
        control={control}
        name="email"
        error={errors.email}
        placeholder="email"
        keyboardType="email-address"
      />

      <CustomTextInput
        control={control}
        name="phone"
        error={errors.phone}
        placeholder="Phone Number"
        keyboardType="phone-pad"
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

      {/* File upload */}
      <Pressable onPress={handleFilePick} style={styles.pressable}>
        <Text style={{ color: Colors.light.icon }}>Upload Company Files</Text>
        <Feather name="upload" size={24} color={Colors.light.icon} />
      </Pressable>

      {/* Display selected files */}
      <Controller
        control={control}
        name="files"
        render={({ field: { value } }) => (
          <View>
            {value?.map((file, index) => (
              <Text
                key={index}
                style={[mainstyles.caption, { color: Colors.light.primary }]}
              >
                {file.name}
              </Text>
            ))}
          </View>
        )}
      />
      {errors.files && <Text style={styles.error}>{errors.files.message}</Text>}

      <Pressable onPress={pickImage} style={styles.pressable}>
        <Text style={{ color: Colors.light.icon }}>Upload profile Image</Text>
        <Feather name="upload" size={24} color={Colors.light.icon} />
      </Pressable>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {getValues().image !== undefined && (
              <View style={{ position: "relative", margin: 5 }}>
                <Image
                  source={{ uri: field.value }}
                  style={{
                    borderRadius: 10,
                    width: 100,
                    height: 100,
                  }}
                />
                <Ionicons
                  name="trash"
                  size={20}
                  color="black"
                  style={{
                    color: Colors.light.danger,
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.774)",
                    borderRadius: 10,
                    padding: 3,
                  }}
                  onPress={() => removeImage()}
                />
              </View>
            )}
          </View>
        )}
      />
      <View style={styles.buttonsContainer}>
        <CustomButton title="Back" onPress={onPrevStep} />
        <CustomButton title="Next" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default CompanyFormStepTwo;

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
  pressable: {
    borderColor: Colors.light.primary,
    borderBottomWidth: 1,
    padding: 8,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});
