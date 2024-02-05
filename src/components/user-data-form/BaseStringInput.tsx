import { SxProps, TextField, Theme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Validator from "../../helpers/Validator";
import { UserContext } from "../../state/context/user-context";
import { ValidationResult } from "../../helpers/enums";
import {
  ChangeInputEvent,
  ExtendedStringInputType,
  FocusInputEvent,
  StringInputType,
  ValidatorStringMethods,
} from "../../models/types";
import { getInputMessageByType } from "../../helpers/functions";

interface IProps {
  type?: ExtendedStringInputType;
  label: string;
  required?: boolean;
  id: string;
  validationMethod?: ValidatorStringMethods;
  validAttibute: string;
  errorMessage: string;
  isUserForm?: boolean;
  value?: string;
  setIsValid: (type: string, value: boolean) => void;
  setValue?: (value: string) => void;
  sx?: SxProps<Theme>;
}

const StringInput = ({
  type = "name",
  label,
  required,
  id,
  validationMethod,
  validAttibute,
  errorMessage,
  setIsValid,
  setValue,
  value,
  isUserForm = true,
  sx,
}: IProps) => {
  const validator = new Validator();
  const [inputError, setInputError] = useState<string>("");
  const { user: userContext, setUser: setUserContext } =
    useContext(UserContext);

  const onChange = (e: ChangeInputEvent) => {
    const nameValidationResult = validator[
      validationMethod ? validationMethod : "validateString"
    ](e.target.value, 32);

    setIsValid(
      validAttibute,
      nameValidationResult === ValidationResult.SUCCESS
    );

    if (isUserForm) {
      setUserContext({
        ...userContext,
        [type]: e.target.value,
      });
    } else {
      setValue && setValue(e.target.value);
    }
  };

  const onBlur = (value: string) => {
    const nameValidationResult = validator[
      validationMethod ? validationMethod : "validateString"
    ](value, 32);

    setInputError(
      nameValidationResult === ValidationResult.SUCCESS ? "" : errorMessage
    );
  };

  useEffect(() => {
    if (isUserForm) {
      if (userContext[type as StringInputType] !== "") {
        const nameValidationResult = validator[
          validationMethod ? validationMethod : "validateString"
        ](userContext[type as StringInputType], 32);
        setIsValid(
          validAttibute,
          nameValidationResult === ValidationResult.SUCCESS
        );
      }
    }
  }, []);

  return (
    <TextField
      sx={{ ...sx, margin: "10px 0" }}
      required={required}
      id={id}
      label={label}
      error={inputError !== ""}
      helperText={inputError !== "" ? inputError : getInputMessageByType(type)}
      value={isUserForm ? userContext[type as StringInputType] : value}
      onChange={onChange}
      onBlur={(e: FocusInputEvent) => onBlur(e.target.value)}
    />
  );
};

export default StringInput;
