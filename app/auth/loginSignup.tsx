import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import LinearBackground from "@/components/ui/LinearBackground";
import Logo from "@/components/ui/Logo";
import WelcomeText from "@/components/ui/WelcomeText";
import WelcomeImage from "@/components/ui/WelcomeImage";
import CustomButton from "@/components/ui/CustomButton";
import { mainstyles } from "@/constants/Styles";

const LoginSignup = () => {
  return (
    <LinearBackground>
      <Logo />
      <View>
        <WelcomeText text="Welcome" />
        <Text style={styles.text}>Glad to see you</Text>
      </View>
      <WelcomeImage />
      <CustomButton title="Log in" onPress={() => router.push("/auth/login")} />
      <CustomButton
        title="Sign up"
        onPress={() => router.push("/auth/signup")}
        variant="secondary"
      />
    </LinearBackground>
  );
};

export default LoginSignup;

const styles = StyleSheet.create({
  text: {
    ...mainstyles.title2,
    textAlign: "center",
    textTransform: "capitalize",
  },
});
