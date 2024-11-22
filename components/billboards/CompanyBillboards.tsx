import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { mainstyles } from "@/constants/Styles";
import BillboardCard from "./BillboardCard";
import { useBillboards } from "@/hooks/info/useBillboards";
import Loading from "../ui/Loading";
import Error from "../ui/Error";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import { useAuth } from "@/store/authContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const CompanyBillboards = () => {
  const [pressed, setPressed] = useState<string>("available");

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
          style={{ position: "absolute", bottom: 20, right: 20 }}
          onPress={() => router.push("/(app)/(billboards)/add-billboard")}
        />
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
