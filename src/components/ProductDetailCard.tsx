import { Avatar, Divider, Typography } from "@mui/material";
import { IProduct } from "../models/interfaces";
import { categoryIntToName } from "../helpers/functions";
import Section from "./Section";

interface IProps {
  product: IProduct;
}

const ProductDetailCard = ({ product }: IProps) => {
  return (
    <Section marginTop={2}>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <Avatar
        alt={product.companyName}
        src={product.companyLogo}
        sx={{ width: 120, height: 120, marginY: 2 }}
      />
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {product.companyName}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="body1" paragraph>
        {product.description}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="subtitle1" color="textSecondary">
        Kategorie: {categoryIntToName(product.category)}
      </Typography>
    </Section>
  );
};

export default ProductDetailCard;
