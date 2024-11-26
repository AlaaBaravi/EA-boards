import AddBillboardForm from "@/components/billboards/add-billboard/AddBillboardForm";
import AddLocation from "@/components/billboards/add-billboard/AddLocation";
import { useState } from "react";

const AddBillboards = () => {
  const [step, setStep] = useState(0);
  const [pickedLocation, setLoaction] = useState<string>("");

  const handleNextStep = (pickedlocation: string) => {
    setStep((prev) => prev + 1);
    setLoaction(pickedlocation);
  };
  return (
    <>
      {step === 0 && <AddLocation onNextStep={handleNextStep} />}
      {step === 1 && <AddBillboardForm location={pickedLocation} />}
    </>
  );
};

export default AddBillboards;
