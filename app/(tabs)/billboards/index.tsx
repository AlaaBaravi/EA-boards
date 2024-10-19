import CustomHeader from "@/components/home/CustomHeader";
import { mainstyles } from "@/constants/Styles";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Billboards() {
  const [pressed, setPressed] = useState<string>("reserved");

  return (
    <>
      <CustomHeader>
        <Text style={mainstyles.title1}>My Billboards</Text>
      </CustomHeader>
      <View style={styles.container}>
        <View style={styles.rowView}>
          <Pressable onPress={() => setPressed("reserved")}>
            <Text
              style={[
                mainstyles.title1,
                {
                  textDecorationLine:
                    pressed === "reserved" ? "underline" : "none",
                },
              ]}
            >
              Reserved
            </Text>
          </Pressable>
          <Pressable onPress={() => setPressed("available")}>
            <Text
              style={[
                mainstyles.title1,
                {
                  color: "#1A90408A",
                  textDecorationLine:
                    pressed === "available" ? "underline" : "none",
                },
              ]}
            >
              Available
            </Text>
          </Pressable>
        </View>
        <Text>
          You Don’t have Billboards yet, You can add your billboards after Admin
          verify your email
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    ...mainstyles.container,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
