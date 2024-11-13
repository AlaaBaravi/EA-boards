import axios from "axios";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";

import CustomHeader from "@/components/home/CustomHeader";
import CompanyBillboards from "@/components/billboards/CompanyBillboards";
import AllBillboards from "@/components/billboards/AllBillboards";

import { mainstyles } from "@/constants/Styles";
import { Billboard } from "@/constants/Types";
import { getBillboards } from "@/util/https";
import { useAuth } from "@/store/authContext";
import { useQuery } from "@tanstack/react-query";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";

export default function Billboards() {
  const { state } = useAuth();
  const {
    data: billboards,
    isLoading,
    isError,
    error,
  } = useQuery<Billboard[], Error>(["billboards"], () => getBillboards());

  if (isLoading || billboards === null) {
    return <Loading />;
  }

  if (isError) {
    return <Error errorMessage={error.message} />;
  }

  return (
    <>
      <CustomHeader>
        <Text style={mainstyles.title1}>
          {state.user?.type === "company" ? "My Billboards" : "Billboards"}
        </Text>
      </CustomHeader>
      <View style={styles.container}>
        {state.user?.type === "company" && (
          <CompanyBillboards billboards={billboards} />
        )}
        {state.user?.type === "individual" && (
          <AllBillboards billboards={billboards} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    ...mainstyles.container,
    marginBottom: 48,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  billboardContainer: {
    width: "100%",
  },
});
