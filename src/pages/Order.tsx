import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import OrderConfiguration from "../components/order-configuration";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/redux/store";
import { UserContext } from "../state/context/user-context";
import { IOrderInfo } from "../models/interfaces";
import { createOrder } from "../helpers/axios/orders";
import Loading from "../components/Loading";

const Order = () => {
  const navigate = useNavigate();
  const [yearlyPrice, setYearlyPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { productId } = useSelector((state: RootState) => state.product);
  const { user } = useContext(UserContext);

  const setPrice = (value: number) => {
    setYearlyPrice((prev) => prev + value);
  };

  const goBack = () => {
    navigate(-1);
  };

  const createNewOrder = () => {
    if (!user || !productId || yearlyPrice == 0) return;
    setIsLoading(true);
    const order: IOrderInfo = {
      productId: productId,
      name: user.name,
      surname: user.surname,
      date: new Date().toDateString(),
      yearlyPrice: yearlyPrice,
      emailAddress: user.email,
    };
    createOrder(order)
      .then((data) => {
        if (data) navigate("/success");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const canMakeOrder = yearlyPrice !== 0 && productId && user;

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
      <OrderConfiguration setYearlyPrice={setPrice} />

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
          disabled={!canMakeOrder || isLoading}
          onClick={canMakeOrder ? createNewOrder : () => {}}
        >
          <Typography fontWeight={600}>
            {isLoading ? <Loading isSimple /> : "Objednat produkt"}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

{
  // ZMÍNIT MEZISTAV
  /* <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          onClick={() => {
            setOrderInfo((prev) => {
              return {
                ...orderInfo,
                yearlyPrice: prev.yearlyPrice + 1,
              };
            });
            setOrderInfo((prev) => {
              return {
                ...orderInfo,
                yearlyPrice: prev.yearlyPrice + 1,
              };
            });
          }}
        >
          <Typography fontWeight={600}>Objednat produkt</Typography>
        </Button> */
}

export default Order;
