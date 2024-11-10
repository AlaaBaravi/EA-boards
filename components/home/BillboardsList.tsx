import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import axios from "axios";
import { Billboard } from "@/constants/Types";
import { useAuth } from "@/store/authContext";
import BillboardCard from "../billboards/BillboardCard";

const Billboards = () => {
  const { state } = useAuth();
  const [billboadrs, setBillboards] = useState<Array<Billboard> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const billboardsSlice = billboadrs?.slice(-3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://new.aeboards.net/api/info/get_billboards",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const allBillboards: any = response.data.data.data;
        setBillboards(
          allBillboards.filter(
            (billboard: { company: { name: string } }) =>
              billboard.company.name === state.user?.name
          )
        );
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
    <View style={styles.container}>
      <View style={styles.rowView}>
        <Text style={mainstyles.title1}>My billboards</Text>
        <Pressable
          android_ripple={{ color: Colors.light.primary }}
          onPress={() => router.push("/(tabs)/billboards")}
        >
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        {billboadrs?.length === 0 ? (
          <Text style={styles.description}>
            You Don’t have Billboards yet, You can add your billboards after
            Admin verify your email
          </Text>
        ) : (
          billboardsSlice?.map((billboard) => (
            <BillboardCard billboard={billboard} key={billboard.id} />
          ))
        )}
      </View>

      <Pressable
        android_ripple={{ color: "#28fd6c" }}
        style={styles.addContainer}
        onPress={() => router.push("/(tabs)/billboards/addBillboards")}
      >
        <Ionicons
          name="add-circle-outline"
          size={16}
          color={Colors.light.primary}
        />
        <Text style={styles.seeAll}>Add New Billboard</Text>
      </Pressable>
    </View>
  );
};

export default Billboards;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 12,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  seeAll: {
    ...mainstyles.caption,
    color: Colors.light.primary,
  },
  listContainer: {
    width: "100%",
  },
  description: {
    ...mainstyles.title2,
    color: Colors.light.description,
    textAlign: "center",
    marginVertical: 24,
  },
  addContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
  },
});
