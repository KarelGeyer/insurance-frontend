import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Validator from "../helpers/Validator";
import { ValidationResult } from "../helpers/enums";
import { UserContext } from "../state/context/user-context";
import { ButtonEvent, ChangeInputEvent, PersonData } from "../models/types";

interface IProps {
  onContinue: (value: boolean) => void;
  onError: () => void;
  validator: Validator;
  hasContinue: boolean;
  shouldValidate?: boolean;
}

interface PersonDataErrors {
  nameHaveError: string;
  surnameHaveError: string;
  emailHaveError: string;
  phoneNumberHaveError: string;
  ageHaveError: string;
}

const PersonDetails: React.FC<IProps> = ({
  onContinue,
  onError,
  validator,
  hasContinue,
  shouldValidate,
}) => {
  const [userData, setUserData] = useState<PersonData>({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    age: 0,
  } as PersonData);

  const [personDataErrors, setPersonDataErrors] = useState<PersonDataErrors>({
    nameHaveError: "",
    surnameHaveError: "",
    emailHaveError: "",
    phoneNumberHaveError: "",
    ageHaveError: "",
  });

  // const [rewriteValues, setRewriteValues] = useState<boolean>(false);
  const {
    user: userContext,
    setUser: setUserContext,
    getHasUserValues,
  } = useContext(UserContext);

  const updateFormData = (e: ChangeInputEvent, data: string) => {
    setUserData({ ...userData, [data]: e.target.value });
  };

  const submit = (e?: ButtonEvent) => {
    e?.preventDefault();
    const phoneNumberResult = validator.validatePhone(userData.phoneNumber);
    const emailResult = validator.validateEmail(userData.email);
    const nameResult = validator.validateString(userData.name, 32);
    const surnameResult = validator.validateString(userData.surname, 32);
    const ageResult = validator.validateNumber(userData.age, 18, 120);

    setPersonDataErrors({
      nameHaveError:
        nameResult !== ValidationResult.SUCCESS ? "Špatný formát jména" : "",
      surnameHaveError:
        surnameResult !== ValidationResult.SUCCESS
          ? "Špatný formát příjmení"
          : "",
      emailHaveError:
        emailResult !== ValidationResult.SUCCESS
          ? "Špatný formát emailové adresy"
          : "",
      phoneNumberHaveError:
        phoneNumberResult !== ValidationResult.SUCCESS
          ? "Špatný formát telefonního čísla"
          : "",
      ageHaveError:
        ageResult !== ValidationResult.SUCCESS ? "Špatný formát věku" : "",
    });

    const isValid =
      phoneNumberResult === ValidationResult.SUCCESS &&
      emailResult === ValidationResult.SUCCESS &&
      nameResult === ValidationResult.SUCCESS &&
      surnameResult === ValidationResult.SUCCESS &&
      ageResult === ValidationResult.SUCCESS;

    if (isValid) {
      setUserContext({
        ...userContext,
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        age: userData.age,
      });

      onContinue && onContinue(true);
    } else onError && onError();
  };

  useEffect(() => {
    if (shouldValidate) submit();
  }, [shouldValidate]);

  useEffect(() => {
    if (getHasUserValues()) {
      setUserData({
        name: userContext.name,
        surname: userContext.surname,
        email: userContext.email,
        phoneNumber: userContext.phoneNumber,
        age: userContext.age,
      });
    }
  }, []); // Schválně nech chvíli bez závislostí, ať si to ostatní zkusí vyřešt sami

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "400px" }}>
      <TextField
        sx={{ margin: "10px 0" }}
        required
        id="outlined-required"
        label="Jméno"
        error={personDataErrors.nameHaveError !== ""}
        helperText={personDataErrors.nameHaveError}
        value={
          // userContext.name == "" || rewriteValues // zkus to udělat nejdřív takto špatně a dej za úkol to vyřešit
          //   ? userData.name
          //   : userContext.name
          userData.name
        }
        onChange={(e) => updateFormData(e as ChangeInputEvent, "name")}
      />
      <TextField
        sx={{ margin: "10px 0" }}
        required
        id="outlined-required"
        label="Příjmení"
        error={personDataErrors.surnameHaveError !== ""}
        helperText={personDataErrors.surnameHaveError}
        value={userData.surname}
        onChange={(e) => updateFormData(e as ChangeInputEvent, "surname")}
      />
      <TextField
        sx={{ margin: "10px 0" }}
        required
        id="outlined-required"
        label="Email"
        type="email"
        error={personDataErrors.emailHaveError !== ""}
        helperText={personDataErrors.emailHaveError}
        value={userData.email}
        onChange={(e) => updateFormData(e as ChangeInputEvent, "email")}
      />
      <TextField
        sx={{ margin: "10px 0" }}
        required
        id="outlined-required"
        label="Telefonní číslo"
        type="phone-number"
        error={personDataErrors.phoneNumberHaveError !== ""}
        helperText={personDataErrors.phoneNumberHaveError}
        value={userData.phoneNumber}
        onChange={(e) => updateFormData(e as ChangeInputEvent, "phoneNumber")}
      />

      <TextField
        sx={{ margin: "10px 0" }}
        required
        id="outlined-required"
        type="number"
        label="Váš věk"
        error={personDataErrors.ageHaveError !== ""}
        helperText={personDataErrors.ageHaveError}
        value={userData.age}
        onChange={(e) => updateFormData(e as ChangeInputEvent, "age")}
      />

      {hasContinue && (
        <Button sx={{ margin: "10px 0" }} variant="outlined" onClick={submit}>
          Další
        </Button>
      )}
    </Box>
  );
};

export default PersonDetails;

// Before context
// interface IProps {
//   onContinue: (data: PersonData) => void;
// }
