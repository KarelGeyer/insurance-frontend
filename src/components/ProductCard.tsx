import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { categoryIntToColor, categoryIntToName } from "../helpers/functions";
import { IProduct } from "../models/interfaces";
import { useNavigate } from "react-router-dom";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const navigate = useNavigate();

  const redirectToProductDetail = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 1 }} key={product.id}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="caption" component="div">
          {product.companyName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={redirectToProductDetail}>
          Detail
        </Button>
        <Chip
          label={categoryIntToName(product.category!)}
          sx={{
            marginRight: 10,
            marginLeft: 10,
            backgroundColor: categoryIntToColor(product.category!),
            color: "white",
            fontWeight: "bold",
          }}
        />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
