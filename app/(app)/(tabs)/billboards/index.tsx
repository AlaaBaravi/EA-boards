import axios from "axios";
import { View, Text, StyleSheet } from "react-native";

import CustomHeader from "@/components/home/CustomHeader";
import CompanyBillboards from "@/components/billboards/CompanyBillboards";
import AllBillboards from "@/components/billboards/AllBillboards";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import { mainstyles } from "@/constants/Styles";
import { useAuth } from "@/store/authContext";
import { useBillboards } from "@/hooks/billboards/useBillboards";

export default function Billboards() {
  const { state } = useAuth();
  const { data: billboards, isPending, isError, error } = useBillboards();

  if (isPending) {
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
        {state.user?.type === "company" && <CompanyBillboards />}
        {state.user?.type === "individual" && (
          <AllBillboards billboards={billboards!} />
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
