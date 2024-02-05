import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import PersonDetails from "../components/PersonDetails";
import ProductDetailCard from "../components/ProductDetailCard";
import ProductConfiguration from "../components/product_configuration";
import ProductDetailWrapper from "../components/Section";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductInfo,
  setProductBaseInfo,
} from "../state/redux/reducers/productReducer";
import { AppDispatch, RootState } from "../state/redux/store";
import Loading from "../components/Loading";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [submitTriggered, setSubmitTriggered] = useState<boolean>(false);
  const [isConfigurationValid, setIsConfigurationValid] =
    useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const isValid = isConfigurationValid && isFormValid;

  const {
    baseProductInfo: { product, loading },
  } = useSelector((state: RootState) => state.product);

  const fetchData = async () => {
    const response = await dispatch(fetchProductInfo(id as string)).then(
      (res) => res.payload
    );
    return response;
  };

  const setFormValid = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const setConfigValid = (isValid: boolean) => {
    setIsConfigurationValid(isValid);
  };

  const onSubmit = () => {
    if (isValid) {
      dispatch(
        setProductBaseInfo({
          id: product.id,
          name: product.name,
          productCategory: product.category,
        })
      );
      navigate(`/order`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  console.log("isValid", isValid);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ProductDetailCard product={product} loading={loading} />

      {loading ? (
        <Loading />
      ) : (
        <ProductConfiguration
          category={product.category}
          shouldSubmit={submitTriggered}
          setConfigValid={setConfigValid}
        />
      )}

      <ProductDetailWrapper marginTop={5}>
        <Typography variant="h4" gutterBottom>
          Osobní údaje
        </Typography>
        <PersonDetails setIsValid={setFormValid} />
      </ProductDetailWrapper>

      <Button
        variant="outlined"
        disabled={!isValid}
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
