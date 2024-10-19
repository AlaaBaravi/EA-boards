import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { List } from "react-native-paper";
import CustomHeader from "@/components/home/CustomHeader";
import { mainstyles } from "@/constants/Styles";
import Logo from "@/components/ui/Logo";

const about = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <>
      <CustomHeader>
        <Text style={styles.title}>about and feedback</Text>
      </CustomHeader>
      <View style={styles.container}>
        <View style={styles.logoConatiner}>
          <Logo />
        </View>
        <List.Section>
          <List.Accordion title="Terms & Conditions">
            <List.Item title="Lorem ipsum dolor sit amet consectetur. Est aenean ipsum montes pretium. Elit sit aliquam elementum eget varius turpis eleifend vel. Massa gravida amet elit nunc euismod. Convallis viverra non aliquet non scelerisque. Amet ante eu." />
          </List.Accordion>

          <List.Accordion title="Privacy Policy">
            <List.Item title="Lorem ipsum dolor sit amet consectetur. Est aenean ipsum montes pretium. Elit sit aliquam elementum eget varius turpis eleifend vel. Massa gravida amet elit nunc euismod. Convallis viverra non aliquet non scelerisque. Amet ante eu." />
          </List.Accordion>

          <List.Accordion title="Send Feedback">
            <List.Item title="Lorem ipsum dolor sit amet consectetur. Est aenean ipsum montes pretium. Elit sit aliquam elementum eget varius turpis eleifend vel. Massa gravida amet elit nunc euismod. Convallis viverra non aliquet non scelerisque. Amet ante eu." />
          </List.Accordion>
        </List.Section>
      </View>
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
