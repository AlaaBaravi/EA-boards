import { StyleSheet, Text, View } from "react-native";
import { Billboard } from "@/constants/Types";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { Ionicons, Octicons } from "@expo/vector-icons";

const BillboardInfo = ({ billboard }: { billboard: Billboard }) => {
  console.log(billboard);

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.row}>
          <Text style={styles.keyText}>Name</Text>
          <Text style={styles.valueText}>{billboard.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.keyText}>Title</Text>
          <Text style={styles.valueText}>{billboard.title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.keyText}>type</Text>
          <Text style={styles.valueText}>
            {billboard.billboard_type_id.text_en + " " + "Billboard"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.keyText}>kind</Text>
          <Text style={styles.valueText}>{billboard.kind}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.keyText}>status</Text>
          <Text style={styles.valueText}>{billboard.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.keyText}>price on regular</Text>
          <Text
            style={styles.valueText}
          >{`$ ${billboard.price_on_regular} per day`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.keyText}>price on crowded</Text>
          <Text
            style={styles.valueText}
          >{`$ ${billboard.price_on_crowded} per day`}</Text>
        </View>
      </View>

      {billboard.kind === "digital" && (
        <View>
          <Text style={styles.additionalInfo}>Additional Information</Text>

          <View style={styles.column}>
            <View style={styles.row}>
              <View style={[styles.rowIcon, styles.keyText]}>
                <Octicons name="video" size={16} color={Colors.light.primary} />
                <Text style={styles.keyText}>Video Length</Text>
              </View>
              <Text
                style={styles.valueText}
              >{`${billboard.video_length} sec`}</Text>
            </View>

            <View style={styles.row}>
              <View style={[styles.rowIcon, styles.keyText]}>
                <Octicons name="clock" size={16} color={Colors.light.primary} />
                <Text style={styles.keyText}>Crowded Time</Text>
              </View>
              <Text
                style={styles.valueText}
              >{`from ${billboard.start_date_crowded} to ${billboard.end_date_crowded}`}</Text>
            </View>

            <View style={styles.row}>
              <View style={[styles.rowIcon, styles.keyText]}>
                <Ionicons
                  name="repeat-outline"
                  size={16}
                  color={Colors.light.primary}
                />
                <Text style={styles.keyText}>Video Repetition</Text>
              </View>
              <Text
                style={styles.valueText}
              >{`${billboard.video_repetition} Time per hour`}</Text>
            </View>

            <View style={styles.row}>
              <View style={[styles.rowIcon, , styles.keyText]}>
                <Ionicons
                  name="calendar-clear-outline"
                  size={16}
                  color={Colors.light.primary}
                />
                <Text style={styles.keyText}>Number Booking Days</Text>
              </View>
              <Text
                style={styles.valueText}
              >{`${billboard.number_booking_day} Days`}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default BillboardInfo;

const styles = StyleSheet.create({
  container: { gap: 24 },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  column: {
    gap: 8,
  },
  keyText: {
    ...mainstyles.captionSemiBold,
    color: Colors.light.primary,
    textTransform: "capitalize",
    flex: 1,
  },
  valueText: {
    ...mainstyles.caption,
    textTransform: "capitalize",
    flex: 1,
  },
  additionalInfo: {
    ...mainstyles.title1,
    color: Colors.light.primary,
    marginBottom: 16,
  },
});
