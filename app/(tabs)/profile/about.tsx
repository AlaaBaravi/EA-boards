import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { List, TextInput } from "react-native-paper";
import Toast from "react-native-root-toast";

import { mainstyles } from "@/constants/Styles";
import CustomHeader from "@/components/home/CustomHeader";
import Logo from "@/components/ui/Logo";
import axios from "axios";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/ui/CustomButton";

interface info {
  created_at: null;
  id: number;
  text_ar: string;
  text_en: string;
  title_ar: string;
  title_en: string;
  updated_at: null;
}

const formSchema = z.object({
  title: z.string(),
  email: z.string().email("Enter a valid email"),
  text: z.string().max(100, { message: "The maximum characters is 100" }),
});

type FeedbackFormInputs = z.infer<typeof formSchema>;

const about = () => {
  const [data, setData] = useState<Array<info> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormInputs>({
    defaultValues: {
      email: "",
      title: "",
      text: "",
    },
    resolver: zodResolver(formSchema),
  });

  const privacyPolicy = data?.filter((item) => item.id === 1).at(0);
  const termsAndConditions = data?.filter((item) => item.id === 2).at(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://new.aeboards.net/api/info/get_info",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        setData(response.data.data);
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

  const onSubmit: SubmitHandler<FeedbackFormInputs> = async (data) => {
    try {
      const response = await axios.post(
        "https://new.aeboards.net/api/info/send_feedback",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      Toast.show("Thanks for your feedback.", {
        duration: Toast.durations.LONG,
        backgroundColor: "#198754",
        opacity: 1,
      });
      reset({
        title: "",
        text: "",
        email: "",
      });
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
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
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.logoConatiner}>
            <Logo />
          </View>
          <List.Section>
            <List.Accordion title={termsAndConditions?.title_en}>
              <List.Item title={termsAndConditions?.text_en} />
            </List.Accordion>

            <List.Accordion title={privacyPolicy?.title_en}>
              <List.Item title={privacyPolicy?.text_en} />
            </List.Accordion>

            <List.Accordion title="Send Feedback">
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    mode="outlined"
                    label="Email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.email?.message &&
                typeof errors.email.message === "string" && (
                  <Text style={styles.error}>{errors.email.message}</Text>
                )}

              <Controller
                control={control}
                name="title"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    mode="outlined"
                    label="Title"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.title?.message &&
                typeof errors.title.message === "string" && (
                  <Text style={styles.error}>{errors.title.message}</Text>
                )}

              <Controller
                control={control}
                name="text"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    mode="outlined"
                    label="Your feedback"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    multiline={true}
                    numberOfLines={5}
                  />
                )}
              />
              {errors.text?.message &&
                typeof errors.text.message === "string" && (
                  <Text style={styles.error}>{errors.text.message}</Text>
                )}

              <CustomButton title="Send" onPress={handleSubmit(onSubmit)} />
            </List.Accordion>
          </List.Section>
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
  error: {
    color: "red",
    marginBottom: 10,
  },
});
