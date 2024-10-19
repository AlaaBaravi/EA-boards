import { Pressable, StyleSheet, Text, View } from "react-native";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";

const ReservationsList = () => {
  return (
    <View>
      <View style={styles.rowView}>
        <Text style={mainstyles.title1}>My Reservations</Text>
        <Pressable>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <View>
        <Text style={styles.description}>
          You Don’t have Reservations yet, You can add your billboards and get
          reservations after Admin verify your email
        </Text>
      </View>
    </View>
  );
};

export default ReservationsList;

const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAll: {
    ...mainstyles.caption,
    color: Colors.light.secondary,
  },
  description: {
    ...mainstyles.title2,
    color: Colors.light.description,
    textAlign: "center",
    marginVertical: 24,
  },
});
