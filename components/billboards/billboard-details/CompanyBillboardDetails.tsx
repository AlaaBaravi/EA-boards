import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Octicons } from "@expo/vector-icons";

import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/store/authContext";
import { useDeleteBillboard } from "@/hooks/billboards/useDeleteBillboard";
import { useBillboardById } from "@/hooks/billboards/useBillboardById";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import BillboardImage from "./BillboardImage";
import Location from "./Location";
import BillboardInfo from "./BillboardInfo";
import BillboardImages from "./BillboardImages";

const CompanyBillboardDetails = ({ myId }: { myId: string }) => {
  const { state } = useAuth();
  const {
    data: billboard,
    isPending: isBillboard,
    error,
  } = useBillboardById(myId, state.user?.token!);

  const { mutate: deleteMutation, isPending: isDeleting } =
    useDeleteBillboard();

  const confirmDelete = () => {
    Alert.alert(
      "Delete Billboard",
      "Are you sure you want to delete this billboard?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () =>
            deleteMutation({
              id: billboard?.id.toString()!,
              token: state.token!,
            }),
        },
      ],
      { cancelable: true }
    );
  };

  if (isBillboard || isDeleting) {
    return <Loading />;
  }

  if (error) {
    return <Error errorMessage={error.message} />;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={mainstyles.container}>
        <BillboardImage billboard={billboard} />
        <View style={styles.row}>
          <Location billboard={billboard} />
          <View style={styles.row}>
            <Octicons
              name="trash"
              size={24}
              color={Colors.light.danger}
              onPress={confirmDelete}
              disabled={isDeleting}
            />
            <Octicons
              name="pencil"
              size={24}
              color="black"
              onPress={() =>
                router.push({
                  pathname: "/(app)/(billboards)/edit-billboard",
                  params: { id: myId },
                })
              }
            />
          </View>
        </View>
        <BillboardInfo billboard={billboard!} />
        {billboard.files.length > 1 && (
          <BillboardImages billboard={billboard!} />
        )}
      </View>
    </ScrollView>
  );
};

export default CompanyBillboardDetails;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
});
