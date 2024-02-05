import { Box, IconButton, Paper, Typography } from "@mui/material";
import { PensionDataType, PensionStrategy } from "../../models/types";
import { useEffect, useState } from "react";
import Validator from "../../helpers/Validator";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { setProductsPensionData } from "../../state/redux/reducers/productReducer";
import NumberInput from "../user-data-form/BaseNumberInput";
import { RootState } from "../../state/redux/store";

interface IProps {
  setIsValid: (isValid: boolean) => void;
}
const PensionConfig = ({ setIsValid }: IProps) => {
  const dispatch = useDispatch();
  const [valids, setValids] = useState<any>({
    isYouContributionValid: false,
    isStrategyValid: false,
  });
  const { pensionData } = useSelector((state: RootState) => state.product);

  const setIsAtrributeValid = (type: string, value: boolean) => {
    setValids((prev: any) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };

  const managePenstionData = (type: string, value: string | number) => {
    dispatch(
      setProductsPensionData({
        ...pensionData,
        [type]: value,
      })
    );
  };

  const setYourContrion = (value: string) => {
    dispatch(
      setProductsPensionData({
        ...pensionData,
        yourContribution: parseInt(value),
      })
    );
  };

  const incrementPensionData = (type: PensionDataType) => {
    dispatch(
      setProductsPensionData({
        ...pensionData,
        strategy: pensionData.strategy,
        [type]: (pensionData[type] as number) + 50,
      })
    );
  };

  const decrementPensionData = (type: PensionDataType) => {
    if (
      (pensionData[type] as number) > 0 &&
      (pensionData[type] as number) - 50 >= 0
    ) {
      dispatch(
        setProductsPensionData({
          ...pensionData,
          strategy: pensionData.strategy,
          [type]: (pensionData[type] as number) - 50,
        })
      );
    } else {
      dispatch(
        setProductsPensionData({
          ...pensionData,
          strategy: pensionData.strategy,
          [type]: 0,
        })
      );
    }
  };

  useEffect(() => {
    const isValid = valids.isYouContributionValid && valids.isStrategyValid;
    setIsValid(isValid);
  }, [valids]);

  useEffect(() => {
    setValids({
      isYouContributionValid: pensionData.yourContribution > 0,
      isStrategyValid: true,
    });
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Konfigurace produktu
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "650px",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        mt={2}
      >
        <Typography variant="h6" width={300}>
          Aktuálně naspořeno
        </Typography>
        <IconButton
          aria-label="fingerprint"
          color="success"
          onClick={() => decrementPensionData("currentSavings")}
        >
          <RemoveIcon />
        </IconButton>
        <Box display={"flex"} alignItems={"center"}>
          <input
            className="pension-config-input"
            type="number"
            value={pensionData.currentSavings}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              managePenstionData("currentSavings", value);
            }}
          />
          <Typography variant="h6">Kč</Typography>
        </Box>
        <IconButton
          aria-label="fingerprint"
          color="secondary"
          onClick={() => incrementPensionData("currentSavings")}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "650px",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        mt={2}
      >
        <Typography variant="h6" width={300}>
          Váš měsíční příspěvek
        </Typography>
        <IconButton
          aria-label="fingerprint"
          color="success"
          onClick={() => decrementPensionData("yourContribution")}
        >
          <RemoveIcon />
        </IconButton>
        <Box display={"flex"} alignItems={"center"}>
          <NumberInput
            baseInput={true}
            type="yourContribution"
            required
            id="your-contribution-input"
            setIsValid={setIsAtrributeValid}
            validAttibute="isYouContributionValid"
            setValue={setYourContrion}
            value={pensionData.yourContribution}
            errorMessage={""}
            min={0}
            max={1000000}
            label={""}
            className="pension-config-input"
          />

          <Typography variant="h6">Kč</Typography>
        </Box>
        <IconButton
          aria-label="fingerprint"
          color="secondary"
          onClick={() => incrementPensionData("yourContribution")}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "650px",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        mt={2}
      >
        <Typography variant="h6" width={300}>
          Příspěvek od zaměstnavatele
        </Typography>
        <IconButton
          aria-label="fingerprint"
          color="success"
          onClick={() => decrementPensionData("employerContribution")}
        >
          <RemoveIcon />
        </IconButton>
        <Box display={"flex"} alignItems={"center"}>
          <input
            className="pension-config-input"
            value={pensionData.employerContribution}
            type="number"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              managePenstionData("employerContribution", value);
            }}
          />
          <Typography variant="h6">Kč</Typography>
        </Box>
        <IconButton
          aria-label="fingerprint"
          color="secondary"
          onClick={() => incrementPensionData("employerContribution")}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Box
        mt={2}
        mb={3}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Typography variant="h6" mt={1} mb={3}>
          Strategie
        </Typography>
        <Box display={"flex"}>
          <Paper
            sx={{
              textAlign: "center",
              height: 50,
              width: 150,
              lineHeight: "50px",
              backgroundColor:
                pensionData.strategy === "Konzervativní" ? "#3f99ee" : "#fff",
              padding: "0 10px",
              margin: "0 10px",
              transition: "0.3s",
              ":hover": {
                backgroundColor: "#3f99ee",
              },
            }}
            elevation={8}
            onClick={() => {
              managePenstionData("strategy", "Konzervativní");
              setIsAtrributeValid("isStrategyValid", true);
            }}
          >
            Konzervativní
          </Paper>
          <Paper
            sx={{
              textAlign: "center",
              height: 50,
              width: 150,
              lineHeight: "50px",
              backgroundColor:
                pensionData.strategy === "Dynamická" ? "#3f99ee" : "#fff",
              padding: "0 10px",
              margin: "0 10px",
              ":hover": {
                backgroundColor: "#3f99ee",
              },
            }}
            elevation={8}
            onClick={() => {
              managePenstionData("strategy", "Dynamická");
              setIsAtrributeValid("isStrategyValid", true);
            }}
          >
            Dynamická
          </Paper>
          <Paper
            sx={{
              textAlign: "center",
              height: 50,
              width: 150,
              lineHeight: "50px",
              backgroundColor:
                pensionData.strategy === "Vyvážená" ? "#3f99ee" : "#fff",
              padding: "0 10px",
              margin: "0 10px",
              ":hover": {
                backgroundColor: "#3f99ee",
              },
            }}
            elevation={8}
            onClick={() => {
              managePenstionData("strategy", "Vyvážená");
              setIsAtrributeValid("isStrategyValid", true);
            }}
          >
            Vyvážená
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default PensionConfig;
