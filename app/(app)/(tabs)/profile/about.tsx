import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { List } from "react-native-paper";
import axios from "axios";

import FeedbackForm from "@/components/profile/FeedbackForm";
import CustomHeader from "@/components/home/CustomHeader";
import Logo from "@/components/ui/Logo";
import { mainstyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { info } from "@/constants/Types";
import { getInfo } from "@/util/https";
import Loading from "@/components/ui/Loading";

const about = () => {
  const [data, setData] = useState<Array<info> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const privacyPolicy = data?.filter((item) => item.id === 1).at(0);
  const termsAndConditions = data?.filter((item) => item.id === 2).at(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoData = await getInfo();
        setData(infoData);
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

  if (loading) {
    return <Loading />;
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
        <Text style={styles.title}>about and feedback</Text>
      </CustomHeader>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.logoConatiner}>
            <Logo />
          </View>
          <ScrollView style={{ flex: 1 }}>
            <List.Section>
              <List.Accordion title={termsAndConditions?.title_en}>
                <List.Item title={termsAndConditions?.text_en} />
              </List.Accordion>

              <List.Accordion title={privacyPolicy?.title_en}>
                <List.Item title={privacyPolicy?.text_en} />
              </List.Accordion>

              <List.Accordion title="Send Feedback">
                <FeedbackForm />
              </List.Accordion>
            </List.Section>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default about;

const styles = StyleSheet.create({
  title: {
    ...mainstyles.title1,
    textTransform: "capitalize",
  },
  container: {
    ...mainstyles.container,
  },
  logoConatiner: {
    alignItems: "center",
  },
});
