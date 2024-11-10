import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { mainstyles } from "@/constants/Styles";
import axios from "axios";
import { Colors } from "@/constants/Colors";
import { Billboard } from "@/constants/Types";
import { getBillboardById } from "@/util/https";
import { useAuth } from "@/store/authContext";
import BillboardImage from "@/components/billboards/BillboardImage";
import { Ionicons, Octicons } from "@expo/vector-icons";
import BillboardInfo from "@/components/billboards/BillboardInfo";

const BillboardDetails = () => {
  const [billboard, setBillboard] = useState<Billboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useLocalSearchParams();
  const { state } = useAuth();

  console.log(billboard);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const billboardData = await getBillboardById(
          id.toString(),
          state.token!
        );
        setBillboard(billboardData);
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

  if (loading || billboard === null) {
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
    <View style={mainstyles.container}>
      <BillboardImage billboard={billboard} />
      <View style={styles.row}>
        <View style={styles.row}>
          <Octicons name="location" size={24} color="black" />
          <Text style={mainstyles.title1}>{billboard.location}</Text>
        </View>
        <View style={[styles.row, { gap: 16 }]}>
          <Octicons name="trash" size={24} color={Colors.light.danger} />
          <Octicons name="pencil" size={24} color="black" />
        </View>
      </View>
      <BillboardInfo billboard={billboard} />
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
