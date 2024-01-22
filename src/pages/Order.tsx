import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import LifeInsuranceConfig from "../components/order-configuration/LifeInsuranceConfig";
import { RootState } from "../state/redux/store";
import { useSelector } from "react-redux";
import { ProductCategory } from "../helpers/enums";
import PensionConfig from "../components/order-configuration/PensionConfig";
import PropertyInsuranceConfig from "../components/order-configuration/PropertyInsuranceConfig";

const Order = () => {
  const navigate = useNavigate();

  const { chosenProduct } = useSelector((state: RootState) => state.product);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "1200px",
      }}
    >
      {chosenProduct === ProductCategory.LIFE_INSURANCE && (
        <LifeInsuranceConfig />
      )}
      {chosenProduct === ProductCategory.PENSION && <PensionConfig />}
      {chosenProduct === ProductCategory.PROPERTY_INSURANCE && (
        <PropertyInsuranceConfig />
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "55%",
          padding: "48px",
        }}
      >
        <Button
          variant="outlined"
          color="error"
          startIcon={<ArrowBackIosIcon />}
          onClick={goBack}
        >
          Upravit kalkulaci
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
        >
          <Typography fontWeight={600}>Objednat produkt</Typography>
        </Button>
      </Box>
    </Box>
  );
};

// const calculateOneTimePrice = ( // calculate life insurance before connecting to backend
//   amount: number,
//   factor: number,
//   smokerAdditive: number,
//   sportAdditive: number
// ) => {
//   const yearlyBase =
//     (amount / 1000) * factor * (1 + smokerAdditive / 100 + sportAdditive / 100);

//   console.log;
//   return {
//     yearlyBase,
//     monthlyBase: yearlyBase / 12,
//   };
// };

export default Order;
