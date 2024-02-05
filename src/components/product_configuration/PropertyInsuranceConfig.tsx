import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import houseImage from "../../assets/img/home.png";
import flatImage from "../../assets/img/flat.png";
import garageImage from "../../assets/img/garage.png";
import { PropertyType } from "../../models/types";
import { useDispatch, useSelector } from "react-redux";
import { setProductPropertyInsuranceData } from "../../state/redux/reducers/productReducer";
import { RootState } from "../../state/redux/store";
import BaseStringInput from "../user-data-form/BaseStringInput";
import NumberInput from "../user-data-form/BaseNumberInput";

interface IProps {
  setIsValid: (isValid: boolean) => void;
}

const PropertyInsuranceConfig = ({ setIsValid }: IProps) => {
  const [valids, setValids] = useState<any>({
    isPropertyTypeChosen: false,
    isPropertySizeValid: false,
    isAnyInsuranceTypeChosen: false,
    isStreetValid: false,
    isPostCodeValid: false,
    isCityValid: false,
  });
  const dispatch = useDispatch();

  const setIsAttributeValid = (type: string, value: boolean) => {
    setValids((prev: any) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };

  const { propertyInsuranceData } = useSelector(
    (state: RootState) => state.product
  );

  const setPropertyType = (propertyType: PropertyType) => {
    dispatch(
      setProductPropertyInsuranceData({
        ...propertyInsuranceData,
        propertyType,
      })
    );
  };

  const setInsuranceType = (insuranceType: string, value: boolean) => {
    dispatch(
      setProductPropertyInsuranceData({
        ...propertyInsuranceData,
        insuranceTypes: {
          ...propertyInsuranceData.insuranceTypes,
          [insuranceType]: value,
        },
      })
    );
  };

  const setPropertyCity = (value: string) => {
    dispatch(
      setProductPropertyInsuranceData({
        ...propertyInsuranceData,
        propertyAddress: {
          ...propertyInsuranceData.propertyAddress,
          city: value,
        },
      })
    );
  };

  const setPropertyStreet = (value: string) => {
    dispatch(
      setProductPropertyInsuranceData({
        ...propertyInsuranceData,
        propertyAddress: {
          ...propertyInsuranceData.propertyAddress,
          street: value,
        },
      })
    );
  };

  const setPropertyPostCode = (value: string) => {
    dispatch(
      setProductPropertyInsuranceData({
        ...propertyInsuranceData,
        propertyAddress: {
          ...propertyInsuranceData.propertyAddress,
          zipCode: value,
        },
      })
    );
  };

  const setSquareMeters = (value: string) => {
    dispatch(
      setProductPropertyInsuranceData({
        ...propertyInsuranceData,
        squareMeters: parseInt(value),
      })
    );
  };

  const isAnyInsuranceTypeChosen =
    propertyInsuranceData.insuranceTypes.property ||
    propertyInsuranceData.insuranceTypes.equipment ||
    propertyInsuranceData.insuranceTypes.liability;

  useEffect(() => {
    setIsAttributeValid("isAnyInsuranceTypeChosen", isAnyInsuranceTypeChosen);
  }, [propertyInsuranceData.insuranceTypes]);

  useEffect(() => {
    const isValid =
      valids.isPropertyTypeChosen &&
      valids.isPropertySizeValid &&
      valids.isAnyInsuranceTypeChosen &&
      valids.isStreetValid &&
      valids.isPostCodeValid &&
      valids.isCityValid;
    setIsValid(isValid);
  }, [valids]);

  useEffect(() => {
    setValids({
      ...valids,
      isPropertyTypeChosen: propertyInsuranceData.propertyType !== "none",
      isPropertySizeValid: propertyInsuranceData.squareMeters > 0,
      isStreetValid: propertyInsuranceData.propertyAddress.street !== "",
      isPostCodeValid: propertyInsuranceData.propertyAddress.zipCode !== "",
      isCityValid: propertyInsuranceData.propertyAddress.city !== "",
      isAnyInsuranceTypeChosen: isAnyInsuranceTypeChosen,
    });
  }, []);

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
          onClick={() => {
            setPropertyType("house");
            setIsAttributeValid("isPropertyTypeChosen", true);
          }}
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
          onClick={() => {
            setPropertyType("flat");
            setIsAttributeValid("isPropertyTypeChosen", true);
          }}
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
          onClick={() => {
            setPropertyType("garage");
            setIsAttributeValid("isPropertyTypeChosen", true);
          }}
        >
          <img src={garageImage} className="product-img garage" />
        </Box>
      </Box>
      <Typography variant="h5" gutterBottom mt={5}>
        Velikost prostoru
      </Typography>
      <Box sx={{ display: "flex" }} width={"65%"} mt={2}>
        <NumberInput
          type="squareMeters"
          label="Velikost prostoru v m&#178;"
          required
          id="square-meters-input"
          setIsValid={setIsAttributeValid}
          validAttibute="isPropertySizeValid"
          setValue={setSquareMeters}
          value={propertyInsuranceData.squareMeters}
          errorMessage={""}
          sx={{ width: 1 }}
        />
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
                  onClick={() => {
                    setInsuranceType(
                      "property",
                      !propertyInsuranceData.insuranceTypes.property
                    );
                    setIsAttributeValid("isAnyInsuranceTypeChosen", true);
                  }}
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
        <BaseStringInput
          label="Ulice"
          id={"street-input"}
          type="street"
          errorMessage={"error"}
          setIsValid={setIsAttributeValid}
          validAttibute={"isStreetValid"}
          isUserForm={false}
          setValue={setPropertyStreet}
          value={propertyInsuranceData.propertyAddress.street}
          sx={{ width: "100%" }}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between" }}
        width={"65%"}
        mt={2}
      >
        <NumberInput
          type="zipCode"
          label="PSČ"
          required
          id="postcode-input"
          setIsValid={setIsAttributeValid}
          validAttibute="isPostCodeValid"
          setValue={setPropertyPostCode}
          value={parseInt(propertyInsuranceData.propertyAddress.zipCode)}
          errorMessage={""}
          min={10000}
          max={99999}
        />
        <BaseStringInput
          label="Obec"
          id={"city-input"}
          type="city"
          errorMessage={"error"}
          setIsValid={setIsAttributeValid}
          validAttibute={"isCityValid"}
          isUserForm={false}
          setValue={setPropertyCity}
          value={propertyInsuranceData.propertyAddress.city}
        />
      </Box>
    </>
  );
};

export default PropertyInsuranceConfig;
