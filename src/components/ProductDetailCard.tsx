import { Avatar, Divider, Typography } from "@mui/material";
import { IProduct } from "../models/interfaces";
import { categoryIntToName } from "../helpers/functions";
import Section from "./Section";
import Loading from "./Loading";

interface IProps {
  product: IProduct;
  loading: boolean;
}

const ProductDetailCard = ({ product, loading }: IProps) => {
  return (
    <Section marginTop={2}>
      <Typography variant="h4" gutterBottom>
        {loading ? <Loading isSimple isLinear /> : product.name}
      </Typography>
      <Avatar
        alt={product.companyName}
        src={product.companyLogo}
        sx={{ width: 120, height: 120, marginY: 2 }}
      />
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {loading ? <Loading isSimple isLinear /> : product.companyName}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="body1" paragraph>
        {loading ? <Loading isSimple isLinear /> : product.description}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="subtitle1" color="textSecondary">
        Kategorie:{" "}
        {loading ? (
          <Loading isSimple isLinear />
        ) : (
          categoryIntToName(product.category)
        )}
      </Typography>
    </Section>
  );
};

export default ProductDetailCard;
