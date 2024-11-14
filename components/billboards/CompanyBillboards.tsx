import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { mainstyles } from "@/constants/Styles";
import BillboardCard from "./BillboardCard";
import { useBillboards } from "@/hooks/billboards/useBillboards";
import Loading from "../ui/Loading";
import Error from "../ui/Error";
import { useUserProfile } from "@/hooks/useUserProfile";

const CompanyBillboards = () => {
  const [pressed, setPressed] = useState<string>("available");

  const {
    data: userData,
    isPending: isUserData,
    error: userError,
  } = useUserProfile();

  const {
    data: billboards,
    isPending: isBillboards,
    error: billboardsError,
  } = useBillboards();

  const isPending = isBillboards || isUserData;
  const error = billboardsError || userError;

  if (isPending) return <Loading />;

  if (error) return <Error errorMessage={error?.message} />;

  const companyBillboards = billboards.filter(
    (billboard) => billboard.company.id === userData.id
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
        billboards.length > 0 ? (
          <FlatList
            style={styles.billboardContainer}
            data={companyBillboards}
            renderItem={({ item }) => <BillboardCard billboard={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text style={styles.text}>You have no available billboards yet</Text>
        )
      ) : (
        <Text style={styles.text}>You have no reserved billboards yet</Text>
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
  text: {
    ...mainstyles.caption,
  },
});
