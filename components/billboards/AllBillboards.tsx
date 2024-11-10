import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import BillboardCard from "./BillboardCard";
import { Billboard } from "@/constants/Types";
import CustomSearchbar from "../home/CustomSearchbar";

const AllBillboards = ({ billboards }: { billboards: Billboard[] | null }) => {
  return (
    <View style={styles.billboardContainer}>
      <CustomSearchbar />
      <FlatList
        style={styles.billboardContainer}
        data={billboards}
        inverted
        renderItem={({ item }) => <BillboardCard billboard={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AllBillboards;

const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  billboardContainer: {
    width: "100%",
    gap: 8,
  },
});
