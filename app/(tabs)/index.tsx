import { View, StyleSheet, Text } from "react-native";

import { mainstyles } from "@/constants/Styles";
import ImageOverlay from "@/components/home/ImageOverlay";
import BillboardsList from "@/components/home/BillboardsList";
import CustomHeader from "@/components/home/CustomHeader";
import CustomSearchbar from "@/components/home/CustomSearchbar";
import ReservationsList from "@/components/home/ReservationsList";

export default function Home() {
  return (
    <>
      <CustomHeader>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.nameText}>name name</Text>
      </CustomHeader>
      <View style={styles.container}>
        <CustomSearchbar />
        <ImageOverlay />
        <BillboardsList />
        <ReservationsList />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...mainstyles.container,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  nameText: {
    fontSize: 14,
    color: "gray",
  },
});
