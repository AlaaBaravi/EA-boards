import { FormValues } from "@/constants/Schemas";
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from "react";

// Define the type of data in the context
interface FormContextType {
  formData: FormValues;
  setFormData: Dispatch<SetStateAction<FormValues>>;
  accountType: FormValues["type"];
  setAccountType: (type: FormValues["type"]) => void;
}

// Initial form data state
const initialFormData: FormValues = {
  type: "individual", // default to individual, change as needed
  username: "",
  industry_type_id: undefined,
  location: "",
  business_size: "",
  name: "",
  email: "",
  phone: "",
  password: "",
  image: undefined,
  files: [],
};

// Create the context with a default empty implementation
export const FormContext = createContext<FormContextType>({
  formData: initialFormData,
  setFormData: () => {},
  accountType: "individual",
  setAccountType: () => {},
});

// Provider component for the context
export const FormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormValues>(initialFormData);
  const [accountType, setAccountType] =
    useState<FormValues["type"]>("individual");

  return (
    <FormContext.Provider
      value={{ formData, setFormData, accountType, setAccountType }}
    >
      {children}
    </FormContext.Provider>
  );
};
