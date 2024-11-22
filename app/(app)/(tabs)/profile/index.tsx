import { View, Text, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";

import { mainstyles } from "@/constants/Styles";
import { ProfileTabs } from "@/constants/Data";
import { useUserProfile } from "@/hooks/user/useUserProfile";

import CustomHeader from "@/components/home/CustomHeader";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ProfileTab from "@/components/profile/ProfileTab";
import Logout from "@/components/profile/Logout";

const baseURL =
  Constants.expoConfig?.extra?.apiBaseUrl || "https://new.aeboards.net";

export default function Profile() {
  const { data: userData, isLoading, error } = useUserProfile();

  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;

  const imageUri = `${baseURL}/${
    userData?.image
  }?timestamp=${new Date().getTime()}`;

  console.log(imageUri);

  return (
    <>
      <CustomHeader>
        <Text style={mainstyles.title1}>Profile</Text>
      </CustomHeader>

      <View style={mainstyles.container}>
        <View style={styles.info}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
          <Text style={mainstyles.title1}>{userData?.username}</Text>
        </View>

        <View style={styles.tabsContainer}>
          {ProfileTabs.map((profile) => (
            <ProfileTab
              key={profile.title}
              title={profile.title}
              icon={profile.icon}
              to={profile.to}
            />
          ))}
          {userData?.type === "individual" && (
            <ProfileTab
              title={"Favorites"}
              icon={"heart"}
              to={"/(app)/(profile)/favorites"}
            />
          )}
        </View>

        <Logout />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  info: { gap: 8, alignItems: "center" },
  tabsContainer: {
    gap: 16,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  image: { width: 100, height: 100 },
});
