import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { mainstyles } from "@/constants/Styles";

const ProcessedBillboards = () => {
  return (
    <>
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          You don't hav any processed billboards!
        </Text>
      </View>
    </>
  );
};

export default ProcessedBillboards;

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
