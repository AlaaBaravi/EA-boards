import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomHeader from "@/components/home/CustomHeader";
import { mainstyles } from "@/constants/Styles";

const appSettings = () => {
  return (
    <>
      <CustomHeader>
        <Text style={mainstyles.title1}>App Settings</Text>
      </CustomHeader>
      <View>
        <Text>appSettings</Text>
      </View>
    </>
  );
};

export default appSettings;

const styles = StyleSheet.create({});
