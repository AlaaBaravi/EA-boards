import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { router } from "expo-router";
import Constants from "expo-constants";

import { Billboard } from "@/constants/Types";
import { Colors } from "@/constants/Colors";

import Favorite from "@/components/billboards/billboard-details/Favorite";
import Location from "@/components/billboards/billboard-details/Location";
import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";

const baseURL =
  Constants.expoConfig?.extra?.apiBaseUrl || "https://new.aeboards.net";

interface BookingCardProps {
  billboard: Billboard;
  forBookings: Billboard[];
  onForBookings: (billboard: Billboard) => void;
}

const BookingCard: FC<BookingCardProps> = ({
  billboard,
  forBookings,
  onForBookings,
}) => {
  const imageUri = `${baseURL}${billboard?.files[0]?.path}`;

  const isPressed =
    forBookings.findIndex((item) => item.id === billboard.id) !== -1;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onForBookings(billboard)}
        android_ripple={{ color: Colors.light.primary }}
      >
        <ImageBackground
          source={{ uri: imageUri }}
          style={[styles.image]}
          imageStyle={{ borderRadius: 12 }}
        >
          {isPressed && (
            <View style={styles.overlay}>
              <Ionicons
                name="checkmark-done-circle"
                size={48}
                color={Colors.light.primary}
              />
            </View>
          )}
        </ImageBackground>
      </Pressable>
      <View style={styles.row}>
        <Location billboard={billboard} />
        <Favorite id={billboard.id.toString()} />
      </View>
    </View>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: Colors.light.border,
    paddingVertical: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  overlay: {
    borderRadius: 16,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(44, 38, 38, 0.808)",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
