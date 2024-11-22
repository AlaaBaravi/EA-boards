import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { mainstyles } from "@/constants/Styles";

const PendingBillboards = () => {
  return (
    <>
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          You don't hav any pending billboards!
        </Text>
      </View>
    </>
  );
};

export default PendingBillboards;

const styles = StyleSheet.create({
  empty: {
    ...mainstyles.container,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    ...mainstyles.title2,
    textAlign: "center",
  },
});
