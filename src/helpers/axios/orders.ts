import {
  IOrder,
  IOrderDeleteRequest,
  IOrderInfo,
} from "../../models/interfaces";
import { ORDERS, instance } from ".";

export const createOrder = async (request: IOrderInfo) => {
  return instance
    .post(`${ORDERS}/CreateOrder`, request)
    .then((res) => {
      return res.data.data as boolean;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getOrders = async () => {
  return instance
    .get(`${ORDERS}/GetOrders`)
    .then((res) => {
      return res.data.data as IOrder[];
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deleteOrder = async (request: IOrderDeleteRequest) => {
  return instance
    .delete(`${ORDERS}/DeleteOrder`, { data: request })
    .then((res) => {
      return res.data.data as boolean;
    })
    .catch((err) => {
      console.error(err);
    });
};
