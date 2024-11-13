import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Billboard } from "@/constants/Types";
import { mainstyles } from "@/constants/Styles";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import { router } from "expo-router";

const baseURL =
    Constants.expoConfig?.extra?.apiBaseUrl || "https://new.aeboards.net";

interface BillboardCardProps {
    billboard: Billboard;
    isBooking?: boolean
}

const BillboardCard: FC<BillboardCardProps> = ({ billboard, isBooking = false }) => {
    return (
        <>
            {
                isBooking && (
                    <View>
                        <CardBody billboard={billboard} isBooking={isBooking} />
                    </View>
                )
            }
            {
                !isBooking && (
                    <Pressable
                        onPress={() =>
                            router.push(
                                `/(app)/(tabs)/billboards/billboard-details/${billboard.id}`
                            )
                        }
                    >
                        <CardBody billboard={billboard} isBooking={isBooking} />
                    </Pressable>
                )
            }
        </>
    );
};
const CardBody: FC<BillboardCardProps> = ({ billboard, isBooking }) => {
    const imageUri = `${baseURL}${billboard?.files[0]?.path}`;
    const placeholderUri = "https://via.placeholder.com/100";
    return (

        <LinearGradient
            colors={["#FFFFFF00", "#8fc4a0"]}
            style={styles.container}
        >
            {imageUri && billboard.files.length > 0 ? (
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
                    {billboard.title}
                </Text>
                <View style={styles.row}>
                    <Text style={styles.text}>{billboard.region.name_en}</Text>
                    <Text style={styles.text}>{billboard.kind}</Text>
                    <Text style={styles.text}>
                        {billboard.billboard_type_id.text_en}
                    </Text>
                </View>
                <Text style={{ color: "#2C2626A3" }}>
                    {billboard.description ? billboard.description : "---"}
                </Text>
            </View>
            {
                isBooking &&
                <Pressable style={{ backgroundColor: "#2C2626A3" }}>
                    <Text>
                        Book Now
                    </Text>
                </Pressable>
            }
        </LinearGradient>

    )
}

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
