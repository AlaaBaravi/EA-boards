import CustomHeader from "@/components/home/CustomHeader";
import { mainstyles } from "@/constants/Styles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

interface ProfileItem {
  title: string;
  icon: keyof typeof Feather.glyphMap;
  to: Href<string | object>;
}

const ProfileTabs: ProfileItem[] = [
  {
    title: "Account Info & Settings",
    icon: "settings",
    to: "/(tabs)/profile/accountInfo",
  },
  { title: "App Settings", icon: "sliders", to: "/(tabs)/profile/appSettings" },
  { title: "About & Feedback", icon: "info", to: "/(tabs)/profile/about" },
];

export default function Profile() {
  return (
    <>
      <CustomHeader>
        <Text style={mainstyles.title1}>Profile</Text>
      </CustomHeader>
      <View style={styles.container}>
        <View style={styles.info}>
          <Image source={require("@/assets/images/goed.png")} />
          <Text style={mainstyles.title1}>Company Name</Text>
        </View>
        <View style={styles.tabsContainer}>
          {ProfileTabs.map((profile) => (
            <Link key={profile.icon} href={profile.to} asChild>
              <Pressable style={styles.tabs}>
                <View style={styles.titleContainer}>
                  <Feather name={profile.icon} size={24} color="#2C2626A3" />
                  <Text style={styles.title}>{profile.title}</Text>
                </View>
                <Feather name="chevron-right" size={24} color="black" />
              </Pressable>
            </Link>
          ))}
          <View style={styles.titleContainer}>
            <MaterialIcons name="logout" size={24} color="#E05252" />
            <Text style={styles.logout}>Log out</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...mainstyles.container,
  },
  info: { gap: 8, alignItems: "center" },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.45,
    borderBottomColor: "#C6A7A7",
    paddingVertical: 12,
  },
  tabsContainer: {
    gap: 16,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 18,
  },
  title: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
  logout: {
    color: "#E05252",
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
  },
});
