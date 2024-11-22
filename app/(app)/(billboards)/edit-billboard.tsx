import React, { useEffect } from "react";
import { Text, ScrollView, StyleSheet, View, Dimensions } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mainstyles } from "@/constants/Styles";
import CustomButton from "@/components/ui/CustomButton";
import { useBillboardById } from "@/hooks/billboards/useBillboardById";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/store/authContext";
import CustomTextInput from "@/components/ui/CustomTextInput";
import { Picker } from "@react-native-picker/picker";
import {
  EditBillboardFormData,
  editBillboardFormSchema,
} from "@/constants/Schemas";

import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useEditBillboards } from "@/hooks/billboards/useEditBillboards";
import { useBillboardTypes } from "@/hooks/info/useBillboardTypes";
import { useRegions } from "@/hooks/info/useRegions";
import CustomPickerField from "@/components/ui/CustomPickerField";

const width = Dimensions.get("window").width;

const EditBillboard = () => {
  const { id } = useLocalSearchParams();
  const { state } = useAuth();
  const myId = Array.isArray(id) ? id[0] : id;

  const {
    data: billboard,
    isPending: isBillboard,
    error: billboardError,
  } = useBillboardById(myId, state.token!);

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
    control,
    reset,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<EditBillboardFormData>({
    resolver: zodResolver(editBillboardFormSchema),
    defaultValues: {
      billboard_id: Number(myId),
      title: "",
      name: "",
      price_on_day: "",
    },
  });
  const selectedKind = watch("kind");

  useEffect(() => {
    if (billboard) {
      reset({
        billboard_id: billboard.id || 0,
        title: billboard.title || "",
        name: billboard.name || "",
        price_on_day: billboard.price_on_regular || "",
        location: billboard.location || undefined,
        region_id: billboard.region.id || undefined,
        billboard_type_id: billboard.billboard_type_id.id || undefined,
        reviews: billboard.reviews || undefined,
        status: billboard.status || undefined,
        kind: billboard.kind || undefined,
        video_length: billboard.video_length || undefined,
        video_repetition: billboard.video_repetition || undefined,
        number_booking_day: billboard.number_booking_day || undefined,
        height_description:
          JSON.parse(billboard.description).height || undefined,
        width_description: JSON.parse(billboard.description).width || undefined,
        reach_from_description:
          JSON.parse(billboard.description).from || undefined,
        reach_to_description: JSON.parse(billboard.description).to || undefined,
        billboard_description:
          JSON.parse(billboard.description).billboard || undefined,
        location_description:
          JSON.parse(billboard.description).location || undefined,
      });
    }
  }, [billboard, reset]);

  const { mutate: editBillboardMutation, isPending: isEditing } =
    useEditBillboards();

  const onSubmit = (data: EditBillboardFormData) => {
    console.log(data);
    editBillboardMutation(data);
  };

  const isPending = isBillboard || typesLoading || regionsLoading;
  const error = billboardError || typesError || regionsError;

  if (isPending) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;

  return (
    <ScrollView contentContainerStyle={styles.form}>
      <CustomTextInput
        control={control}
        name="title"
        label="Title:"
        error={errors.title}
      />
      <CustomTextInput
        control={control}
        name="name"
        label="Name:"
        error={errors.name}
      />
      <CustomTextInput
        control={control}
        name="price_on_day"
        label="price on day:"
        keyboardType="number-pad"
        error={errors.price_on_day}
      />
      <CustomTextInput
        control={control}
        name="location"
        label="location:"
        error={errors.location}
      />
      <CustomTextInput
        control={control}
        error={errors.location_description}
        name="location_description"
        label="Location Description:"
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
      <CustomTextInput
        control={control}
        name="reviews"
        label="reviews:"
        keyboardType="number-pad"
        error={errors.reviews}
      />
      <CustomPickerField
        control={control}
        error={errors.kind}
        name="status"
        label="status:"
      >
        <Picker.Item label="opened" value="Opened" />
        <Picker.Item label="closed" value="Closed" />
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
            name="video_length"
            label="video length:"
            keyboardType="number-pad"
            error={errors.video_length}
          />
          <CustomTextInput
            control={control}
            name="video_repetition"
            label="video repetition:"
            keyboardType="number-pad"
            error={errors.video_repetition}
          />
          <CustomTextInput
            control={control}
            name="number_booking_day"
            label="number of booking days:"
            keyboardType="number-pad"
            error={errors.number_booking_day}
          />
        </View>
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
            // placeholder="EX: 500"
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

      <CustomButton
        title={isEditing ? "Submitting..." : "Submit"}
        onPress={handleSubmit(onSubmit)}
        disabled={isEditing}
      />
    </ScrollView>
  );
};

export default EditBillboard;

const styles = StyleSheet.create({
  form: {
    padding: 20,
    gap: 12,
  },
  inputError: {
    borderColor: "red",
  },
  size: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  digital: {
    width: "80%",
    gap: 12,
    margin: "auto",
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
});
