import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import LinearBackground from "@/components/ui/LinearBackground";
import Logo from "@/components/ui/Logo";
import WelcomeText from "@/components/ui/WelcomeText";
import { mainstyles } from "@/constants/Styles";
import LoginForm from "@/components/login-signup/LoginForm";

const Login = () => {
  return (
    <LinearBackground>
      <Logo />
      <View>
        <WelcomeText text="Welcome" />
        <Text style={styles.text}>Glad to see you</Text>
      </View>
      <LoginForm />
      <View style={styles.registerContainer}>
        <Text style={mainstyles.caption}>Don’t have an account ?</Text>
        <Link href={"/auth/signup"}>
          <Text style={styles.registerText}>Register now</Text>
        </Link>
      </View>
    </LinearBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  text: {
    ...mainstyles.caption,
    textAlign: "center",
    textTransform: "capitalize",
  },
  registerContainer: {
    flexDirection: "row",
    gap: 2,
  },
  registerText: {
    ...mainstyles.caption,
    fontFamily: "Poppins_700Bold",
  },
});
