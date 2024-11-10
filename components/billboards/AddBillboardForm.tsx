import axios from "axios";
import Feather from "@expo/vector-icons/Feather";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Image,
  Button,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import CustomButton from "../ui/CustomButton";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/store/authContext";
import { FC, useEffect, useState } from "react";
import { BillboardType, Region } from "@/constants/Types";
import Toast from "react-native-root-toast";
import SwipeRating from "react-native-ratings/dist/SwipeRating";
import { addBillboardSchema, BillboardFormData } from "@/constants/Schemas";
import { getBillboardTypes, getRegions } from "@/util/https";
import { Ionicons } from "@expo/vector-icons";
import CustomInputField from "./CustomInputField";
import CustomPickerField from "./CustomPickerField";

const width = Dimensions.get("window").width;

const AddBillboardForm: FC = () => {
  const { state } = useAuth();
  const [billboardTypes, setBillboardTypes] =
    useState<Array<BillboardType> | null>(null);
  const [regions, setRegions] = useState<Array<Region> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    reset,
    setValue,
    getValues,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BillboardFormData>({
    resolver: zodResolver(addBillboardSchema),
    defaultValues: {
      title: "",
      name: "",
      location: "",
      kind: "paper",
      region_id: 1,
      billboard_type_id: 1,
      files: [],
    },
  });

  const selectedKind = watch("kind");

  // console.log(state.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const billboardTypesData = await getBillboardTypes();
        setBillboardTypes(billboardTypesData);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regionsData = await getRegions();
        setRegions(regionsData);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // const pickImage = async () => {
  //   const currentImages = getValues("files") || [];

  //   if (currentImages.length >= 6) {
  //     setErrorMessage("You can only upload a maximum of 6 images");
  //     return;
  //   }

  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsMultipleSelection: false,
  //     quality: 1,
  //   });

  //   if (!result.canceled && result.assets && result.assets.length > 0) {
  //     const newImages = [...currentImages, result.assets[0].uri];
  //     setValue("files", newImages);
  //     setErrorMessage("");
  //   }
  // };

  const pickImage = async () => {
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

  const removeImage = (uri: string) => {
    const currentImages = getValues("files") || [];
    const updatedImages = currentImages.filter((image) => image.uri !== uri);
    setValue("files", updatedImages);
  };

  const onSubmit = (data: BillboardFormData) => {
    console.log("Done");
    console.log(data);
    const formData = new FormData();
    if (data.name !== undefined) {
      formData.append("name", data.name);
    }
    if (data.price_on_regular !== undefined) {
      formData.append("price_on_regular", data.price_on_regular);
    }
    if (data.price_on_crowded !== undefined) {
      formData.append("price_on_crowded", data.price_on_crowded);
    }
    if (data.start_date_crowded !== undefined) {
      formData.append("start_date_crowded", data.start_date_crowded);
    }
    if (data.end_date_crowded !== undefined) {
      formData.append("end_date_crowded", data.end_date_crowded);
    }
    if (data.number_booking_day !== undefined) {
      formData.append("number_booking_day", data.number_booking_day.toString());
    }
    if (data.reviews !== undefined) {
      formData.append("reviews", data.reviews);
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

    formData.append("title", data.title);
    formData.append("kind", data.kind);
    formData.append("region_id", data.region_id.toString());
    formData.append("billboard_type_id", data.billboard_type_id.toString());
    formData.append("location", data.location);

    const addBillboard = async (authKey: string) => {
      try {
        const response = await axios.post(
          "https://new.aeboards.net/api/billboard/add",
          data,
          {
            headers: {
              Authorization: `Bearer ${authKey}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        Toast.show("Billboard added successfully.", {
          duration: Toast.durations.LONG,
          backgroundColor: "#198754",
          opacity: 1,
        });
        reset();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data);
        } else {
          console.error("Unknown error:", error);
        }
      }
    };
    const authKey = state.token!;
    addBillboard(authKey);
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.light.primary} />;
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", gap: 100, alignItems: "center" }}>
        <Feather
          name="chevron-left"
          size={32}
          color={Colors.light.primary}
          onPress={() => router.back()}
        />
        <Text style={mainstyles.title1}>Add Billboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        {/* Location Field */}
        <CustomInputField
          control={control}
          errors={errors}
          fieldName="location"
          label="Location:"
        />

        {/* Region Field */}
        <CustomPickerField
          control={control}
          errors={errors}
          fieldName="region_id"
          label="Region:"
        >
          {regions?.map((option) => (
            <Picker.Item
              key={option.id}
              label={option.name_en}
              value={option.id}
            />
          ))}
        </CustomPickerField>

        {/* Title Field */}
        <CustomInputField
          control={control}
          errors={errors}
          fieldName="title"
          label="Billboard Title:"
        />

        {/* Name Field */}
        <CustomInputField
          control={control}
          errors={errors}
          fieldName="name"
          label="Billboard Name:"
        />

        {/* Billboard Type Field */}
        <CustomPickerField
          control={control}
          errors={errors}
          fieldName="billboard_type_id"
          label="Billboard Type:"
        >
          {billboardTypes?.map((option) => (
            <Picker.Item
              key={option.id}
              label={option.text_en}
              value={option.id}
            />
          ))}
        </CustomPickerField>

        {/* Kind Field */}
        <CustomPickerField
          control={control}
          errors={errors}
          fieldName="kind"
          label="Billboard Kind:"
        >
          <Picker.Item label="digital" value="digital" />
          <Picker.Item label="paper" value="paper" />
        </CustomPickerField>

        {selectedKind === "digital" && (
          <View style={styles.digital}>
            <CustomInputField
              control={control}
              errors={errors}
              fieldName="price_on_crowded"
              label="Price On Crowded:"
            />

            <CustomInputField
              control={control}
              errors={errors}
              fieldName="price_on_regular"
              label="Price On Regular"
            />

            <CustomInputField
              control={control}
              errors={errors}
              fieldName="start_date_crowded"
              label="Start Time Crowded:"
            />

            <CustomInputField
              control={control}
              errors={errors}
              fieldName="end_date_crowded"
              label="End Time Crowded:"
            />

            <CustomInputField
              control={control}
              errors={errors}
              fieldName="number_booking_day"
              label="Number Of Booking Days:"
              isNumeric={true}
            />
          </View>
        )}

        {/* Reviews Field */}
        {/* <View style={styles.inputContainer}>
          <Text style={mainstyles.caption}>Reviews:</Text>
          <Controller
            name="reviews"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SwipeRating
                imageSize={32}
                ratingCount={5}
                startingValue={Number(value)}
                onSwipeRating={(rating) =>
                  setValue("reviews", rating.toString())
                }
                showRating={false}
              />
            )}
          />
        </View>
        {errors.reviews && (
          <Text style={{ color: Colors.light.danger }}>
            {errors.reviews.message}
          </Text>
        )} */}

        {/* Price in regular Field */}
        {selectedKind === "paper" && (
          <CustomInputField
            control={control}
            errors={errors}
            fieldName="price_on_regular"
            label="Price per day:"
          />
        )}

        {/* Description Field */}
        {/* <View style={styles.inputContainer}>
          <Text style={mainstyles.caption}>Description:</Text>
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
          />
        </View>
        {errors.description && (
          <Text style={{ color: Colors.light.danger }}>
            {errors.description.message}
          </Text>
        )} */}

        <View style={styles.inputContainer}>
          <Text style={mainstyles.caption}>Billboard Photos:</Text>
          <Pressable onPress={pickImage} style={styles.input}>
            <Text style={{ color: Colors.light.icon }}>Max 6 photos </Text>
            <Feather name="upload" size={24} color={Colors.light.icon} />
          </Pressable>
        </View>

        {errorMessage ? (
          <Text style={{ color: Colors.light.danger }}>{errorMessage}</Text>
        ) : null}

        <Controller
          name="files"
          control={control}
          render={({ field: { value } }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: 20,
              }}
            >
              {value.map((image, index) => (
                <View key={index} style={{ position: "relative", margin: 5 }}>
                  <Image
                    source={{ uri: image.uri }}
                    style={{
                      width: (width - 100) / 6,
                      height: (width - 100) / 6,
                      borderRadius: 10,
                    }}
                  />
                  <Ionicons
                    name="trash"
                    size={12}
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
                    onPress={() => removeImage(image.uri)}
                  />
                </View>
              ))}
            </View>
          )}
        />

        <CustomButton title="Done" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    paddingBottom: 100,
    paddingTop: 20,
    paddingHorizontal: 20,
    gap: 12,
    alignItems: "center",
  },
  pickerContainer: {
    borderColor: Colors.light.primary,
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    gap: 4,
  },
  input: {
    borderColor: Colors.light.primary,
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  digital: {
    width: "80%",
    gap: 12,
  },
});

export default AddBillboardForm;
