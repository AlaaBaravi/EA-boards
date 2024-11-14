import React from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome6, Octicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";

import { getBillboardById } from "@/util/https";
import { useAuth } from "@/store/authContext";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { Billboard } from "@/constants/Types";
import { useDeleteBillboard } from "@/hooks/billboards/useDeleteBillboard";
import BillboardImage from "@/components/billboards/BillboardImage";
import BillboardInfo from "@/components/billboards/BillboardInfo";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import BillboardImages from "@/components/billboards/BillboardImages";

const BillboardDetails = () => {
  const { id } = useLocalSearchParams();
  const { state } = useAuth();

  const {
    data: billboard,
    isPending: isBillboard,
    error: billboardError,
  } = useQuery<Billboard, Error>({
    queryKey: ["billboard", id],
    queryFn: () => getBillboardById(id.toString(), state.token!),

    enabled: !!id && !!state.token,
  });

  const { mutate: deleteMutation, isPending: isDeleting } =
    useDeleteBillboard();

  if (isBillboard) {
    return <Loading />;
  }

  if (billboardError) {
    return <Error errorMessage={billboardError.message} />;
  }

  const confirmDelete = () => {
    Alert.alert(
      "Delete Billboard",
      "Are you sure you want to delete this billboard?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () =>
            deleteMutation({
              id: billboard?.id.toString(),
              token: state.token!,
            }),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
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
              disabled={isDeleting}
            />
            <Octicons name="pencil" size={24} color={Colors.light.icon} />
          </View>
        </View>
        <BillboardInfo billboard={billboard!} />
        <BillboardImages billboard={billboard!} />
      </View>
    </ScrollView>
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
