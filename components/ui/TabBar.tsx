import { Colors } from "@/constants/Colors";
import { TabOption } from "@/constants/Types";
import { useAuth } from "@/store/authContext";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CustomTabBarProps extends BottomTabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CustomTabBar: FC<CustomTabBarProps> = ({
  state,
  navigation,
  activeTab,
  setActiveTab,
}) => {
  const { state: authState } = useAuth();

  const tabOptions: TabOption[] = [
    { name: "index", label: "Home", icon: "home" },
    { name: "billboards/index", label: "Billboards", icon: "picture-o" },
    {
      name: `${
        authState.user?.type === "individual"
          ? "booking/index"
          : "reservation/index"
      }`,
      label: `${
        authState.user?.type === "individual" ? "Booking" : "Reservation"
      }`,
      icon: "calendar",
    },
    { name: "profile/index", label: "Profile", icon: "user" },
  ];

  return (
    <View style={styles.tabBarContainer}>
      {tabOptions.map((tabData, index) => {
        const route = state.routes.find((r) => r.name === tabData.name);
        const isFocused = activeTab === route?.name;

        const onPress = () => {
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

export default CustomTabBar;

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
