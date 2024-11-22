import { ScrollView, StyleSheet, View } from "react-native";
import { router } from "expo-router";

import { mainstyles } from "@/constants/Styles";
import { useBillboards } from "@/hooks/info/useBillboards";

import BillboardImages from "./BillboardImages";
import BillboardInfo from "./BillboardInfo";
import BillboardImage from "./BillboardImage";
import Location from "./billboard-details/Location";
import Favorite from "./billboard-details/Favorite";
import Error from "../ui/Error";
import Loading from "../ui/Loading";
import CustomButton from "../ui/CustomButton";

const CustomerBillboardDetails = ({ myId }: { myId: string }) => {
  const { data: billboards, isPending, error } = useBillboards();

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error errorMessage={error.message} />;
  }

  const filteredBillboard = billboards
    .filter((billboard) => billboard.id === Number(myId))
    .at(0);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={mainstyles.container}>
        <BillboardImage billboard={filteredBillboard!} />
        <View style={styles.row}>
          <Location billboard={filteredBillboard!} />
          <Favorite id={myId} />
        </View>
        <BillboardInfo billboard={filteredBillboard!} />
        {filteredBillboard?.files.length! > 0 && (
          <BillboardImages billboard={filteredBillboard!} />
        )}
        <CustomButton
          title="Go to booking page"
          icon="cart"
          onPress={() => router.replace("/(app)/(tabs)/booking")}
        />
      </View>
    </ScrollView>
  );
};

export default CustomerBillboardDetails;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});
