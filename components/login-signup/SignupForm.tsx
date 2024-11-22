import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import CustomButton from "../ui/CustomButton";
import CompanyFormStepTwo from "./CompanyFormStepTwo";
import CompanyFormStep from "./CompanyFormStep";
import IndividualFormStep from "./IndividualFormStep";

import { FormContext } from "@/store/signupContext";
import { FormValues } from "@/constants/Schemas";
import { mainstyles } from "@/constants/Styles";
import { useSignup } from "@/hooks/auth/useSignup";

export default function Signup() {
  const [step, setStep] = useState(0);
  const { accountType, setAccountType, formData, setFormData } =
    useContext(FormContext);

  console.log(step);
  console.log(formData.type);

  const handleNextStep = (data: Partial<typeof formData>) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (step === 1 && updatedData.type === "company") {
      setStep((prevStep) => prevStep + 1);
    } else if (step === 1 && updatedData.type === "individual") {
      onSubmit(updatedData); // Pass updated data directly
    } else if (step === 2) {
      onSubmit(updatedData); // Pass updated data directly
    }
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSelectType = (type: "company" | "individual") => {
    setAccountType(type);
    setFormData((prev) => ({ ...prev, type }));
    setStep(1);
  };

  const { mutate: signupMutation, isPending: isSigningUp } = useSignup();

  const onSubmit = (data: typeof formData) => {
    console.log(data);
    signupMutation(data);
  };

  return (
    <View style={styles.container}>
      {step === 0 ? (
        <View style={styles.buttonContainer}>
          <Text style={[mainstyles.title2, { textAlign: "center" }]}>
            Select Account Type
          </Text>
          <CustomButton
            title="Company"
            onPress={() => handleSelectType("company")}
          />
          <CustomButton
            title="Individual"
            onPress={() => handleSelectType("individual")}
          />
        </View>
      ) : accountType === "company" ? (
        step === 1 ? (
          <CompanyFormStep
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
          />
        ) : (
          <CompanyFormStepTwo
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
          />
        )
      ) : (
        <IndividualFormStep
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  buttonContainer: {
    gap: 16,
  },
});
