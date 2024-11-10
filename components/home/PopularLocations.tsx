import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { mainstyles } from "@/constants/Styles";
import { getRegions } from "@/util/https";
import { Region } from "@/constants/Types";
import LocationCard from "../ui/LocationCard";
import { Colors } from "@/constants/Colors";

const PopularLocations = () => {
  const [regions, setRegions] = useState<Region[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const regionsData = await getRegions();
        setRegions(regionsData);
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
    <View style={{ gap: 16 }}>
      <Text style={mainstyles.title1}>Popular Locations</Text>
      <FlatList
        horizontal
        data={regions}
        renderItem={({ item }) => <LocationCard location={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default PopularLocations;

const styles = StyleSheet.create({});
