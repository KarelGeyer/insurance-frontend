import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import houseImage from "../../assets/img/home.png";
import flatImage from "../../assets/img/flat.png";
import garageImage from "../../assets/img/garage.png";
import { PropertyType } from "../../models/types";
import { IPropertyInsuranceData } from "../../models/interfaces";
import { useDispatch } from "react-redux";
import { setProductPropertyInsuranceData } from "../../state/redux/reducers/productReducer";

interface IProps {
  shouldSubmit: boolean;
}

const PropertyInsuranceConfig = ({ shouldSubmit }: IProps) => {
  const dispatch = useDispatch();

  const [propertyInsuranceData, setPropertyInsuranceData] =
    useState<IPropertyInsuranceData>({
      propertyType: "none",
      insuranceTypes: {
        property: false,
        equipment: false,
        liability: false,
      },
      propertyAddress: {
        street: "",
        city: "",
        zipCode: "",
      },
      squareMeters: 0,
    });

  const setPropertyType = (propertyType: PropertyType) => {
    setPropertyInsuranceData({
      ...propertyInsuranceData,
      propertyType: propertyType,
    });
  };

  const setInsuranceType = (insuranceType: string, value: boolean) => {
    setPropertyInsuranceData({
      ...propertyInsuranceData,
      insuranceTypes: {
        ...propertyInsuranceData.insuranceTypes,
        [insuranceType]: value,
      },
    });
  };

  const setPropertyAddress = (propertyAddress: string, value: string) => {
    setPropertyInsuranceData({
      ...propertyInsuranceData,
      propertyAddress: {
        ...propertyInsuranceData.propertyAddress,
        [propertyAddress]: value,
      },
    });
  };

  const setSquareMeters = (value: number) => {
    setPropertyInsuranceData({
      ...propertyInsuranceData,
      squareMeters: value,
    });
  };

  useEffect(() => {
    if (shouldSubmit) {
      dispatch(setProductPropertyInsuranceData(propertyInsuranceData));
    }
  }, [shouldSubmit]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Konfigurace produktu
      </Typography>
      <Typography variant="h5" gutterBottom mt={3}>
        Typ nemovitosti
      </Typography>
      <Box display={"flex"}>
        <Box
          sx={{
            padding: "8px 32px",
            border: "1px solid #3f99ee",
            borderRadius: 5,
            backgroundColor:
              propertyInsuranceData.propertyType === "house"
                ? "#3f99ee"
                : "white",
          }}
          m={1}
          onClick={() => setPropertyType("house")}
        >
          <img src={houseImage} className="product-img" />
        </Box>
        <Box
          sx={{
            padding: "8px 32px",
            border: "1px solid #3f99ee",
            borderRadius: 5,
            backgroundColor:
              propertyInsuranceData.propertyType === "flat"
                ? "#3f99ee"
                : "white",
          }}
          m={1}
          onClick={() => setPropertyType("flat")}
        >
          <img src={flatImage} className="product-img" />
        </Box>
        <Box
          sx={{
            padding: "8px 32px",
            border: "1px solid #3f99ee",
            borderRadius: 5,
            backgroundColor:
              propertyInsuranceData.propertyType === "garage"
                ? "#3f99ee"
                : "white",
          }}
          m={1}
          onClick={() => setPropertyType("garage")}
        >
          <img src={garageImage} className="product-img garage" />
        </Box>
      </Box>
      <Typography variant="h5" gutterBottom mt={5}>
        Adresa domu
      </Typography>
      <Box sx={{ display: "flex" }} width={"65%"} mt={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            Velikost prostoru v m&#178;
          </InputLabel>
          <OutlinedInput
            id="street-and-house-number"
            type="number"
            label="Velikost prostoru v m&#178;"
            onChange={(e) => setSquareMeters(parseInt(e.target.value))}
            value={propertyInsuranceData.squareMeters}
          />
        </FormControl>
      </Box>
      <Typography variant="h5" gutterBottom mt={5}>
        Co vše chcete pojistit?
      </Typography>
      <Box sx={{ display: "flex" }}>
        <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={propertyInsuranceData.insuranceTypes.property}
                  onClick={() =>
                    setInsuranceType(
                      "property",
                      !propertyInsuranceData.insuranceTypes.property
                    )
                  }
                />
              }
              label="Majetek"
            />
          </FormGroup>
        </FormControl>
        <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={propertyInsuranceData.insuranceTypes.equipment}
                  onClick={() =>
                    setInsuranceType(
                      "equipment",
                      !propertyInsuranceData.insuranceTypes.equipment
                    )
                  }
                />
              }
              label="Vybavení domácnosti"
            />
          </FormGroup>
        </FormControl>
        <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={propertyInsuranceData.insuranceTypes.liability}
                  onClick={() =>
                    setInsuranceType(
                      "liability",
                      !propertyInsuranceData.insuranceTypes.liability
                    )
                  }
                />
              }
              label="Odpovědnost za škodu"
            />
          </FormGroup>
        </FormControl>
      </Box>
      <Typography variant="h5" gutterBottom mt={5}>
        Adresa domu
      </Typography>
      <Box sx={{ display: "flex" }} width={"65%"} mt={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            Ulice a číslo popisné
          </InputLabel>
          <OutlinedInput
            id="street-and-house-number"
            type="text"
            label="Ulice a číslo popisné"
            onChange={(e) => setPropertyAddress("street", e.target.value)}
            value={propertyInsuranceData.propertyAddress.street}
          />
        </FormControl>
      </Box>
      <Box sx={{ display: "flex" }} width={"65%"} mt={2}>
        <FormControl variant="outlined" sx={{ width: "35%" }}>
          <InputLabel htmlFor="outlined-adornment-password">PSČ</InputLabel>
          <OutlinedInput
            id="zip-code"
            type="number"
            label="PSČ"
            onChange={(e) => setPropertyAddress("zipCode", e.target.value)}
            value={propertyInsuranceData.propertyAddress.zipCode}
          />
        </FormControl>
        <FormControl variant="outlined" sx={{ width: "60%", marginLeft: "5%" }}>
          <InputLabel htmlFor="outlined-adornment-password">Obec</InputLabel>
          <OutlinedInput
            id="city"
            type="text"
            label="Obec"
            onChange={(e) => setPropertyAddress("city", e.target.value)}
            value={propertyInsuranceData.propertyAddress.city}
          />
        </FormControl>
      </Box>
    </>
  );
};

export default PropertyInsuranceConfig;
