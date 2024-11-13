import CustomHeader from "@/components/home/CustomHeader";
import { mainstyles } from "@/constants/Styles";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import { router } from "expo-router";

export default function Reservation() {

    const [pressed, setPressed] = useState<'pending' | 'processed'>('pending')

    return (
        <>
            <CustomHeader>
                <Text style={mainstyles.title1}>Reservations</Text>
            </CustomHeader>
            <View style={mainstyles.container}>
                <View style={mainstyles.rowView}>
                    <Pressable style={[
                        styles.tabStyle
                    ]} onPress={() => setPressed('pending')}>
                        <Text
                            style={[
                                mainstyles.title1,
                                {
                                    color: pressed === "pending" ? "black" : "#1A90408A",
                                    textDecorationLine:
                                        pressed === "pending" ? "underline" : "none",
                                },
                            ]}
                        >
                            Pending
                        </Text>
                    </Pressable>
                    <Pressable style={[
                        styles.tabStyle
                    ]} onPress={() => setPressed("processed")}>
                        <Text
                            style={[
                                mainstyles.title1,
                                {
                                    color: pressed === "processed" ? "black" : "#1A90408A",
                                    textDecorationLine:
                                        pressed === "processed" ? "underline" : "none",
                                },
                            ]}
                        >
                            Processed
                        </Text>
                    </Pressable>
                </View>
                <View style={{ gap: 2, paddingVertical: 10 }}>
                    {
                        //TODO: Add a flat list and request
                    }
                    <Text>
                        No data to show
                    </Text>
                </View>
                <Pressable onPress={() => router.push('/booking/book-billboard')} style={styles.fabAddButton}>
                    <FontAwesome6 name="add" size={26} color={'white'} />
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        ...mainstyles.container,
        alignItems: "center",
    },
    tabStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center"
    },
    fabAddButton: {
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'black',
        right: 20,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center"
    }
});
