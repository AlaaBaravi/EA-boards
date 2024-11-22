import { View, Text, StyleSheet } from "react-native";

import CustomHeader from "@/components/home/CustomHeader";
import CompanyBillboards from "@/components/billboards/CompanyBillboards";
import AllBillboards from "@/components/billboards/AllBillboards";
import { mainstyles } from "@/constants/Styles";
import { useAuth } from "@/store/authContext";

export default function Billboards() {
  const { state } = useAuth();

  return (
    <>
      <CustomHeader>
        <Text style={mainstyles.title1}>
          {state.user?.type === "company" ? "My Billboards" : "Billboards"}
        </Text>
      </CustomHeader>

      <View style={styles.container}>
        {state.user?.type === "company" && <CompanyBillboards />}
        {state.user?.type === "individual" && <AllBillboards />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    ...mainstyles.container,
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
