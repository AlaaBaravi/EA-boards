import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { getBillboards } from "@/util/https";
import { Billboard } from "@/constants/Types";
import BillboardCard from "../billboards/BillboardCard";
import { router } from "expo-router";

const MostRated = () => {
  const [billboards, setBillboards] = useState<Billboard[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sortedByReviews =
    billboards
      ?.filter((billboard) => billboard.reviews !== null)
      .sort((a, b) => (a.reviews! < b.reviews! ? 1 : -1))
      .slice(0, 3) || null;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const billboardsData = await getBillboards();
        setBillboards(billboardsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading)
    return <ActivityIndicator color={Colors.light.primary} size="large" />;

  return (
    <View>
      <View style={styles.rowView}>
        <Text style={mainstyles.title1}>Most Rated</Text>
        <Pressable
          android_ripple={{ color: Colors.light.primary }}
          onPress={() => router.push("/(app)/(tabs)/billboards")}
        >
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>
      {sortedByReviews?.map((item) => (
        <BillboardCard key={item.id} billboard={item} />
      ))}
    </View>
  );
};

export default MostRated;

const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAll: {
    ...mainstyles.caption,
    color: Colors.light.primary,
  },
});
