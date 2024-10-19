import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomHeader from "@/components/home/CustomHeader";
import { mainstyles } from "@/constants/Styles";

const accountInfo = () => {
  return (
    <>
      <CustomHeader>
        <Text style={mainstyles.title1}>Account info and settings</Text>
      </CustomHeader>
      <View>
        <Text>accountInfo</Text>
      </View>
    </>
  );
};

export default accountInfo;

const styles = StyleSheet.create({});
