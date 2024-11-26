import { mainstyles } from "@/constants/Styles";
import React, { FC } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import CustomButton from "../ui/CustomButton";
import { Colors } from "@/constants/Colors";
import { Company } from "@/constants/Types";

interface CompleteBookingModalProps {
  isVisible: boolean;
  company?: Company;
  number: string;
  onCancel: () => void;
}

const CompleteBookingModal: FC<CompleteBookingModalProps> = ({
  isVisible,
  company = {},
  number,
  onCancel,
}) => {
  if (!isVisible) return null;

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <View style={styles.modalContent}>
        <Text style={[mainstyles.title1, { textAlign: "center" }]}>
          You choose {number} billboard from “{company.name}”
        </Text>
        <Text style={mainstyles.caption}>
          From this company you can choose at list {company.min_booking_days}{" "}
          billboard and at most {company.max_booking_days} billboard
        </Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <CustomButton
            title="Cancel"
            onPress={onCancel}
            style={{ backgroundColor: Colors.light.danger, flex: 1 }}
          />
          <CustomButton
            title="Complete Booking"
            onPress={() => console.log("COMPLETE")}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </View>
  );
};

export default CompleteBookingModal;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: "white",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
  },
});
