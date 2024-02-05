import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import StringInput from "./user-data-form/BaseStringInput";
import NumberInput from "./user-data-form/BaseNumberInput";

interface IProps {
  setIsValid: (isValid: boolean) => void;
}

interface PersonDataValids {
  isNameValid: boolean;
  isSurnanameValid: boolean;
  isEmailValid: boolean;
  isPhoneNumberValid: boolean;
  isAgeValid: boolean;
}

const PersonDetails: React.FC<IProps> = ({ setIsValid }) => {
  const [valids, setValids] = useState<PersonDataValids>({
    isNameValid: false,
    isSurnanameValid: false,
    isEmailValid: false,
    isPhoneNumberValid: false,
    isAgeValid: false,
  });

  const setIsAttributeValid = (type: string, value: boolean) => {
    setValids((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };

  useEffect(() => {
    const isValid =
      valids.isNameValid &&
      valids.isSurnanameValid &&
      valids.isEmailValid &&
      valids.isPhoneNumberValid &&
      valids.isAgeValid;
    setIsValid(isValid);
  }, [valids]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "400px" }}>
      <StringInput
        label="Jméno"
        required
        id="name-input"
        setIsValid={setIsAttributeValid}
        validAttibute="isNameValid"
        errorMessage="Špatný formát jména"
      />
      <StringInput
        type="surname"
        label="Příjmení"
        required
        id="surname-input"
        setIsValid={setIsAttributeValid}
        validAttibute="isSurnanameValid"
        errorMessage="Špatný formát příjmení"
      />
      <StringInput
        type="email"
        label="Email"
        required
        id="email-input"
        validationMethod="validateEmail"
        setIsValid={setIsAttributeValid}
        validAttibute="isEmailValid"
        errorMessage="Špatný formát emailu"
      />
      <StringInput
        type="phoneNumber"
        label="Telefonní číslo"
        required
        id="phone-number-input"
        validationMethod="validatePhone"
        setIsValid={setIsAttributeValid}
        validAttibute="isPhoneNumberValid"
        errorMessage="Špatný formát telefonního čísla"
      />
      <NumberInput
        type="age"
        label="Věk"
        required
        id="age-input"
        setIsValid={setIsAttributeValid}
        validAttibute="isAgeValid"
        errorMessage="Špatný formát věku"
      />
    </Box>
  );
};

export default PersonDetails;
