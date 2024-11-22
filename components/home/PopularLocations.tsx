import { FlatList, StyleSheet, Text, View } from "react-native";

import { mainstyles } from "@/constants/Styles";
import { useRegions } from "@/hooks/info/useRegions";

import LocationCard from "@/components/ui/LocationCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const PopularLocations = () => {
  const { data: regions, isPending, error } = useRegions();

  if (isPending) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;

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
