import { StyleSheet, Text, View } from "react-native";
import Logo from "@/components/ui/Logo";
import LinearBackground from "@/components/ui/LinearBackground";
import SignupForm from "@/components/login-signup/SignupForm";
import { Link } from "expo-router";
import { mainstyles } from "@/constants/Styles";
import { FormProvider } from "@/store/signupContext";

const Signup = () => {
  return (
    <FormProvider>
      <LinearBackground>
        <Logo />
        <SignupForm />
        <View style={styles.registerContainer}>
          <Text style={mainstyles.caption}>Already have an account ?</Text>
          <Link href={"/auth/login"}>
            <Text style={styles.registerText}>Login now</Text>
          </Link>
        </View>
      </LinearBackground>
    </FormProvider>
  );
};

export default Signup;

const styles = StyleSheet.create({
  registerContainer: {
    flexDirection: "row",
    gap: 2,
  },
  registerText: {
    ...mainstyles.caption,
    fontFamily: "Poppins_700Bold",
  },
});
