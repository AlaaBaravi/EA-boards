import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import BillboardCard from "./BillboardCard";
import { Billboard } from "@/constants/Types";
import CustomSearchbar from "../home/CustomSearchbar";
import { useBillboards } from "@/hooks/info/useBillboards";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const AllBillboards = () => {
  const { data: billboards, isPending, isError, error } = useBillboards();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error errorMessage={error.message} />;
  }

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
    paddingBottom: 30,
  },
});
