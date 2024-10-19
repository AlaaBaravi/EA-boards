import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import { mainstyles } from "@/constants/Styles";

interface NotifiCardProps {
  icon?: string;
  linear?: boolean;
}

const NotifiCard: FC<NotifiCardProps> = ({ icon = "file", linear = true }) => {
  return (
    <LinearGradient
      colors={linear ? ["#FFFFFF00", "#8fc4a0"] : ["#dbe2dd79", "#dbe2dd79"]}
      style={styles.container}
    >
      <View style={styles.rowView}>
        {icon === "end" ? (
          <Octicons name="stop" size={24} color="#BA000AB8" />
        ) : (
          <FontAwesome5 name="file-alt" size={24} color="black" />
        )}
        <View style={styles.gap}>
          <View style={styles.rowView}>
            {icon === "end" ? (
              <Text style={mainstyles.title1}>Reservation end</Text>
            ) : (
              <Text style={mainstyles.title1}>A new reservation from Name</Text>
            )}
            <Text>20/10</Text>
          </View>
          <Text style={mainstyles.caption}>
            Lorem ipsum dolor sit amet consectetur. At morbi condimentum in
            egestas sit. Sed sit cras nam vol
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default NotifiCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 16,
    padding: 28,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1A90407A",
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  gap: {
    gap: 16,
  },
});
