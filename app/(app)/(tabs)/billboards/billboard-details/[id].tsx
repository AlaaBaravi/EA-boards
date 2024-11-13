import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { mainstyles } from "@/constants/Styles";
import axios from "axios";
import { Colors } from "@/constants/Colors";
import { Billboard } from "@/constants/Types";
import { deleteBillboardById, getBillboardById } from "@/util/https";
import { useAuth } from "@/store/authContext";
import BillboardImage from "@/components/billboards/BillboardImage";
import { Ionicons, Octicons } from "@expo/vector-icons";
import BillboardInfo from "@/components/billboards/BillboardInfo";
import { showToast } from "@/util/fn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/ui/Loading";

const BillboardDetails = () => {
  const { id } = useLocalSearchParams();
  const { state } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: billboard,
    isLoading,
    isError,
    error,
  } = useQuery<Billboard, Error>(
    ["billboard", id],
    () => getBillboardById(id.toString(), state.token!),
    {
      enabled: !!id && !!state.token,
    }
  );

  const deleteMutation = useMutation(
    () => deleteBillboardById(billboard!.id.toString(), state.token!),
    {
      onSuccess: () => {
        showToast("The billboard has been deleted successfully.", "success");
        queryClient.invalidateQueries(["billboards"]); // Refresh the billboards list
        router.push("/(app)/(tabs)/billboards");
      },
      onError: () => {
        showToast("An error occurred while deleting the billboard.", "danger");
      },
    }
  );

  const confirmDelete = () => {
    Alert.alert(
      "Delete Billboard",
      "Are you sure you want to delete this billboard?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => deleteMutation.mutate() },
      ],
      { cancelable: true }
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || "An error occurred"
      : "An unexpected error occurred";

    showToast(errorMessage, "danger");

    return (
      <View>
        <Text>Error: {errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={mainstyles.container}>
      <BillboardImage billboard={billboard!} />
      <View style={styles.row}>
        <View style={styles.row}>
          <Octicons name="location" size={24} color="black" />
          <Text style={mainstyles.title1}>{billboard!.location}</Text>
        </View>
        <View style={[styles.row, { gap: 16 }]}>
          <Octicons
            name="trash"
            size={24}
            color={Colors.light.danger}
            onPress={confirmDelete}
          />
          <Octicons name="pencil" size={24} color={Colors.light.icon} />
        </View>
      </View>
      <BillboardInfo billboard={billboard!} />
    </View>
  );
};

export default BillboardDetails;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});
