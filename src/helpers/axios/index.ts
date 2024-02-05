import axios from "axios";

export interface BaseRes<T> {
  data: T;
  status: number;
  responseMessage: string;
}

export const BASE_API = import.meta.env.VITE_BASE_API;
export const PRODUCTS = "Products";
export const ORDERS = "Orders";
export const PENSION = "Pension";
export const LIFE_INSURANCE = "LifeInsurance";
export const PROPERTY = "PropertyInsurance";

export const instance = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});
