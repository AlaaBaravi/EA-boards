import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";

import { Colors } from "@/constants/Colors";
import CustomButton from "../ui/CustomButton";
import { Industry } from "@/constants/Types";
import { getIndustries } from "@/util/https";
import BusinessSizeOption from "../ui/BusinessSizeOption";
import { mainstyles } from "@/constants/Styles";
import { Feather } from "@expo/vector-icons";
import { showToast } from "@/util/fn";
import Loading from "../ui/Loading";

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
  const [industries, setIndustries] = useState<Industry[]>();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const industriesData = await getIndustries();
        setIndustries(industriesData);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          showToast(
            err.response?.data?.message || "An error occurred",
            "danger"
          );
        } else {
          showToast("An unexpected error occurred", "danger");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilePick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*", // Adjust the file type as needed
      copyToCacheDirectory: true,
    });

    // Check if the document picking was canceled
    if (result.canceled) {
      console.log("Document picking was canceled");
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

  if (loading) return <Loading />;

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
        name="industry_type_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              dropdownIconColor={Colors.light.primary}
            >
              {industries?.map((option) => (
                <Picker.Item
                  key={option.id}
                  label={option.name_en}
                  value={option.id}
                />
              ))}
            </Picker>
          </View>
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

      <CustomButton title="Back" onPress={onPrevStep} />
      <CustomButton title="Next" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default CompanyFormStep;

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
