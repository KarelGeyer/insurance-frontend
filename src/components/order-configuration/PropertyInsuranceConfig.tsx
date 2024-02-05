import { Box, Typography } from "@mui/material";
import Section from "../Section";
import { RootState } from "../../state/redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PropertyCalcReq,
  PropertyCalcRes,
  calculatePropertyInsurance,
} from "../../helpers/axios/propertyInsurance";
import Loading from "../Loading";

interface IProps {
  setYearlyPrice?: (value: number) => void;
}

const PropertyInsuranceConfig = ({ setYearlyPrice }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [propertyInsuranceCalcData, setPropertyInsuranceCalcData] =
    useState<PropertyCalcRes>({
      perMeterSquareCalc: {
        propertyPrice: 0,
        equipmentPrice: 0,
        liabilityPrice: 0,
        totalPrice: 0,
      },
      totalCalc: {
        propertyPrice: 0,
        equipmentPrice: 0,
        liabilityPrice: 0,
        totalPrice: 0,
      },
    });
  const { propertyInsuranceData, productName, productId } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (!productId || !propertyInsuranceData) return;

    const data: PropertyCalcReq = {
      productId: productId,
      propertyType: propertyInsuranceData.propertyType,
      street: propertyInsuranceData.propertyAddress.street,
      city: propertyInsuranceData.propertyAddress.city,
      zipCode: propertyInsuranceData.propertyAddress.zipCode,
      squareMeters: propertyInsuranceData.squareMeters,
      shouldCalculateProperty: propertyInsuranceData.insuranceTypes.property,
      shouldCalculateEquipment: propertyInsuranceData.insuranceTypes.equipment,
      shouldCalculateLiability: propertyInsuranceData.insuranceTypes.liability,
    };

    setLoading(true);
    calculatePropertyInsurance(data)
      .then((res) => {
        if (!res) return;
        if (res.status !== 200) return;
        setPropertyInsuranceCalcData(res.data);
        setYearlyPrice && setYearlyPrice(res.data.totalCalc.totalPrice * 12);
      })
      .finally(() => setLoading(false));
  }, [productId, propertyInsuranceData]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Kalkulace pro product
      </Typography>
      <Typography variant="h5" gutterBottom>
        {productName}
      </Typography>
      {loading ? (
        <>
          <Loading />
          <Loading />
          <Loading />
        </>
      ) : (
        <>
          <Box width={1} sx={{ padding: "24px 16px 8px 40px" }}>
            <Typography
              variant="h5"
              sx={{ padding: "16px 0", fontWeight: 600 }}
            >
              Cena za m&sup2;
            </Typography>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Typography variant="body1">
                  Cena za pojištění vybavení
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {
                    propertyInsuranceCalcData?.perMeterSquareCalc
                      ?.equipmentPrice
                  }{" "}
                  Kč
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Typography variant="body1">
                  Cena za pojištění vybavení
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {
                    propertyInsuranceCalcData?.perMeterSquareCalc
                      ?.liabilityPrice
                  }{" "}
                  Kč
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Typography variant="body1">
                  Cena za pojištění nemovitosti
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {propertyInsuranceCalcData?.perMeterSquareCalc?.propertyPrice}{" "}
                  Kč
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  padding: "8px 0",
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Celková cena
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {propertyInsuranceCalcData?.perMeterSquareCalc?.totalPrice} Kč
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box width={1} sx={{ padding: "24px 16px 8px 40px" }}>
            <Typography
              variant="h5"
              sx={{ padding: "16px 0", fontWeight: 600 }}
            >
              Cena za měsíc
            </Typography>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Typography variant="body1">
                  Cena za pojištění vybavení
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {propertyInsuranceCalcData?.totalCalc?.equipmentPrice / 12}Kč
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Typography variant="body1">
                  Cena za pojištění vybavení
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {propertyInsuranceCalcData?.totalCalc?.liabilityPrice / 12}Kč
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Typography variant="body1">
                  Cena za pojištění nemovitosti
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {propertyInsuranceCalcData?.totalCalc?.propertyPrice / 12}Kč
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  padding: "8px 0",
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Celková cena
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {propertyInsuranceCalcData?.totalCalc?.totalPrice / 12} Kč
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box width={1} sx={{ padding: "24px 16px 8px 40px" }}>
            <Typography
              variant="h5"
              sx={{ padding: "16px 0", fontWeight: 600 }}
            >
              Cena za rok
            </Typography>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Typography variant="body1">
                  Cena za pojištění vybavení
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {propertyInsuranceCalcData?.totalCalc?.equipmentPrice}Kč
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Typography variant="body1">
                  Cena za pojištění vybavení
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {propertyInsuranceCalcData?.totalCalc?.liabilityPrice}Kč
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Typography variant="body1">
                  Cena za pojištění nemovitosti
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {propertyInsuranceCalcData?.totalCalc?.propertyPrice}Kč
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  padding: "8px 0",
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Celková cena
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {propertyInsuranceCalcData?.totalCalc?.totalPrice} Kč
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default PropertyInsuranceConfig;
