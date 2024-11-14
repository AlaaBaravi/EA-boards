import { FC, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import DateTimePicker from "@react-native-community/datetimepicker";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { addBillboardSchema, BillboardFormData } from "@/constants/Schemas";
import CustomInputField from "./CustomInputField";
import CustomPickerField from "./CustomPickerField";
import CustomButton from "../ui/CustomButton";
import Error from "../ui/Error";
import Loading from "../ui/Loading";
import { useRegions } from "@/hooks/useRegions";
import { useBillboardTypes } from "@/hooks/useBillboardTypes";
import { useAddBillboard } from "@/hooks/billboards/useAddBillboard";
import { useAuth } from "@/store/authContext";

const width = Dimensions.get("window").width;

const AddBillboardForm: FC = () => {
  const [startDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const { state } = useAuth();
  console.log(state.token);

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
      region_id: undefined,
      billboard_type_id: undefined,
      kind: "paper",
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
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      console.log("Document picking was canceled");
      return;
    }

    if (result.assets && Array.isArray(result.assets)) {
      const newFiles = result.assets.map((file) => ({
        uri: file.uri,
        name: file.name || "Unknown",
        type: file.mimeType || "unknown",
      }));

      const currentFiles = getValues("files") || [];
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

  const isPending = typesLoading || regionsLoading || isAdding;
  const error = typesError || regionsError;

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    Toast.show(
      typesError?.message ||
        regionsError?.message ||
        "An error occurred while loading data.",
      {
        backgroundColor: Colors.light.danger,
      }
    );
    {
      Toast.show("An error occurred while loading data.", {
        backgroundColor: Colors.light.danger,
      });
      return <Error errorMessage={error?.message} />;
    }
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

            <Controller
              control={control}
              name="start_date_crowded"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Button
                    title="Select Start Date"
                    onPress={() => setStartDatePickerVisible(true)}
                  />
                  {value && <Text>Selected Date: {value.toDateString()}</Text>}
                  {startDatePickerVisible && (
                    <DateTimePicker
                      value={value || new Date()}
                      mode="time"
                      display="default"
                      onChange={(event, date) => {
                        setStartDatePickerVisible(false);
                        if (date) onChange(date);
                      }}
                    />
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="end_date_crowded"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Button
                    title="Select end Date"
                    onPress={() => setEndDatePickerVisible(true)}
                  />
                  {value && <Text>Selected Date: {value.toDateString()}</Text>}
                  {endDatePickerVisible && (
                    <DateTimePicker
                      value={value || new Date()}
                      mode="time"
                      display="default"
                      onChange={(event, date) => {
                        setEndDatePickerVisible(false);
                        if (date) onChange(date);
                      }}
                    />
                  )}
                </View>
              )}
            />

            {/* <CustomInputField
              control={control}
              errors={errors}
              fieldName="start_date_crowded"
              label="Start Time Crowded:"
            /> */}

            {/* <CustomInputField
              control={control}
              errors={errors}
              fieldName="end_date_crowded"
              label="End Time Crowded:"
            /> */}

            <CustomInputField
              control={control}
              errors={errors}
              fieldName="number_booking_day"
              label="Number Of Booking Days:"
              isNumeric={true}
            />
          </View>
        )}

        {/* Price in regular Field */}
        {selectedKind === "paper" && (
          <CustomInputField
            control={control}
            errors={errors}
            fieldName="price_on_regular"
            label="Price per day:"
          />
        )}

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
          title="Done"
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        />
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
