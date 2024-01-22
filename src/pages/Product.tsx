import { useLocation, useNavigate } from "react-router-dom";
import { IProduct } from "../models/interfaces";
import { Box, Button, Typography } from "@mui/material";
import PersonDetails from "../components/PersonDetails";
import Validator from "../helpers/Validator";
import ProductDetailCard from "../components/ProductDetailCard";
import ProductConfiguration from "../components/product_configuration";
import ProductDetailWrapper from "../components/Section";
import { useState } from "react";
import { ButtonEvent } from "../models/types";
import { useDispatch } from "react-redux";
import { setProductBaseInfo } from "../state/redux/reducers/productReducer";

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product: IProduct = location.state.product as IProduct;
  const [submitTriggered, setSubmitTriggered] = useState<boolean>(false);

  const onSubmit = (e: ButtonEvent) => {
    e.preventDefault();
    setSubmitTriggered(true);
  };

  const onPersonDetailsError = () => {
    setSubmitTriggered(false);
  };

  const onPersonDetailsContinue = (isValid: boolean) => {
    setSubmitTriggered(false);
    if (isValid) {
      dispatch(
        setProductBaseInfo({
          id: product.id,
          name: product.name,
          chosenProduct: product.category,
        })
      );
      navigate(`/order`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ProductDetailCard product={product} />
      <ProductConfiguration
        category={product.category}
        shouldSubmit={submitTriggered}
      />

      <ProductDetailWrapper marginTop={5}>
        <Typography variant="h4" gutterBottom>
          Osobní údaje
        </Typography>
        <PersonDetails
          onContinue={onPersonDetailsContinue}
          onError={onPersonDetailsError}
          shouldValidate={submitTriggered}
          validator={new Validator()}
          hasContinue={false}
        />
      </ProductDetailWrapper>

      <Button
        variant="outlined"
        sx={{
          width: 900,
          marginTop: 6,
          marginBottom: 10,
          height: 60,
          fontSize: 20,
          fontWeight: 600,
        }}
        onClick={onSubmit}
      >
        Pokračuj
      </Button>
    </Box>
  );
};

export default Product;
