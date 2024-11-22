import { StyleSheet, Text, View } from "react-native";
import { Billboard, Description } from "@/constants/Types";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { formatNumber } from "@/util/fn";
import { useAuth } from "@/store/authContext";

const BillboardInfo = ({ billboard }: { billboard: Billboard }) => {
  const { state } = useAuth();

  let description: Description = {};
  try {
    if (billboard.description) {
      description = JSON.parse(billboard.description);
    }
  } catch (error) {
    console.error("Error parsing billboard description:", error);
  }

  console.log(billboard.availability);

  return (
    <View style={styles.container}>
      <View style={styles.rowBetween}>
        {description.height && description.width && (
          <View>
            <View style={styles.rowIcon}>
              <MaterialIcons
                name="screenshot-monitor"
                size={16}
                color={Colors.light.primary}
              />
              <Text style={styles.size}>Dimensions</Text>
            </View>
            <Text
              style={mainstyles.title3}
            >{`${description.width} x ${description.height} meters`}</Text>
          </View>
        )}

        {description.from && description.to && (
          <View>
            <View style={styles.rowIcon}>
              <MaterialIcons
                name="screenshot-monitor"
                size={16}
                color={Colors.light.primary}
              />
              <Text style={styles.size}>Reach / Hour</Text>
            </View>
            <Text style={mainstyles.title3}>{`${formatNumber(
              description.from
            )} - ${formatNumber(description.to)} views`}</Text>
          </View>
        )}

        {state.user?.type === "individual" && (
          <View>
            <View style={styles.rowIcon}>
              <MaterialIcons
                name="loop"
                size={16}
                color={Colors.light.primary}
              />
              <Text style={styles.size}>Availability</Text>
            </View>
            <Text style={mainstyles.title3}>Available</Text>
          </View>
        )}
      </View>

      <View style={styles.column}>
        {billboard.name && (
          <View style={styles.row}>
            <Text style={styles.keyText}>Name</Text>
            <Text style={styles.valueText}>{billboard.name}</Text>
          </View>
        )}

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
          <Text style={styles.keyText}>price</Text>
          <Text
            style={styles.valueText}
          >{`$ ${billboard.price_on_regular} per day`}</Text>
        </View>

        {billboard.kind === "digital" && billboard.price_on_crowded && (
          <View style={styles.row}>
            <Text style={styles.keyText}>price on crowded</Text>
            <Text
              style={styles.valueText}
            >{`$ ${billboard.price_on_crowded} per day`}</Text>
          </View>
        )}

        {description.billboard && (
          <View style={styles.row}>
            <Text style={styles.keyText}>description</Text>
            <Text style={styles.valueText}>{description.billboard}</Text>
          </View>
        )}
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

            {billboard.start_date_crowded && billboard.end_date_crowded && (
              <View style={styles.row}>
                <View style={[styles.rowIcon, styles.keyText]}>
                  <Octicons
                    name="clock"
                    size={16}
                    color={Colors.light.primary}
                  />
                  <Text style={styles.keyText}>Crowded Time</Text>
                </View>
                <Text
                  style={styles.valueText}
                >{`from ${billboard.start_date_crowded} to ${billboard.end_date_crowded}`}</Text>
              </View>
            )}

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
    flexWrap: "wrap",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  size: {
    ...mainstyles.captionSemiBold,
    color: Colors.light.primary,
    textTransform: "capitalize",
  },
});
