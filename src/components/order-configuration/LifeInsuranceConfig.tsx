import { useEffect, useState } from "react";
import Section from "../Section";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../state/redux/store";
import {
  LifeInsuraceCalcReq,
  LifeInsuraceCalcRes,
  calculateLifeInsurance,
} from "../../helpers/axios/lifeInsurance";
import Loading from "../Loading";

const LifeInsuranceConfig = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [calculation, setCalculation] = useState<LifeInsuraceCalcRes>({
    monthlyLifeInsurance: {
      deathInsurancePrice: 0,
      injuriesInsurancePrice: 0,
      diseasesInsurancePrice: 0,
      workIncapacityInsurancePrice: 0,
      hospitalizationInsurancePrice: 0,
      invalidityInsurancePrice: 0,
      totalInsurancePrice: 0,
    },
    yearlyLifeInsurance: {
      deathInsurancePrice: 0,
      injuriesInsurancePrice: 0,
      diseasesInsurancePrice: 0,
      workIncapacityInsurancePrice: 0,
      hospitalizationInsurancePrice: 0,
      invalidityInsurancePrice: 0,
      totalInsurancePrice: 0,
    },
  });

  const { productId, productName, lifeInsuranceData } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (lifeInsuranceData && productId) {
      const request: LifeInsuraceCalcReq = {
        productId: productId,
        deathInsurance: lifeInsuranceData.death,
        injuriesInsurance: lifeInsuranceData.injuries,
        diseasesInsurance: lifeInsuranceData.diseases,
        workIncapacityInsurance: lifeInsuranceData.workIncapacity,
        hospitalizationInsurance: lifeInsuranceData.hospitalization,
        invalidityInsurance: lifeInsuranceData.invalidity,
        hospitalizationLength: lifeInsuranceData.hospitalizationLength,
        invalidityLevel: lifeInsuranceData.invalidityLevel,
        isSmoker: lifeInsuranceData.smoker,
        doesSport: lifeInsuranceData.doesSport,
      };

      setLoading(true);
      calculateLifeInsurance(request, () => setLoading(false)).then((res) => {
        if (!res) return;
        if (res.status !== 200) return;
        setCalculation(res.data);
      });
    }
  }, [productId, lifeInsuranceData]);

  return (
    <Section marginTop={5}>
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
        </>
      ) : (
        <Box width={1} sx={{ padding: "24px 16px 8px 40px" }}>
          <Typography variant="h5" sx={{ padding: "16px 0", fontWeight: 600 }}>
            Ročně
          </Typography>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <Typography variant="body1">Cena za smrtelné zranění</Typography>
              <Typography variant="body1" fontWeight={600}>
                {calculation.yearlyLifeInsurance.deathInsurancePrice} Kč
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <Typography variant="body1">Cena za úraz</Typography>
              <Typography variant="body1" fontWeight={600}>
                {calculation.yearlyLifeInsurance.injuriesInsurancePrice} Kč
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <Typography variant="body1">Cena za nemoc</Typography>
              <Typography variant="body1" fontWeight={600}>
                {calculation.yearlyLifeInsurance.diseasesInsurancePrice} Kč
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
                Cena za pracovní neschopnost
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {calculation.yearlyLifeInsurance.workIncapacityInsurancePrice}{" "}
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
              <Typography variant="body1">Cena za hospitalizaci</Typography>
              <Typography variant="body1" fontWeight={600}>
                {calculation.yearlyLifeInsurance.hospitalizationInsurancePrice}{" "}
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
              <Typography variant="body1">Cena za invaliditu</Typography>
              <Typography variant="body1" fontWeight={600}>
                {calculation.yearlyLifeInsurance.invalidityInsurancePrice} Kč
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
                {calculation.yearlyLifeInsurance.totalInsurancePrice} Kč
              </Typography>
            </Box>
          </Box>

          <Typography variant="h5" sx={{ padding: "16px 0", fontWeight: 600 }}>
            Měsíčně
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <Typography variant="body1">Cena za smrtelné zranění</Typography>
            <Typography variant="body1" fontWeight={600}>
              {calculation.monthlyLifeInsurance.deathInsurancePrice} Kč
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <Typography variant="body1">Cena za úraz</Typography>
            <Typography variant="body1" fontWeight={600}>
              {calculation.monthlyLifeInsurance.injuriesInsurancePrice} Kč
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <Typography variant="body1">Cena za nemoc</Typography>
            <Typography variant="body1" fontWeight={600}>
              {calculation.monthlyLifeInsurance.diseasesInsurancePrice} Kč
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
              Cena za pracovní neschopnost
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {calculation.monthlyLifeInsurance.workIncapacityInsurancePrice} Kč
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <Typography variant="body1">Cena za hospitalizaci</Typography>
            <Typography variant="body1" fontWeight={600}>
              {calculation.monthlyLifeInsurance.hospitalizationInsurancePrice}{" "}
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
            <Typography variant="body1">Cena za invaliditu</Typography>
            <Typography variant="body1" fontWeight={600}>
              {calculation.monthlyLifeInsurance.invalidityInsurancePrice} Kč
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
              {calculation.monthlyLifeInsurance.totalInsurancePrice} Kč
            </Typography>
          </Box>
        </Box>
      )}
    </Section>
  );
};

export default LifeInsuranceConfig;
