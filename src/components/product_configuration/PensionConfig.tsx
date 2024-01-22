import { Box, IconButton, Paper, Typography } from "@mui/material";
import { PensionDataType, PensionStrategy } from "../../models/types";
import { useEffect, useState } from "react";
import Validator from "../../helpers/Validator";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IPensionData } from "../../models/interfaces";
import { useDispatch } from "react-redux";
import { setProductsPensionData } from "../../state/redux/reducers/productReducer";

interface IProps {
  shouldSubmit: boolean;
  validator: Validator;
}
const PensionConfig = ({ validator, shouldSubmit }: IProps) => {
  const dispatch = useDispatch();

  const [pensionData, setPensionData] = useState<IPensionData>({
    strategy: "Konzervativní",
    currentSavings: 0,
    yourContribution: 0,
    employerContribution: 0,
  });

  const managePenstionData = (
    type: PensionDataType,
    value: PensionStrategy | number
  ) => {
    setPensionData((prevState: any) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const incrementPensionData = (type: PensionDataType) => {
    setPensionData((prevState: any) => ({
      ...prevState,
      [type]: prevState[type] + 50,
    }));
  };

  const decrementPensionData = (type: PensionDataType) => {
    if (
      (pensionData[type] as number) > 0 &&
      (pensionData[type] as number) - 50 >= 0
    ) {
      setPensionData((prevState: any) => ({
        ...prevState,
        [type]: prevState[type] - 50,
      }));
    } else {
      setPensionData((prevState: any) => ({
        ...prevState,
        [type]: 0,
      }));
    }
  };

  useEffect(() => {
    if (shouldSubmit) {
      dispatch(setProductsPensionData(pensionData));
    }
  }, [shouldSubmit]);

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
          <input
            className="pension-config-input"
            value={pensionData.yourContribution}
            type="number"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              managePenstionData("yourContribution", value);
            }}
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
            onClick={() => managePenstionData("strategy", "Konzervativní")}
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
            onClick={() => managePenstionData("strategy", "Dynamická")}
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
            onClick={() => managePenstionData("strategy", "Vyvážená")}
          >
            Vyvážená
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default PensionConfig;
