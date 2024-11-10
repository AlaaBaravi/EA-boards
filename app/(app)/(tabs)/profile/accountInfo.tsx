import React, { ReactElement, useState } from "react";
import { View, Text, Button, Image, TextInput, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
  phone: z.string().min(1, "Phone is required"),
  name: z.string().min(1, "Name is required"),
  location: z.string().optional(),
  business_size: z.string().optional(),
  industry_type_id: z.number().optional(),
  username: z.string().min(1, "Username is required"),
  max_booking_days: z.number(),
  min_booking_days: z.number(),
  numbers_billboards: z.number(),
  image: z.any().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const AccountInfo: React.FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phone: "",
      name: "",
      location: "",
      business_size: "",
      industry_type_id: undefined,
      username: "",
      max_booking_days: 0,
      min_booking_days: 0,
      numbers_billboards: 0,
      image: null,
    },
  });

  const [selectedImage, setSelectedImage] = useState<{ uri: string } | null>(
    null
  );

  const pickImage = async (
    onChange: (value: { uri: string } | null) => void
  ) => {
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
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const formData = new FormData();
      formData.append("phone", data.phone);
      formData.append("name", data.name);
      formData.append("location", data.location || "");
      formData.append("business_size", data.business_size || "");
      formData.append(
        "industry_type_id",
        data.industry_type_id?.toString() || ""
      );
      formData.append("username", data.username);
      formData.append("max_booking_days", data.max_booking_days.toString());
      formData.append("min_booking_days", data.min_booking_days.toString());
      formData.append("numbers_billboards", data.numbers_billboards.toString());

      if (data.image && "uri" in data.image) {
        formData.append("image", {
          uri: data.image.uri,
          type: "image/jpeg", // Change based on the actual image type
          name: "profile.jpg",
        } as any);
      }

      const response = await axios.post(
        "https://new.aeboards.net/api/user/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>

      {/* Phone Input */}
      <Controller
        name="phone"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Text>Phone:</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
            {errors.phone && (
              <Text style={styles.error}>{errors.phone.message}</Text>
            )}
          </>
        )}
      />

      {/* Name Input */}
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Text>Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
            {errors.name && (
              <Text style={styles.error}>{errors.name.message}</Text>
            )}
          </>
        )}
      />

      {/* Image Picker */}
      <Controller
        name="image"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Text>Profile Image:</Text>
            <>
              {value ? (
                <Image
                  source={{ uri: value.uri }}
                  style={{ width: 100, height: 100 }}
                />
              ) : null}
              <Button
                title="Pick an Image"
                onPress={() => pickImage(onChange)}
              />
            </>
          </>
        )}
      />

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
  },
});

export default AccountInfo;
