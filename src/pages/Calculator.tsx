import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";
import LifeInsuranceForm from "../components/forms/LifeInsurance";
import PensionForm from "../components/forms/PensionForm";
import PropertyInsuranceForm from "../components/forms/PropertyInsurance";
import Validator from "../helpers/Validator";

interface IProps {
  validator: Validator;
}

const Calculator = ({ validator }: IProps) => {
  const [value, setValue] = useState("1");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="calculator-page">
      <Box sx={{ width: "100%", typography: "body1" }}>
        {/* <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Tab label="Životní pojištění" value="1" />
              <Tab label="Penzijní připojištění" value="2" />
              <Tab label="Pojištění majetku" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <LifeInsuranceForm validator={validator} />
          </TabPanel>
          <TabPanel value="2">
            <PensionForm validator={validator} />
          </TabPanel>
          <TabPanel value="3">
            <PropertyInsuranceForm />
          </TabPanel>
        </TabContext> */}
      </Box>
    </div>
  );
};

export default Calculator;
