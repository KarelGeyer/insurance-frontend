import { Box, Paper, Typography } from "@mui/material";
import Section from "../Section";
import { RootState } from "../../state/redux/store";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../state/context/user-context";
import {
  PensionCalcReq,
  PensionCalcRes,
  calculatePension,
} from "../../helpers/axios/pensionInsurance";
import Loading from "../Loading";

const PensionConfig = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pensionDataRes, setPensionDataRes] = useState<PensionCalcRes>({
    valorization: 0,
    totalSavings: 0,
    stateContribution: 0,
    stateContributionTotal: 0,
  });
  const { productName, productId, pensionData } = useSelector(
    (state: RootState) => state.product
  );
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (pensionData && productId && user) {
      const requestData: PensionCalcReq = {
        productId: productId,
        userAge: user.age,
        currentSavings: pensionData.currentSavings,
        userContribution: pensionData.yourContribution,
        employerContribution: pensionData.employerContribution,
        pensionStrategy: pensionData.strategy,
      };

      setLoading(true);
      calculatePension(requestData)
        .then((res) => {
          if (!res) return;
          if (res.status !== 200) return;
          const totalSavings = Math.round(res.data.totalSavings);
          const valorization = Math.round(res.data.valorization);
          setPensionDataRes({
            ...res.data,
            totalSavings: totalSavings,
            valorization: valorization,
          });
        })
        .finally(() => setLoading(false));
    }
  }, [pensionData, productId, user]);

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
        <Box width={1} sx={{ padding: "24px 16px 8px 40px" }} mb={2}>
          <Typography variant="h5" sx={{ padding: "16px 0", fontWeight: 600 }}>
            Výsledek:
          </Typography>
          <Box
            mt={2}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Box display={"flex"}>
              <Paper
                sx={{
                  textAlign: "center",
                  height: 100,
                  width: 200,
                  backgroundColor: "#3f99ee",
                  padding: "0 25px",
                  margin: "0 30px",
                }}
                elevation={8}
              >
                <Typography variant="h6" mt={1}>
                  Valorizace
                </Typography>
                <Typography variant="h6" mt={2}>
                  {pensionDataRes.valorization} Kč
                </Typography>
              </Paper>
              <Paper
                sx={{
                  textAlign: "center",
                  height: 100,
                  width: 200,
                  backgroundColor: "#4ea910",
                  padding: "0 25px",
                  margin: "0 30px",
                }}
                elevation={8}
              >
                <Typography variant="h6" mt={1}>
                  Celkové úspory
                </Typography>
                <Typography variant="h6" mt={2}>
                  {pensionDataRes.totalSavings} Kč
                </Typography>
              </Paper>
            </Box>
          </Box>

          <Typography
            variant="h5"
            mt={5}
            sx={{ padding: "16px 0", fontWeight: 600 }}
          >
            Státní příspěvek:
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            mt={-2}
          >
            <Box display={"flex"} mt={5}>
              <Paper
                sx={{
                  textAlign: "center",
                  height: 100,
                  width: 200,
                  padding: "0 25px",
                  backgroundColor: "#f5a623",
                  margin: "0 30px",
                }}
                elevation={8}
              >
                <Typography variant="h6" mt={1}>
                  Měsíčně
                </Typography>
                <Typography variant="h6" mt={2}>
                  {pensionDataRes.stateContribution} Kč
                </Typography>
              </Paper>
              <Paper
                sx={{
                  textAlign: "center",
                  height: 100,
                  width: 200,
                  padding: "0 25px",
                  backgroundColor: "#f5f123",
                  margin: "0 30px",
                }}
                elevation={8}
              >
                <Typography variant="h6" mt={1}>
                  Celkem
                </Typography>
                <Typography variant="h6" mt={2}>
                  {pensionDataRes.stateContributionTotal} Kč
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Box>
      )}
    </Section>
  );
};

export default PensionConfig;
