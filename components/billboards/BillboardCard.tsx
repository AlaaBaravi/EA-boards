import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { router } from "expo-router";
import Constants from "expo-constants";

import { LinearGradient } from "expo-linear-gradient";
import { Billboard, Description } from "@/constants/Types";
import { mainstyles } from "@/constants/Styles";
import { FontAwesome } from "@expo/vector-icons";

const baseURL =
  Constants.expoConfig?.extra?.apiBaseUrl || "https://new.aeboards.net";

interface BillboardCardProps {
  billboard: Billboard;
  isBooking?: boolean;
}

const BillboardCard: FC<BillboardCardProps> = ({ billboard }) => {
  return (
    <Pressable
      onPress={() => router.push(`/(app)/(billboards)/${billboard.id}`)}
    >
      <CardBody billboard={billboard} />
    </Pressable>
  );
};

const CardBody: FC<BillboardCardProps> = ({ billboard }) => {
  const imageUri = `${baseURL}${billboard?.files?.[0]?.path}`;
  const placeholderUri = "https://via.placeholder.com/100";

  // Safely parse the description
  let description: Description = {};
  try {
    if (billboard.description) {
      description = JSON.parse(billboard.description);
    }
  } catch (error) {
    console.error("Error parsing billboard description:", error);
  }

  return (
    <LinearGradient colors={["#FFFFFF00", "#8fc4a0"]} style={styles.container}>
      {billboard.files?.length > 0 ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Image source={{ uri: placeholderUri }} style={styles.image} />
      )}

      <View style={styles.reviews}>
        <FontAwesome name="star" size={14} color="#E2CC00" />
        <Text style={{ color: "#E2CC00" }}>
          {billboard.reviews ? billboard.reviews : "0"}
        </Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={[mainstyles.title1, { textTransform: "capitalize" }]}>
          {billboard.title || "---"}
        </Text>
        <View style={styles.row}>
          <Text style={styles.text}>{billboard.region?.name_en || "---"}</Text>
          <Text style={styles.text}>{billboard.kind || "---"}</Text>
          <Text style={styles.text}>
            {billboard.billboard_type_id?.text_en || "---"}
          </Text>
        </View>
        <Text style={{ color: "#2C2626A3" }}>
          {description.billboard || "---"}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default BillboardCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1A90407A",
    marginVertical: 4,
    gap: 16,
    flexDirection: "row",
  },
  innerContainer: {
    justifyContent: "space-between",
    flex: 1,
    gap: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: { textTransform: "capitalize" },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },
  reviews: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    position: "absolute",
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 13,
    paddingVertical: 3,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
});
