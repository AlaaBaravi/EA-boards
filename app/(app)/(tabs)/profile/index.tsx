import CustomHeader from "@/components/home/CustomHeader";
import { Colors } from "@/constants/Colors";
import { mainstyles } from "@/constants/Styles";
import { UserProfile } from "@/constants/Types";
import useAuthActions from "@/store/authActions";
import { useAuth } from "@/store/authContext";
import { fetchUserData, getInfo } from "@/util/https";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";

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

const baseURL =
  Constants.expoConfig?.extra?.apiBaseUrl || "https://new.aeboards.net";

export default function Profile() {
  const [userData, setUserData] = useState<UserProfile>();
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuthActions();
  const { state } = useAuth();

  const imageUri = `${baseURL}/${userData?.image}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userInfo = await fetchUserData(state.token!);
        setUserData(userInfo);
      } catch (error) {
        console.error("Faild to fetch user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading)
    return <ActivityIndicator size={"large"} color={Colors.light.primary} />;

  return (
    <>
      <CustomHeader>
        <Text style={mainstyles.title1}>Profile</Text>
      </CustomHeader>
      <View style={styles.container}>
        <View style={styles.info}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
          <Text style={mainstyles.title1}>{userData?.name}</Text>
        </View>
        <View style={styles.tabsContainer}>
          {ProfileTabs.map((profile) => (
            <Link key={profile.icon} href={profile.to} asChild>
              <Pressable
                android_ripple={{ color: "#28fd6c" }}
                style={styles.tabs}
              >
                <View style={styles.titleContainer}>
                  <Feather name={profile.icon} size={24} color="#2C2626A3" />
                  <Text style={styles.title}>{profile.title}</Text>
                </View>
                <Feather name="chevron-right" size={24} color="black" />
              </Pressable>
            </Link>
          ))}
          <Pressable style={styles.titleContainer} onPress={logout}>
            <MaterialIcons name="logout" size={24} color="#E05252" />
            <Text style={styles.logout}>Log out</Text>
          </Pressable>
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
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  image: { width: 100, height: 100 },
});