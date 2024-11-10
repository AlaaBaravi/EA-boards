import axios from "axios";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";

import CustomHeader from "@/components/home/CustomHeader";
import CompanyBillboards from "@/components/billboards/CompanyBillboards";
import AllBillboards from "@/components/billboards/AllBillboards";

import { Colors } from "@/constants/Colors";
import { mainstyles } from "@/constants/Styles";
import { Billboard } from "@/constants/Types";
import { getBillboards } from "@/util/https";
import { useAuth } from "@/store/authContext";

export default function Billboards() {
  const { state } = useAuth();
  const [billboards, setBillboards] = useState<Array<Billboard> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const billboardsData = await getBillboards();
        setBillboards(billboardsData);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || billboards === null) {
    return <ActivityIndicator size="large" color={Colors.light.primary} />;
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
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
