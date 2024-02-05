import { IProduct } from "../../models/interfaces";
import { PRODUCTS, instance } from ".";

export const getProducts = async () => {
  return instance.get(`${PRODUCTS}/GetProducts`).then((res) => {
    return res.data.data as IProduct[];
  });
};

export const getProduct = async (id: string) => {
  return instance
    .get(`${PRODUCTS}/GetProductById?productId=${id}`)
    .then((res) => {
      return res.data.data as IProduct;
    });
};
