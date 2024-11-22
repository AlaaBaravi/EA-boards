import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { List } from "react-native-paper";

import FeedbackForm from "@/components/profile/FeedbackForm";
import CustomHeader from "@/components/home/CustomHeader";
import Logo from "@/components/ui/Logo";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

import { mainstyles } from "@/constants/Styles";
import { useInfo } from "@/hooks/info/useInfo";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const about = () => {
  const { data, isPending, error } = useInfo();

  if (isPending) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;

  const privacyPolicy = data?.filter((item) => item.id === 1).at(0);
  const termsAndConditions = data?.filter((item) => item.id === 2).at(0);

  return (
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
          <List.Section style={{ gap: 12 }}>
            <List.Accordion
              title={termsAndConditions?.title_en}
              style={{ backgroundColor: Colors.light.primaryBackground }}
              titleStyle={{ color: "black" }}
            >
              <List.Item title={termsAndConditions?.text_en} />
            </List.Accordion>

            <List.Accordion
              title={privacyPolicy?.title_en}
              style={{ backgroundColor: Colors.light.primaryBackground }}
              titleStyle={{ color: "black" }}
            >
              <List.Item title={privacyPolicy?.text_en} />
            </List.Accordion>

            <List.Accordion
              title="Send Feedback"
              style={{ backgroundColor: Colors.light.primaryBackground }}
              titleStyle={{ color: "black" }}
            >
              <FeedbackForm />
            </List.Accordion>
          </List.Section>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
