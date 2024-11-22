import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCompanies } from "@/hooks/info/useCompanies";
import { useBillboardTypes } from "@/hooks/info/useBillboardTypes";
import { useRegions } from "@/hooks/info/useRegions";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";

import {
  FilterBillboardsFormData,
  filterBillboardsSchema,
} from "@/constants/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomPickerField from "@/components/ui/CustomPickerField";
import { mainstyles } from "@/constants/Styles";
import CustomButton from "@/components/ui/CustomButton";

const FilterBillboards = () => {
  const {
    data: companies,
    isPending: isCompanies,
    error: companyError,
  } = useCompanies();
  const {
    data: billboardTypes,
    isPending: isBillboardTypes,
    error: billboardTypesError,
  } = useBillboardTypes();
  const {
    data: regions,
    isPending: isRegions,
    error: regionsError,
  } = useRegions();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FilterBillboardsFormData>({
    resolver: zodResolver(filterBillboardsSchema),
  });

  const isPending = isCompanies || isBillboardTypes || isRegions;
  const error = companyError || billboardTypesError || regionsError;

  if (isPending) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;

  const onSubmit = (data: FilterBillboardsFormData) => {
    console.log(data);
  };

  return (
    <View style={styles.form}>
      <CustomPickerField
        control={control}
        name="company_id"
        error={errors.company_id}
        label="Company"
      >
        {companies?.map((option) => (
          <Picker.Item key={option.id} label={option.name} value={option.id} />
        ))}
      </CustomPickerField>

      <CustomPickerField
        control={control}
        name="billboard_type_id"
        error={errors.billboard_type_id}
        label="Type"
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
        name="region_id"
        error={errors.region_id}
        label="Location"
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
        name="kind"
        error={errors.kind}
        label="Kind"
      >
        <Picker.Item label="digital" value="digital" />
        <Picker.Item label="paper" value="paper" />
      </CustomPickerField>

      <CustomButton title="Next" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default FilterBillboards;

const styles = StyleSheet.create({
  form: { flex: 1, padding: 24 },
});
