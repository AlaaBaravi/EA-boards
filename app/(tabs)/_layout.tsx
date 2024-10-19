import React, { useState } from "react";
import { Tabs } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

interface TabOptions {
  name: string;
  label: string;
  icon: keyof typeof FontAwesome.glyphMap;
}

const tabOptions: TabOptions[] = [
  { name: "index", label: "Home", icon: "home" },
  { name: "billboards/index", label: "Billboards", icon: "picture-o" },
  { name: "reservation", label: "Reservation", icon: "calendar" },
  { name: "profile/index", label: "Profile", icon: "user" },
];

export default function Layout() {
  const [activeTab, setActiveTab] = useState("index");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        sceneContainerStyle={{
          backgroundColor: "white",
        }}
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => (
          <CustomTabBar
            {...props}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      />
    </SafeAreaView>
  );
}

interface CustomTabBarProps extends BottomTabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  navigation,
  activeTab,
  setActiveTab,
}) => {
  return (
    <View style={styles.tabBarContainer}>
      {tabOptions.map((tabData, index) => {
        const route = state.routes.find((r) => r.name === tabData.name);
        const isFocused = activeTab === route?.name;

        const onPress = () => {
          console.log(tabData.name);

          if (route) {
            setActiveTab(route.name);
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable key={index} style={styles.tabButton} onPress={onPress}>
            <View style={[styles.tabItem, isFocused && styles.curvedTab]}>
              {tabData.label === "Billboards" ? (
                <MaterialCommunityIcons
                  name="billboard"
                  size={isFocused ? 30 : 24}
                  color={isFocused ? "white" : "gray"}
                />
              ) : (
                <FontAwesome
                  name={tabData.icon}
                  size={isFocused ? 30 : 24}
                  color={isFocused ? "white" : "gray"}
                />
              )}
              <Text
                style={[
                  styles.tabLabel,
                  { color: isFocused ? "white" : "gray" },
                ]}
              >
                {tabData.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

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
    backgroundColor: Colors.light.secondary,
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
