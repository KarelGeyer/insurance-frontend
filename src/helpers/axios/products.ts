import axios from "axios";
import { IProduct } from "../../models/interfaces";

export const getProducts = async () => {
  return axios
    .get("https://ganny01.bsite.net/api/Products/GetProducts")
    .then((res) => {
      return res.data.data as IProduct[];
    });
};
