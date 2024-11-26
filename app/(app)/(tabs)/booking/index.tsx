import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomHeader from "@/components/home/CustomHeader";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import PendingBillboards from "@/components/booking/PendingBillboards";
import ProcessedBillboards from "@/components/booking/ProcessedBillboards";

const index = () => {
  const [isPending, setIsPending] = useState(true);
  const handlPress = (pending: boolean) => {
    pending ? setIsPending(true) : setIsPending(false);
  };

  return (
    <>
      <CustomHeader>
        <Text style={mainstyles.title1}>Booking</Text>
      </CustomHeader>

      <View style={mainstyles.container}>
        <View style={styles.row}>
          <Pressable onPress={() => handlPress(true)}>
            <Text style={isPending ? styles.active : styles.notActive}>
              Pending
            </Text>
          </Pressable>
          <Pressable onPress={() => handlPress(false)}>
            <Text style={isPending ? styles.notActive : styles.active}>
              Processed
            </Text>
          </Pressable>
        </View>

        {isPending ? <PendingBillboards /> : <ProcessedBillboards />}

        <Ionicons
          name="add-circle"
          size={56}
          color="black"
          style={{ position: "absolute", bottom: 20, right: 20 }}
          onPress={() => router.push("/(app)/(booking)/filter-billboards")}
        />
      </View>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-around" },
  active: { fontWeight: "700", color: Colors.light.primary },
  notActive: { fontWeight: "700", textDecorationLine: "underline" },
});
