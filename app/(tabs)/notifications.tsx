import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import NotifiCard from "@/components/NotifiCard";
import { mainstyles } from "@/constants/Styles";

const Notifications = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>20/10/2023</Text>
        <NotifiCard />
        <NotifiCard icon="end" />
        <Text>20/10/2023</Text>
        <NotifiCard linear={false} />
        <NotifiCard linear={false} icon="end" />
        <NotifiCard linear={false} />
        <NotifiCard linear={false} icon="end" />
      </View>
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    ...mainstyles.container,
    alignItems: "center",
  },
});
