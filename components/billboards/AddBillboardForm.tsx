import React from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Feather from "@expo/vector-icons/Feather";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import CustomButton from "../ui/CustomButton";
import { mainstyles } from "@/constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

// Define Zod validation schema
const formSchema = z.object({
  title: z.string().nonempty("Title is required"),
  kind: z.enum(["digital", "paper"]).optional(),
  region_id: z.number().optional(),
  location: z.string().optional(),
  billboard_type_id: z.number().optional(),
  name: z.string().nonempty("Name is required"),
  price_on_regular: z.string().nonempty("Regular price is required"),
  price_on_crowded: z.string().nonempty("Crowded price is required"),
  start_date_crowded: z.string().nonempty("Start date is required"),
  end_date_crowded: z.string().nonempty("End date is required"),
  video_length: z.string().optional(),
  video_repetition: z.string().optional(),
  description: z.record(z.string(), z.string()).optional(),
  reviews: z.string().optional(),
  number_booking_day: z.number().optional(),
  files: z.array(z.any()).optional(),
});

// TypeScript type based on Zod schema
type FormData = z.infer<typeof formSchema>;

const AddBillboardForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", gap: 100, alignItems: "center" }}>
        <Feather
          name="chevron-left"
          size={32}
          color={Colors.light.secondary}
          onPress={() => router.back()}
        />
        <Text style={mainstyles.title1}>Add Billboard</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: 20,
          paddingHorizontal: 20,
        }}
      >
        {/* Description Field */}
        <View style={styles.row}>
          <Text>Location Description:</Text>
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value ? JSON.stringify(value) : ""}
                multiline
                numberOfLines={4}
              />
            )}
          />
        </View>

        {/* Region ID Field */}
        <View style={styles.row}>
          <Text>Region :</Text>
          <Controller
            name="region_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => onChange(Number(text))}
                value={value ? String(value) : ""}
              />
            )}
          />
        </View>

        {/* Title Field */}
        <View style={styles.row}>
          <Text>Billboard Title:</Text>
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.title && (
            <Text style={{ color: "red" }}>{errors.title.message}</Text>
          )}
        </View>

        {/* Name Field */}
        <View style={styles.row}>
          <Text>Billboard name:</Text>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && (
            <Text style={{ color: "red" }}>{errors.name.message}</Text>
          )}
        </View>

        {/* Billboard Type ID Field */}
        <View style={styles.row}>
          <Text>Billboard Type:</Text>
          <Controller
            name="billboard_type_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => onChange(Number(text))}
                value={value ? String(value) : ""}
              />
            )}
          />
        </View>

        {/* Kind Field */}
        <View style={styles.row}>
          <Text>Billboard Kind:</Text>
          <Controller
            name="kind"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value || ""}
              />
            )}
          />
        </View>

        {/* Reviews Field */}
        <View style={styles.row}>
          <Text>Reviews:</Text>
          <Controller
            name="reviews"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value || ""}
              />
            )}
          />
        </View>

        {/* Location Field */}
        <View style={styles.row}>
          <Text>Location:</Text>
          <Controller
            name="location"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value || ""}
              />
            )}
          />
        </View>

        {/* Price on Regular Field */}
        <View style={styles.row}>
          <Text>Price on Regular:</Text>
          <Controller
            name="price_on_regular"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value || ""}
              />
            )}
          />
          {errors.price_on_regular && (
            <Text style={{ color: "red" }}>
              {errors.price_on_regular.message}
            </Text>
          )}
        </View>

        {/* Price on Crowded Field */}
        <View style={styles.row}>
          <Text>Price on Crowded:</Text>
          <Controller
            name="price_on_crowded"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value || ""}
              />
            )}
          />
          {errors.price_on_crowded && (
            <Text style={{ color: "red" }}>
              {errors.price_on_crowded.message}
            </Text>
          )}
        </View>

        {/* Start Date Crowded Field */}
        <View style={styles.row}>
          <Text>Start Date Crowded:</Text>
          <Controller
            name="start_date_crowded"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value || ""}
                placeholder="YYYY-MM-DD"
              />
            )}
          />
          {errors.start_date_crowded && (
            <Text style={{ color: "red" }}>
              {errors.start_date_crowded.message}
            </Text>
          )}
        </View>

        {/* End Date Crowded Field */}
        <View style={styles.row}>
          <Text>End Date Crowded:</Text>
          <Controller
            name="end_date_crowded"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value || ""}
                placeholder="YYYY-MM-DD"
              />
            )}
          />
          {errors.end_date_crowded && (
            <Text style={{ color: "red" }}>
              {errors.end_date_crowded.message}
            </Text>
          )}
        </View>

        {/* Video Length Field */}
        <View style={styles.row}>
          <Text>Video Length:</Text>
          <Controller
            name="video_length"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value || ""}
              />
            )}
          />
        </View>

        {/* Video Repetition Field */}
        <View style={styles.row}>
          <Text>Video Repetition:</Text>
          <Controller
            name="video_repetition"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value || ""}
              />
            )}
          />
        </View>

        {/* Number of Booking Days Field */}
        <View style={styles.row}>
          <Text>Number of Booking Days:</Text>
          <Controller
            name="number_booking_day"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => onChange(Number(text))}
                value={value ? String(value) : ""}
              />
            )}
          />
        </View>

        {/* Files Field */}
        <View style={styles.row}>
          <Text>Files:</Text>
          <Controller
            name="files"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                value={value ? JSON.stringify(value) : ""}
                placeholder="Upload files"
              />
            )}
          />
        </View>

        <CustomButton title="Done" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: Colors.light.secondary,
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 12,
  },
});

export default AddBillboardForm;
