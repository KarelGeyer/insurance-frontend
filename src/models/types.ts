import { AdditinalPersonData, PersonData } from "./interfaces";

// EVENTS
export type ChangeInputEvent = React.ChangeEvent<HTMLInputElement>;
export type ButtonEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

// FORMS
export type PensionStrategy = "Dynamická" | "Konzervativní" | "Vyvážená";
export type PensionDataType =
  | "strategy"
  | "currentSavings"
  | "yourContribution"
  | "employerContribution";

export type PersonDataAll = PersonData & AdditinalPersonData;

export type ProductViewType = "card" | "table";

export type ProductTypeViewType =
  | "Všechny produkty"
  | "Penzijní připojištění"
  | "Životní pojištění"
  | "Pojištění nemovitosti";

export type ProductFilterType =
  | "Název produktu"
  | "Název firmy"
  | "Typ pojištění";

export type RouteType = "/" | "/products" | "/product" | "/order" | "/orders";

export type HeaderNameType =
  | "Hlavní Stránka"
  | "Produkty"
  | "Produkt"
  | "Objednávky"
  | "Objednávka";

export type FilterTypeAttribute = "category" | "name" | "companyName";

export type PropertyType = "house" | "flat" | "garage" | "none";
