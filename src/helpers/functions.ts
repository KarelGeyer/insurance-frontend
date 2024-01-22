import {
  FilterTypeAttribute,
  HeaderNameType,
  ProductFilterType,
  ProductTypeViewType,
  RouteType,
} from "../models/types";
import { ProductCategory } from "./enums";

type InputType = "INPUT" | "SELECT" | "TEXTAREA";
export const formatMuiInputRef = (
  ref: React.RefObject<HTMLElement>,
  input: InputType
): HTMLInputElement => {
  return Array.prototype.slice
    .call(ref.current?.children)
    .find((el: any) => el.nodeName === input);
};

export const categoryIntToName = (
  category: ProductCategory
): ProductTypeViewType => {
  switch (category) {
    case ProductCategory.PENSION:
      return "Penzijní připojištění";
    case ProductCategory.LIFE_INSURANCE:
      return "Životní pojištění";
    case ProductCategory.PROPERTY_INSURANCE:
      return "Pojištění nemovitosti";
    default:
      return "Všechny produkty";
  }
};

export const categoryIntToColor = (category: ProductCategory): string => {
  switch (category) {
    case ProductCategory.PENSION:
      return "#ff551f";
    case ProductCategory.LIFE_INSURANCE:
      return "#8555ff";
    case ProductCategory.PROPERTY_INSURANCE:
      return "#4caf50";
    default:
      return "";
  }
};

export const filterTypeToAttribute = (
  filterType: ProductFilterType
): FilterTypeAttribute => {
  switch (filterType) {
    case "Název produktu":
      return "name";
    case "Název firmy":
      return "companyName";
    case "Typ pojištění":
      return "category";
    default:
      return "name";
  }
};

export const getHeaderNameFromLocation = (
  location: RouteType
): HeaderNameType => {
  if (location.includes("/product") && location != "/products")
    return "Produkt";
  switch (location) {
    case "/":
      return "Hlavní Stránka";
    case "/products":
      return "Produkty";
    case "/order":
      return "Objednávka";
    case "/orders":
      return "Objednávky";
    default:
      return "Hlavní Stránka";
  }
};

export const getLocationFromHeaderName = (
  headerName: HeaderNameType
): RouteType => {
  switch (headerName) {
    case "Hlavní Stránka":
      return "/";
    case "Produkty":
      return "/products";
    case "Objednávka":
      return "/order";
    case "Objednávky":
      return "/orders";
    default:
      return "/";
  }
};
