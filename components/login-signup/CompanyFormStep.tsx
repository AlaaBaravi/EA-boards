import React, { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";

import { Colors } from "@/constants/Colors";
import CustomButton from "../ui/CustomButton";
import BusinessSizeOption from "../ui/BusinessSizeOption";
import { mainstyles } from "@/constants/Styles";
import { Feather } from "@expo/vector-icons";
import Loading from "../ui/Loading";
import CustomTextInput from "../ui/CustomTextInput";
import { useIndustries } from "@/hooks/info/useIndustries";
import Error from "../ui/Error";
import CustomPickerField from "../ui/CustomPickerField";
import GooglePlacesInput from "../ui/GooglePlacesInput";

const companyStepSchema = z.object({
  username: z.string().optional(),
  industry_type_id: z.number().optional(),
  location: z.string().optional(),
  business_size: z.string().optional(),
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

type CompanyFormStepData = z.infer<typeof companyStepSchema>;

interface Props {
  onNextStep: (data: CompanyFormStepData) => void;
  onPrevStep: () => void;
}

const CompanyFormStep: FC<Props> = ({ onNextStep, onPrevStep }) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CompanyFormStepData>({
    resolver: zodResolver(companyStepSchema),
    defaultValues: {
      username: "",
      industry_type_id: undefined,
      location: "",
      business_size: "",
      files: [],
    },
  });

  const {
    data: industries,
    isPending: isIndustries,
    error: industriesError,
  } = useIndustries();

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
      setValue("files", [...currentFiles, ...newFiles]);
    }
  };

  const onSubmit = (data: CompanyFormStepData) => {
    onNextStep(data);
  };

  if (isIndustries) return <Loading />;
  if (industriesError) return <Error errorMessage={industriesError.message} />;

  return (
    <View>
      <GooglePlacesInput
        control={control}
        name="location"
        error={errors.location}
      />

      <CustomTextInput
        control={control}
        name="username"
        error={errors.username}
        placeholder="Business Name"
      />

      <CustomPickerField
        control={control}
        name="industry_type_id"
        error={errors.industry_type_id}
      >
        {industries?.map((option) => (
          <Picker.Item
            key={option.id}
            label={option.name_en}
            value={option.id}
          />
        ))}
      </CustomPickerField>

      {/* <CustomTextInput
        control={control}
        name="location"
        error={errors.location}
        placeholder="Business Location"
      /> */}

      {/* File upload */}
      <Pressable onPress={handleFilePick} style={styles.pressable}>
        <Text style={{ color: Colors.light.icon }}>
          Upload Trade License File
        </Text>
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
      {errors.files && (
        <Text style={styles.errorText}>{errors.files.message}</Text>
      )}

      <Text style={styles.text}>Business size?</Text>
      <Controller
        control={control}
        name="business_size"
        render={({ field: { onChange, value } }) => (
          <View style={styles.optionsContainer}>
            <BusinessSizeOption
              label="2-49"
              selected={value === "2-49"}
              onPress={() => onChange("2-49")}
              iconName="office-building"
            />
            <BusinessSizeOption
              label="50-499"
              selected={value === "50-499"}
              onPress={() => onChange("50-499")}
              iconName="office-building-outline"
            />
            <BusinessSizeOption
              label="500+"
              selected={value === "500+"}
              onPress={() => onChange("500+")}
              iconName="domain"
            />
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

export default CompanyFormStep;

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
  pressable: {
    borderColor: Colors.light.primary,
    borderBottomWidth: 1,
    padding: 8,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerContainer: {
    borderColor: Colors.light.primary,
    borderBottomWidth: 1,
    borderRadius: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  text: {
    ...mainstyles.title1,
    color: Colors.light.primary,
    textAlign: "center",
    marginVertical: 10,
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
