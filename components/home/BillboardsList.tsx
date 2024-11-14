import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useAuth } from "@/store/authContext";
import BillboardCard from "../billboards/BillboardCard";
import Loading from "../ui/Loading";
import { useBillboards } from "@/hooks/billboards/useBillboards";
import Error from "../ui/Error";
import { useUserProfile } from "@/hooks/useUserProfile";

const Billboards = () => {
  const {
    data: billboards,
    isPending: isBillboards,
    error: billboardsError,
  } = useBillboards();

  const {
    data: userData,
    isPending: isUserData,
    error: userError,
  } = useUserProfile();

  const isPending = isBillboards || isUserData;
  const error = billboardsError || userError;

  if (isPending) {
    return <Loading />;
  }
  if (error) {
    return <Error errorMessage={error.message} />;
  }

  const companyBillboards = billboards.filter(
    (billboard) => billboard.company.id === userData.id
  );

  const billboardsSlice = companyBillboards?.slice(-3);

  return (
    <View style={styles.container}>
      <View style={styles.rowView}>
        <Text style={mainstyles.title1}>My billboards</Text>
        <Pressable
          android_ripple={{ color: Colors.light.primary }}
          onPress={() => router.push("/(app)/(tabs)/billboards")}
        >
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        {billboards?.length === 0 ? (
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
        onPress={() => router.push("/(app)/(tabs)/billboards/addBillboards")}
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
