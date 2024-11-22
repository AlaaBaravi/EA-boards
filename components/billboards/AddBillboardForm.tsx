import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons, Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { addBillboardSchema, BillboardFormData } from "@/constants/Schemas";
import { useRegions } from "@/hooks/info/useRegions";
import { useBillboardTypes } from "@/hooks/info/useBillboardTypes";
import { useAddBillboard } from "@/hooks/billboards/useAddBillboard";

import CustomButton from "@/components/ui/CustomButton";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import CustomPickerField from "@/components/ui/CustomPickerField";
import CustomTextInput from "@/components/ui/CustomTextInput";
import CustomTimePicker from "../ui/CustomTimePicker";

const width = Dimensions.get("window").width;

const AddBillboardForm = () => {
  const {
    data: billboardTypes,
    isPending: typesLoading,
    error: typesError,
  } = useBillboardTypes();

  const {
    data: regions,
    isPending: regionsLoading,
    error: regionsError,
  } = useRegions();

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
      location: "",
      kind: "paper",
      location_description: undefined,
      billboard_description: undefined,
      width_description: undefined,
      height_description: undefined,
      reach_from_description: undefined,
      reach_to_description: undefined,
      region_id: 1,
      billboard_type_id: 1,
      start_date_crowded: undefined,
      end_date_crowded: undefined,
      price_on_regular: undefined,
      price_on_crowded: undefined,
      number_booking_day: undefined,
      files: [],
    },
  });

  const selectedKind = watch("kind");

  const pickImage = async () => {
    const currentFiles = getValues("files") || [];

    // Check if the user already uploaded 6 files
    if (currentFiles.length >= 6) {
      alert("You can upload a maximum of 6 images.");
      return;
    }

    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*", // Only allow images
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      return;
    }

    if (result.assets && Array.isArray(result.assets)) {
      const newFiles = result.assets.map((file) => ({
        uri: file.uri,
        name: file.name || "Unknown",
        type: file.mimeType || "unknown",
      }));

      setValue("files", [...currentFiles, ...newFiles]);
    }
  };

  const removeImage = (uri: string) => {
    const currentImages = getValues("files") || [];
    const updatedImages = currentImages.filter((image) => image.uri !== uri);
    setValue("files", updatedImages);
  };

  const resetForm = () => {
    reset();
  };

  const { mutate: addBillboardMutation, isPending: isAdding } =
    useAddBillboard(resetForm);

  const onSubmit = (data: BillboardFormData) => {
    addBillboardMutation(data);
  };

  const isPending = typesLoading || regionsLoading;
  const error = typesError || regionsError;

  if (isPending) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.form}>
        <CustomTextInput
          control={control}
          error={errors.location}
          name="location"
          label="Location:"
        />

        <CustomTextInput
          control={control}
          error={errors.location_description}
          name="location_description"
          label="location description:"
        />

        <CustomPickerField
          control={control}
          error={errors.region_id}
          name="region_id"
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

        <CustomTextInput
          control={control}
          error={errors.title}
          name="title"
          label="Billboard Title:"
        />

        <CustomTextInput
          control={control}
          error={errors.name}
          name="name"
          label="Billboard Name:"
        />

        <CustomPickerField
          control={control}
          error={errors.billboard_type_id}
          name="billboard_type_id"
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

        <CustomPickerField
          control={control}
          error={errors.kind}
          name="kind"
          label="Billboard Kind:"
        >
          <Picker.Item label="digital" value="digital" />
          <Picker.Item label="paper" value="paper" />
        </CustomPickerField>

        {selectedKind === "digital" && (
          <View style={styles.digital}>
            <CustomTextInput
              control={control}
              error={errors.price_on_regular}
              name="price_on_regular"
              label="Price On Regular"
              keyboardType="number-pad"
            />

            <CustomTextInput
              control={control}
              error={errors.price_on_crowded}
              name="price_on_crowded"
              label="Price On Crowded:"
              keyboardType="number-pad"
            />

            <CustomTimePicker
              control={control}
              name="start_date_crowded"
              label="Start Time Crowded"
            />

            <CustomTimePicker
              control={control}
              name="end_date_crowded"
              label="End Time Crowded"
            />

            <CustomTextInput
              control={control}
              error={errors.video_length}
              name="video_length"
              label="Video lenght:"
              keyboardType="number-pad"
            />

            <CustomTextInput
              control={control}
              error={errors.video_repetition}
              name="video_repetition"
              label="Video repetition:"
              keyboardType="number-pad"
            />

            <CustomTextInput
              control={control}
              error={errors.number_booking_day}
              name="number_booking_day"
              label="Number Of Booking Days:"
              keyboardType="number-pad"
            />
          </View>
        )}

        <CustomTextInput
          control={control}
          error={errors.reviews}
          name="reviews"
          label="reviews"
          keyboardType="number-pad"
          containerStyle={{ flex: 1 }}
        />

        {selectedKind === "paper" && (
          <CustomTextInput
            control={control}
            error={errors.price_on_regular}
            name="price_on_regular"
            label="Price per day:"
            keyboardType="number-pad"
          />
        )}

        <View>
          <Text style={mainstyles.caption}>Size:</Text>
          <View style={styles.size}>
            <CustomTextInput
              control={control}
              error={errors.width_description}
              name="width_description"
              placeholder="EX: 6"
              keyboardType="number-pad"
              containerStyle={{ flex: 1 }}
            />
            <Text>x</Text>
            <CustomTextInput
              control={control}
              error={errors.height_description}
              name="height_description"
              placeholder="EX: 2"
              keyboardType="number-pad"
              containerStyle={{ flex: 1 }}
            />
          </View>
        </View>

        <View>
          <Text style={mainstyles.caption}>Reach Per hour:</Text>
          <View style={styles.size}>
            <CustomTextInput
              control={control}
              error={errors.reach_from_description}
              name="reach_from_description"
              placeholder="EX: 500"
              keyboardType="number-pad"
              containerStyle={{ flex: 1 }}
            />
            <Text>x</Text>
            <CustomTextInput
              control={control}
              error={errors.reach_to_description}
              name="reach_to_description"
              placeholder="EX: 2500"
              keyboardType="number-pad"
              containerStyle={{ flex: 1 }}
            />
          </View>
        </View>

        <CustomTextInput
          control={control}
          error={errors.billboard_description}
          name="billboard_description"
          label="Billboard Description:"
        />

        <View style={styles.inputContainer}>
          <Text style={mainstyles.caption}>Billboard Photos:</Text>
          <Pressable onPress={pickImage} style={styles.input}>
            <Text style={{ color: Colors.light.icon }}>Max 6 photos </Text>
            <Feather name="upload" size={24} color={Colors.light.icon} />
          </Pressable>
        </View>

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

        <CustomButton
          title={isAdding ? "Adding" : "Add"}
          onPress={handleSubmit(onSubmit)}
          disabled={isAdding}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
    gap: 12,
  },
  inputContainer: {
    width: "100%",
    gap: 4,
  },
  input: {
    ...mainstyles.input,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  digital: {
    width: "80%",
    gap: 12,
    margin: "auto",
  },
  size: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});

export default AddBillboardForm;
