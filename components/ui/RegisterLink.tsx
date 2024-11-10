import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { mainstyles } from "@/constants/Styles";

const RegisterLink = () => {
  return (
    <View style={styles.registerContainer}>
      <Text style={mainstyles.caption}>Don’t have an account ?</Text>
      <Link href={"/auth/signup"}>
        <Text style={styles.registerText}>Register now</Text>
      </Link>
    </View>
  );
};

export default RegisterLink;

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
