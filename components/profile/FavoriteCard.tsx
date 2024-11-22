import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

import { Billboard } from "@/constants/Types";
import Favorite from "../billboards/billboard-details/Favorite";
import Location from "../billboards/billboard-details/Location";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const baseURL =
  Constants.expoConfig?.extra?.apiBaseUrl || "https://new.aeboards.net";

const FavoriteCard = ({ billboard }: { billboard: Billboard }) => {
  const imageUri = `${baseURL}${billboard?.files[0]?.path}`;
  console.log(imageUri);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.push(`/(app)/(billboards)/${billboard.id}`)}
        android_ripple={{ color: Colors.light.primary }}
      >
        <Image source={{ uri: imageUri }} style={styles.image} />
      </Pressable>
      <View style={styles.row}>
        <Location billboard={billboard} />
        <Favorite id={billboard.id.toString()} />
      </View>
    </View>
  );
};

export default FavoriteCard;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: Colors.light.border,
    paddingVertical: 20,
  },
  image: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});
