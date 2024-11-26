import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { mainstyles } from "@/constants/Styles";
import Empty from "../ui/Empty";

const PendingBillboards = () => {
  return (
    <>
      <Empty text="You don't hav any pending billboards!" />
    </>
  );
};

export default PendingBillboards;
