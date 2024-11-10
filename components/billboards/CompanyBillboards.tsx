import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { mainstyles } from "@/constants/Styles";
import BillboardCard from "./BillboardCard";
import { useAuth } from "@/store/authContext";
import { Billboard } from "@/constants/Types";

const CompanyBillboards = ({ billboards }: { billboards: Billboard[] }) => {
  const { state } = useAuth();
  const [pressed, setPressed] = useState<string>("available");

  const userBillboards = billboards?.filter(
    (billboard: { company: { name: string } }) =>
      billboard.company.name === state.user?.name
  );

  return (
    <>
      <View style={styles.rowView}>
        <Pressable onPress={() => setPressed("reserved")}>
          <Text
            style={[
              mainstyles.title1,
              {
                color: pressed === "reserved" ? "black" : "#1A90408A",
                textDecorationLine:
                  pressed === "reserved" ? "underline" : "none",
              },
            ]}
          >
            Reserved
          </Text>
        </Pressable>
        <Pressable onPress={() => setPressed("available")}>
          <Text
            style={[
              mainstyles.title1,
              {
                color: pressed === "available" ? "black" : "#1A90408A",
                textDecorationLine:
                  pressed === "available" ? "underline" : "none",
              },
            ]}
          >
            Available
          </Text>
        </Pressable>
      </View>
      {pressed === "available" ? (
        <FlatList
          style={styles.billboardContainer}
          data={userBillboards}
          inverted
          renderItem={({ item }) => <BillboardCard billboard={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>You have no reserved billboards yet</Text>
      )}
    </>
  );
};

export default CompanyBillboards;

const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  billboardContainer: {
    width: "100%",
  },
});
