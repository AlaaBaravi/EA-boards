import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useBillboards } from "@/hooks/info/useBillboards";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";

import BillboardCard from "./BillboardCard";
import Loading from "../ui/Loading";
import Error from "../ui/Error";

const CompanyBillboards = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const handlPress = (available: boolean) => {
    available ? setIsAvailable(true) : setIsAvailable(false);
  };

  const {
    data: userData,
    isPending: isUserData,
    error: userError,
  } = useUserProfile();

  if (isUserData) return <Loading />;
  if (userError) return <Error errorMessage={userError?.message} />;

  const {
    data: billboards,
    isPending: isBillboards,
    error: billboardsError,
  } = useBillboards({ company_id: [userData.id.toString()] });

  if (isBillboards) return <Loading />;
  if (billboardsError) return <Error errorMessage={billboardsError?.message} />;

  return (
    <>
      <View style={styles.row}>
        <Pressable onPress={() => handlPress(false)}>
          <Text style={isAvailable ? styles.notActive : styles.active}>
            Reserved
          </Text>
        </Pressable>
        <Pressable onPress={() => handlPress(true)}>
          <Text style={isAvailable ? styles.active : styles.notActive}>
            Available
          </Text>
        </Pressable>
      </View>

      {isAvailable ? (
        billboards.length > 0 ? (
          <FlatList
            style={styles.billboardContainer}
            data={billboards}
            renderItem={({ item }) => <BillboardCard billboard={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text style={styles.text}>You have no available billboards yet</Text>
        )
      ) : (
        <Text style={styles.text}>You have no reserved billboards yet</Text>
      )}

      {userData.verify_admin === "1" && (
        <Ionicons
          name="add-circle"
          size={56}
          color="black"
          style={styles.add}
          onPress={() => router.push("/(app)/(billboards)/add-billboard")}
        />
      )}
    </>
  );
};

export default CompanyBillboards;

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  billboardContainer: {
    width: "100%",
  },
  text: {
    ...mainstyles.caption,
  },
  active: { fontWeight: "700", color: Colors.light.primary },
  notActive: { fontWeight: "700", textDecorationLine: "underline" },
  add: { position: "absolute", bottom: 20, right: 20 },
});
