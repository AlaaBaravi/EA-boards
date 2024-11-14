import React, { useState } from "react";
import { Tabs } from "expo-router";
// import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTabBar, { TabButton } from "@/components/ui/TabBar";
import { Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
  const [activeTab, setActiveTab] = useState("index");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: "white" },
        }}
        tabBar={(props) => (
          <CustomTabBar
            {...(props as any)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      />
      {/* <Tabs>
        <TabSlot />
        <TabList style={styles.tabBarContainer}>
          <TabTrigger
            style={styles.tabButton}
            name="index"
            href={"/(app)/(tabs)"}
            asChild
          >
            <TabButton icon="home"></TabButton>
          </TabTrigger>
          <TabTrigger
            style={styles.tabButton}
            name="billboards"
            href={"/(app)/(tabs)/billboards"}
            asChild
          >
            <TabButton icon="home"></TabButton>
          </TabTrigger>
          <TabTrigger
            style={styles.tabButton}
            name="booking"
            href={"/(app)/(tabs)/booking"}
            asChild
          >
            <TabButton icon="calendar"></TabButton>
          </TabTrigger>
          <TabTrigger
            style={styles.tabButton}
            name="profile"
            href={"/(app)/(tabs)/profile"}
            asChild
          >
            <TabButton icon="user-circle"></TabButton>
          </TabTrigger>
        </TabList>
      </Tabs> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 24,
    marginHorizontal: 24,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  tabLabel: {
    fontSize: 8,
    marginTop: 4,
  },
  curvedTab: {
    backgroundColor: Colors.light.primary,
    width: 70,
    height: 70,
    borderRadius: 35,
    position: "absolute",
    top: -30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
