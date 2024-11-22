import { View, StyleSheet, Text, ScrollView } from "react-native";

import { mainstyles } from "@/constants/Styles";
import ImageOverlay from "@/components/home/ImageOverlay";
import BillboardsList from "@/components/home/BillboardsList";
import CustomHeader from "@/components/home/CustomHeader";
import CustomSearchbar from "@/components/home/CustomSearchbar";
import ReservationsList from "@/components/home/ReservationsList";
import { useAuth } from "@/store/authContext";
import PopularLocations from "@/components/home/PopularLocations";
import MostRated from "@/components/home/MostRated";
import CompaniesList from "@/components/home/CompaniesList";
import Loading from "@/components/ui/Loading";

export default function Home() {
  const { state, isLoading } = useAuth();
  console.log(state.token);

  if (isLoading) return <Loading />;

  return (
    <>
      <CustomHeader>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.nameText}>{state.user?.username}</Text>
      </CustomHeader>
      <ScrollView>
        <View style={styles.container}>
          <CustomSearchbar />
          <ImageOverlay />

          {state.user?.type === "individual" ? (
            <PopularLocations />
          ) : (
            <BillboardsList />
          )}

          {state.user?.type === "individual" ? (
            <MostRated />
          ) : (
            <ReservationsList />
          )}

          {state.user?.type === "individual" && <CompaniesList />}
        </View>
      </ScrollView>
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
    textTransform: "capitalize",
  },
});
