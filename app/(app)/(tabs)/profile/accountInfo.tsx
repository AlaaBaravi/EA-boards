import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomHeader from "@/components/home/CustomHeader";
import { mainstyles } from "@/constants/Styles";
import { ProfileFormData, profileSchema } from "@/constants/Schemas";
import { useAuth } from "@/store/authContext";
import Constants from "expo-constants";
import { Feather, Octicons } from "@expo/vector-icons";
import CustomButton from "@/components/ui/CustomButton";
import { Colors } from "@/constants/Colors";
import { getIndustries, updateUserProfile } from "@/util/https";
import { Industry } from "@/constants/Types";
import { showToast } from "@/util/fn";
import BusinessSizeOption from "@/components/ui/BusinessSizeOption";
import Counter from "@/components/ui/Counter";
import Loading from "@/components/ui/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const baseURL =
  Constants.expoConfig?.extra?.apiBaseUrl || "https://new.aeboards.net";

const AccountInfo = () => {
  const queryClient = useQueryClient();
  const { state, dispatch } = useAuth();
  const [selectedImage, setSelectedImage] = useState<{ uri: string } | null>(
    null
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phone: state.user?.phone,
      name: state.user?.name,
      location: undefined,
      business_size: undefined,
      industry_type_id: undefined,
      username: undefined,
      min_booking_days: 0,
      max_booking_days: 0,
      numbers_billboards: 0,
      image: undefined,
    },
  });

  const {
    data: industries,
    isLoading: industriesLoading,
    error: industriesError,
  } = useQuery<Industry[], Error>(["industries"], getIndustries, {
    onError: (error) =>
      showToast(error.message || "An error occurred", "danger"),
  });

  const { mutate: updateProfile, isLoading: updatingProfile } = useMutation({
    mutationFn: async (formData: FormData) => {
      return await updateUserProfile(formData, state.token!);
    },
    onSuccess: (response) => {
      showToast("Profile updated successfully", "success");
      queryClient.invalidateQueries(["userProfile"]);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        showToast(
          error.response?.data?.message || "An error occurred",
          "danger"
        );
      } else if (error instanceof Error) {
        showToast(error.message || "An unexpected error occurred", "danger");
      } else {
        showToast("An unknown error occurred", "danger");
      }
    },
  });

  const imageUri = selectedImage?.uri || `${baseURL}/${state.user?.image}`;

  const pickImage = async (
    onChange: (value: { uri: string } | null) => void
  ) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setSelectedImage({ uri: imageUri });
        onChange({ uri: imageUri });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      showToast("An error occurred while picking the image", "danger");
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    dispatch({ type: "UPDATE_USER", payload: data });
    const formData = new FormData();

    formData.append("phone", data.phone);
    formData.append("name", data.name);
    if (data.location) {
      formData.append("location", data.location);
    }
    if (data.business_size) {
      formData.append("business_size", data.business_size);
    }
    if (data.industry_type_id) {
      formData.append("industry_type_id", data.industry_type_id.toString());
    }
    if (data.username) {
      formData.append("username", data.username);
    }
    if (data.max_booking_days) {
      formData.append("max_booking_days", data.max_booking_days.toString());
    }
    if (data.min_booking_days) {
      formData.append("min_booking_days", data.min_booking_days.toString());
    }
    if (data.numbers_billboards) {
      formData.append("numbers_billboards", data.numbers_billboards.toString());
    }
    if (data.image) {
      const response = await fetch(data.image.uri);
      const blob = await response.blob();
      formData.append("image", {
        uri: data.image.uri,
        name: `profile.${blob.type.split("/")[1]}`,
        type: blob.type,
      } as any);
    }

    updateProfile(formData);
  };

  if (industriesLoading || updatingProfile) return <Loading />;
  if (industriesError) {
    showToast("Failed to load industries", "danger");
    return null;
  }

  return (
    <>
      <CustomHeader>
        <Text style={mainstyles.title1}>Account info and settings</Text>
      </CustomHeader>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Image Picker */}
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Pressable
                style={styles.imageContainer}
                onPress={() => pickImage(onChange)}
              >
                <Image source={{ uri: imageUri }} style={styles.image} />
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(44, 38, 38, 0.8)",
                    padding: 6,
                    borderRadius: 15,
                  }}
                >
                  <Feather name="camera" size={18} color="white" />
                </View>
              </Pressable>
            )}
          />

          <View style={{ gap: 12 }}>
            <Text style={[mainstyles.title2]}>Business Information</Text>

            {/* Company Name */}
            <View>
              <Text style={styles.label}>Business Name</Text>
              <Controller
                name="username"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder={state.user?.name}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      style={{ flex: 1 }}
                    />
                    <Octicons
                      name="pencil"
                      size={16}
                      color={Colors.light.icon}
                    />
                  </View>
                )}
              />
            </View>

            {/* Business Location */}
            <View>
              <Text style={styles.label}>Business Location</Text>
              <Controller
                control={control}
                name="location"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={{ flex: 1 }}
                      placeholder={state.user?.location || "Business Location"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <Octicons
                      name="pencil"
                      size={16}
                      color={Colors.light.icon}
                    />
                  </View>
                )}
              />
            </View>

            {/* Industry Type */}
            <View>
              <Text style={styles.label}>Industry Type</Text>
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
            </View>

            {/* Business Size */}
            <View>
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
            </View>

            {/* Counter for Minimum Booking days */}
            <Controller
              name="min_booking_days"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Counter
                  label="Minimum Number Of Booking days In One Reservation :"
                  min={1}
                  max={100}
                  value={value ?? 0}
                  onChange={onChange}
                />
              )}
            />

            {/* Counter for Maximum Booking days */}
            <Controller
              name="max_booking_days"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Counter
                  label="Maximum number of Booking days In one reservation :"
                  min={1}
                  max={100}
                  value={value ?? 0}
                  onChange={onChange}
                />
              )}
            />

            {/* Counter for Number of Billboards */}
            <Controller
              name="numbers_billboards"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Counter
                  label="Number Of Billboards In One Reservation :"
                  min={1}
                  max={100}
                  value={value ?? 0}
                  onChange={onChange}
                />
              )}
            />
          </View>
          <CustomButton title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </>
  );
};

export default AccountInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 24,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  error: {
    ...mainstyles.caption,
    color: Colors.light.danger,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginHorizontal: "auto",
    position: "relative",
  },
  image: { width: 100, height: 100, borderRadius: 50 },
  label: {
    ...mainstyles.caption,
    color: Colors.light.icon,
  },
  inputContainer: {
    ...mainstyles.input,
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
});
