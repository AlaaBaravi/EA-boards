import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { zodResolver } from "@hookform/resolvers/zod";
import Constants from "expo-constants";
import { Octicons } from "@expo/vector-icons";

import { mainstyles } from "@/constants/Styles";
import { ProfileFormData, profileSchema } from "@/constants/Schemas";
import { Colors } from "@/constants/Colors";

import CustomHeader from "@/components/home/CustomHeader";
import CustomButton from "@/components/ui/CustomButton";
import BusinessSizeOption from "@/components/ui/BusinessSizeOption";
import Counter from "@/components/ui/Counter";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

import { useUserProfile } from "@/hooks/useUserProfile";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useIndustries } from "@/hooks/useIndustries";

const baseURL =
  Constants.expoConfig?.extra?.apiBaseUrl || "https://new.aeboards.net";

const AccountInfo = () => {
  const {
    data: industries,
    isLoading: industriesLoading,
    error: industriesError,
  } = useIndustries();

  const {
    data: userData,
    isLoading: isUserData,
    error: userError,
  } = useUserProfile();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phone: userData?.phone,
      name: userData?.name,
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

  const imageUri = `${baseURL}/${userData?.image}`;

  const pickImage = async (onChange: (value: string) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      onChange(uri);
    }
  };

  const { mutate: updateUserMutation, isPending: isUpdating } = useUpdateUser();

  const onSubmit = async (data: ProfileFormData) => {
    console.log(data.image);
    updateUserMutation(data);
  };

  const isLoading = industriesLoading || isUpdating || isUserData;
  const error = industriesError || userError;

  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;

  return (
    <>
      <CustomHeader>
        <Text style={mainstyles.title1}>Account info and settings</Text>
      </CustomHeader>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Image Picker controlled via Controller */}
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange, value } }) => (
              <>
                <Button
                  title="Pick an image from camera roll"
                  onPress={() => pickImage(onChange)}
                />
                {value && (
                  <Image source={{ uri: value }} style={styles.image} />
                )}
              </>
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
                      placeholder={userData?.username}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      // style={{ flex: 1 }}
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
                      placeholder={userData?.location || "Business Location"}
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
