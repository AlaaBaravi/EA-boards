import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import Constants from "expo-constants";
import { mainstyles } from "@/constants/Styles";
import { ProfileFormData, profileSchema } from "@/constants/Schemas";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/ui/CustomButton";
import BusinessSizeOption from "@/components/ui/BusinessSizeOption";
import Counter from "@/components/ui/Counter";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

import { useUserProfile } from "@/hooks/user/useUserProfile";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { useIndustries } from "@/hooks/info/useIndustries";
import CustomTextInput from "@/components/ui/CustomTextInput";
import CustomPickerField from "@/components/ui/CustomPickerField";
import GooglePlacesInput from "@/components/ui/GooglePlacesInput";

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
    reset,
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

  useEffect(() => {
    if (userData) {
      reset({
        phone: userData.phone || undefined,
        name: userData.name || undefined,
        username: userData.username || undefined,
        location: userData.location || undefined,
        industry_type_id: userData.industry_type_id || undefined,
        business_size: userData.business_size || undefined,
        // image: userData?.image,
      });
    }
  }, [userData, reset]);

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
    updateUserMutation(data);
  };

  const isLoading = industriesLoading || isUserData;
  const error = industriesError || userError;

  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;

  const imageUri = `${baseURL}/${
    userData?.image
  }?timestamp=${new Date().getTime()}`;

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, value } }) => (
            <Pressable
              onPress={() => pickImage(onChange)}
              style={{ margin: "auto" }}
            >
              <Image
                source={{
                  uri: value ? value : imageUri,
                }}
                style={styles.image}
              />
              <BlurView
                intensity={100}
                tint="light"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  zIndex: 10,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Ionicons
                  name="camera-outline"
                  size={24}
                  color={Colors.light.primary}
                />
              </BlurView>
            </Pressable>
          )}
        />

        <View style={{ gap: 12 }}>
          <Text style={[mainstyles.title2]}>Business Information</Text>

          <CustomTextInput
            control={control}
            name="username"
            error={errors.username}
            label={
              userData?.type === "individual" ? "username" : "business name"
            }
          />

          {/* <CustomTextInput
            control={control}
            name="location"
            error={errors.location}
            label="location"
          /> */}

          <GooglePlacesInput
            control={control}
            name="location"
            error={errors.location}
          />

          {userData?.type === "company" && (
            <>
              <CustomPickerField
                control={control}
                name="industry_type_id"
                error={errors.industry_type_id}
                label="industry type"
              >
                {industries?.map((option) => (
                  <Picker.Item
                    key={option.id}
                    label={option.name_en}
                    value={option.id}
                  />
                ))}
              </CustomPickerField>

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
            </>
          )}
        </View>

        <CustomButton
          title={isUpdating ? "Submitting..." : "Submit"}
          onPress={handleSubmit(onSubmit)}
          disabled={isUpdating}
        />
      </View>
    </ScrollView>
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
