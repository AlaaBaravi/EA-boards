import CustomHeader from "@/components/home/CustomHeader";
import { mainstyles } from "@/constants/Styles";
import { View, Text, StyleSheet } from "react-native";

export default function Reservation() {
  return (
    <>
      <CustomHeader>
        <Text style={mainstyles.title1}>Booking</Text>
      </CustomHeader>
      <View style={styles.container}>
        <Text>Tab [Booking]</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...mainstyles.container,
    alignItems: "center",
  },
});