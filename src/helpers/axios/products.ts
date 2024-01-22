import axios from "axios";
import { IProduct } from "../../models/interfaces";
import { BASE_API, PRODUCTS } from ".";

export const getProducts = async () => {
  return axios.get(`${BASE_API}/${PRODUCTS}/GetProducts`).then((res) => {
    return res.data.data as IProduct[];
  });
};
