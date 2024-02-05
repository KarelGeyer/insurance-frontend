import { SxProps, TextField, Theme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Validator from "../../helpers/Validator";
import { UserContext } from "../../state/context/user-context";
import { ValidationResult } from "../../helpers/enums";
import {
  FocusInputEvent,
  NumberInputType,
  ValidatorNumberMethods,
} from "../../models/types";
import { getInputMessageByType } from "../../helpers/functions";

interface IProps {
  type?: NumberInputType;
  label: string;
  required?: boolean;
  id: string;
  validationMethod?: ValidatorNumberMethods;
  validAttibute: string;
  value?: number;
  errorMessage: string;
  setIsValid: (type: string, value: boolean) => void;
  setValue?: (value: string) => void;
  sx?: SxProps<Theme>;
  min?: number;
  max?: number;
  baseInput?: boolean;
  className?: string;
}

const NumberInput = ({
  type = "age",
  label,
  required,
  id,
  validationMethod,
  validAttibute,
  errorMessage,
  setIsValid,
  setValue,
  value,
  sx,
  min,
  max,
  baseInput = false,
  className,
}: IProps) => {
  const validator = new Validator();
  const [inputError, setInputError] = useState<string>("");
  const { user: userContext, setUser: setUserContext } =
    useContext(UserContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validationResult = validator[
      validationMethod ? validationMethod : "validateNumber"
    ](parseInt(e.target.value), min ?? 18, max ?? 120);
    setIsValid(validAttibute, validationResult === ValidationResult.SUCCESS);

    console.log(validationResult);

    if (type == "age") {
      setUserContext({
        ...userContext,
        [type]: parseInt(e.target.value),
      });
    } else {
      setValue && setValue(e.target.value);
    }
  };

  const onBlur = (value: string) => {
    const validationResult = validator[
      validationMethod ? validationMethod : "validateNumber"
    ](parseInt(value), 18, 120);

    setInputError(
      validationResult === ValidationResult.SUCCESS ? "" : errorMessage
    );
  };

  useEffect(() => {
    if (type == "age") {
      if (userContext[type] !== 0) {
        const nameValidationResult = validator[
          validationMethod ? validationMethod : "validateNumber"
        ](userContext[type], 18, 120);
        setIsValid(
          validAttibute,
          nameValidationResult === ValidationResult.SUCCESS
        );
      }
    }
  }, []);

  return (
    <>
      {baseInput ? (
        <input
          className={className && className}
          type="number"
          required={required}
          id={id}
          value={value}
          onChange={onChange}
        />
      ) : (
        <TextField
          sx={{ ...sx, margin: "10px 0" }}
          className={className && className}
          type="number"
          required={required}
          id={id}
          label={label}
          error={inputError !== ""}
          helperText={
            inputError !== "" ? inputError : getInputMessageByType(type)
          }
          value={type == "age" ? userContext[type] : value}
          onChange={onChange}
          onBlur={(e: FocusInputEvent) => onBlur(e.target.value)}
        />
      )}
    </>
  );
};

export default NumberInput;
