import { Button, StyleSheet, Switch, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";

import { Colors } from "@/constants/Colors";
import CountryFlag from "react-native-country-flag";
import { mainstyles } from "@/constants/Styles";

const AppSettingsForm = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [notificationTypeOn, setNotificationTypeOn] = useState<Array<number>>(
    []
  );
  const [appUpdates, setappUpdates] = useState(false);
  const [deliveredDesigns, setDeliveredDesigns] = useState(false);
  const [acceptedBillboards, setAcceptedBillboards] = useState(false);
  const [adsUploadingProgress, setAdsUploadingProgress] = useState(false);
  const [advertisingPeriodAlmostFinished, setAdvertisingPeriodAlmostFinished] =
    useState(false);

  const toggleSwitch = (id: number) => {
    switch (id) {
      case 1:
        setappUpdates((previousState) => !previousState);
        if (!appUpdates) {
          setNotificationTypeOn((prev) => [...prev, id]);
        } else {
          setNotificationTypeOn((prev) => prev.filter((item) => item !== id));
        }
        break;
      case 2:
        setDeliveredDesigns((previousState) => !previousState);
        if (!deliveredDesigns) {
          setNotificationTypeOn((prev) => [...prev, id]);
        } else {
          setNotificationTypeOn((prev) => prev.filter((item) => item !== id));
        }
        break;
      case 3:
        setAcceptedBillboards((previousState) => !previousState);
        if (!acceptedBillboards) {
          setNotificationTypeOn((prev) => [...prev, id]);
        } else {
          setNotificationTypeOn((prev) => prev.filter((item) => item !== id));
        }
        break;
      case 4:
        setAdsUploadingProgress((previousState) => !previousState);
        if (!adsUploadingProgress) {
          setNotificationTypeOn((prev) => [...prev, id]);
        } else {
          setNotificationTypeOn((prev) => prev.filter((item) => item !== id));
        }
        break;
      case 5:
        setAdvertisingPeriodAlmostFinished((previousState) => !previousState);
        if (!advertisingPeriodAlmostFinished) {
          setNotificationTypeOn((prev) => [...prev, id]);
        } else {
          setNotificationTypeOn((prev) => prev.filter((item) => item !== id));
        }
        break;
      default:
        setNotificationTypeOn([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={mainstyles.title2}>Language</Text>
        <View style={styles.input}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Arabic" value="ar" />
          </Picker>
        </View>
      </View>

      <View>
        <Text style={mainstyles.title2}>Notification</Text>
        <View style={styles.row}>
          <Text style={mainstyles.caption}>App Updates</Text>
          <Switch
            trackColor={{
              false: "#3e3e3e75",
              true: Colors.light.primary,
            }}
            thumbColor={"#fff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch(1)}
            value={appUpdates}
          />
        </View>

        <View style={styles.row}>
          <Text style={mainstyles.caption}>Delivered Designs</Text>
          <Switch
            trackColor={{
              false: "#3e3e3e75",
              true: Colors.light.primary,
            }}
            thumbColor={"#fff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch(2)}
            value={deliveredDesigns}
          />
        </View>

        <View style={styles.row}>
          <Text style={mainstyles.caption}>Accepted Billboards</Text>
          <Switch
            trackColor={{
              false: "#3e3e3e75",
              true: Colors.light.primary,
            }}
            thumbColor={"#fff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch(3)}
            value={acceptedBillboards}
          />
        </View>

        <View style={styles.row}>
          <Text style={mainstyles.caption}>Ads Uploading Progress</Text>
          <Switch
            trackColor={{
              false: "#3e3e3e75",
              true: Colors.light.primary,
            }}
            thumbColor={"#fff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch(4)}
            value={adsUploadingProgress}
          />
        </View>

        <View style={styles.row}>
          <Text style={mainstyles.caption}>
            Advertising Period Almost Finished
          </Text>
          <Switch
            trackColor={{
              false: "#3e3e3e75",
              true: Colors.light.primary,
            }}
            thumbColor={"#fff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch(5)}
            value={advertisingPeriodAlmostFinished}
          />
        </View>
      </View>
    </View>
  );
};

export default AppSettingsForm;

const styles = StyleSheet.create({
  container: {
    gap: 32,
  },
  input: {
    borderColor: Colors.light.primary,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 32,
  },
});
