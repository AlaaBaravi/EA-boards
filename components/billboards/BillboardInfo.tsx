import { StyleSheet, Text, View } from "react-native";
import { Feather, Octicons } from "@expo/vector-icons";

import { Billboard } from "@/constants/Types";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";

const BillboardInfo = ({ billboard }: { billboard: Billboard }) => {
  return (
    <View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.keyText}>Name</Text>
          <Text style={styles.keyText}>Title</Text>
          <Text style={styles.keyText}>type</Text>
          <Text style={styles.keyText}>kind</Text>
          <Text style={styles.keyText}>status</Text>
          {/* <Text style={styles.keyText}>date</Text> */}
          <Text style={styles.keyText}>price</Text>
          {billboard.description && (
            <Text style={styles.keyText}>description</Text>
          )}
        </View>

        <View style={styles.column}>
          <Text style={mainstyles.caption}>{billboard.name}</Text>
          <Text style={mainstyles.caption}>{billboard.title}</Text>
          <Text style={mainstyles.caption}>
            {billboard.billboard_type_id.text_en + " " + "Billboard"}
          </Text>
          <Text style={mainstyles.caption}>{billboard.kind}</Text>
          <Text style={mainstyles.caption}>{billboard.status}</Text>
          {/* <Text style={mainstyles.caption}>{billboard.start_date_crowded}</Text> */}
          <Text
            style={mainstyles.caption}
          >{`$ ${billboard.price_on_regular} Per day`}</Text>
          {billboard.description && (
            <Text style={mainstyles.caption}>{billboard.description}</Text>
          )}
        </View>
      </View>

      <View>
        {(billboard.video_length ||
          billboard.video_repetition ||
          billboard.start_date_crowded ||
          billboard.company.min_booking_days) && (
          <Text style={styles.additionalInfo}>Additional Information</Text>
        )}

        <View style={styles.row}>
          <View style={styles.column}>
            {billboard.video_length && (
              <View style={[styles.row, { gap: 4 }]}>
                <Octicons name="video" size={16} color={Colors.light.primary} />
                <Text style={styles.keyText}>Video Length</Text>
              </View>
            )}
            {billboard.start_date_crowded && (
              <View style={[styles.row, { gap: 4 }]}>
                <Octicons name="clock" size={16} color={Colors.light.primary} />
                <Text style={styles.keyText}>Crowded Time</Text>
              </View>
            )}
            {billboard.video_repetition && (
              <View style={[styles.row, { gap: 4 }]}>
                <Feather name="repeat" size={16} color={Colors.light.primary} />
                <Text style={styles.keyText}>Video Repetition </Text>
              </View>
            )}
            {billboard.company.min_booking_days && (
              <View style={[styles.row, { gap: 4 }]}>
                <Octicons
                  name="calendar"
                  size={16}
                  color={Colors.light.primary}
                />
                <Text style={styles.keyText}>Number Booking Days</Text>
              </View>
            )}
          </View>

          <View style={styles.column}>
            {billboard.video_length && (
              <Text style={mainstyles.caption}>{billboard.video_length}</Text>
            )}

            {billboard.start_date_crowded && (
              <Text style={mainstyles.caption}>
                {`from ${billboard.start_date_crowded} to ${billboard.end_date_crowded}`}
              </Text>
            )}
            {billboard.video_repetition && (
              <Text style={mainstyles.caption}>
                {billboard.video_repetition}
              </Text>
            )}
            {billboard.company.min_booking_days && (
              <Text
                style={mainstyles.caption}
              >{`${billboard.company.min_booking_days} days to ${billboard.company.max_booking_days} days`}</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default BillboardInfo;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 40,
  },
  column: {
    gap: 8,
  },
  keyText: {
    ...mainstyles.captionSemiBold,
    color: Colors.light.primary,
    textTransform: "capitalize",
  },
  additionalInfo: {
    ...mainstyles.title1,
    color: Colors.light.primary,
    marginTop: 24,
    marginBottom: 16,
  },
});
